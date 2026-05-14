import { getElement } from "./dom";

const AUTO_CLOSE_MS = 1000;

function showError(message: string): void {
  const status = getElement("status");
  const icon = getElement("icon");
  const msg = getElement("message");
  status.classList.add("error");
  icon.textContent = "!";
  msg.textContent = message;
}

function sanitizeTitle(text: string): string {
  // Collapse whitespace (incl. newlines) and escape characters that would
  // break a Markdown link label.
  return text
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]");
}

function formatUrl(url: string): string {
  // CommonMark's bare `(url)` form forbids whitespace and only allows
  // balanced parens — URLs like Wikipedia's `Foo_(bar)` break it. Switch to
  // the angle-bracket form when needed; that form forbids `<` `>` newlines,
  // so percent-encode those.
  if (/[()\s]/.test(url)) {
    return "<" + url.replace(/[<>\n\r]/g, encodeURIComponent) + ">";
  }
  return url;
}

function copyViaExecCommand(text: string): boolean {
  // Fallback used when navigator.clipboard.writeText() throws because the
  // popup document is not focused — this happens on the 2nd+ invocation
  // of chrome.action.openPopup() via the keyboard shortcut.
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

async function copyToClipboard(text: string): Promise<void> {
  // Ensure the popup document is focused; openPopup() does not always
  // hand focus back to the popup on repeated invocations.
  window.focus();
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (e) {
    console.warn("[md-link] clipboard.writeText failed, falling back:", e);
  }
  if (!copyViaExecCommand(text)) {
    throw new Error("execCommand copy failed");
  }
}

async function run(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    showError("No active tab");
    return;
  }

  const title = (tab.title && tab.title.trim()) || tab.url;
  const markdown = `[${sanitizeTitle(title)}](${formatUrl(tab.url)})`;

  try {
    await copyToClipboard(markdown);
  } catch (e) {
    showError("Copy failed");
    console.error("[md-link] clipboard write failed:", e);
    return;
  }

  setTimeout(() => window.close(), AUTO_CLOSE_MS);
}

run();
