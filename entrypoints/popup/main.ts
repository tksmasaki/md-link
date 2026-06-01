import { getElement } from "../../lib/dom";
import { sanitizeTitle, formatUrl } from "../../lib/markdown";

const AUTO_CLOSE_MS = 1000;
const ERROR_CLOSE_MS = 3000;

function showError(message: string): void {
  const status = getElement("status");
  const icon = getElement("icon");
  const msg = getElement("message");
  status.classList.add("error");
  icon.textContent = "!";
  msg.textContent = message;
}

function flagError(message: string): void {
  // Show the error in the popup, raise a toolbar badge so the failure is
  // still visible after the popup auto-closes, then close on the same
  // timer as success — popups vanish on any outside click anyway, so a
  // persistent in-popup error never gets read.
  showError(message);
  void chrome.action.setBadgeText({ text: "!" });
  void chrome.action.setBadgeBackgroundColor({ color: "#c62828" });
  setTimeout(() => window.close(), ERROR_CLOSE_MS);
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

// The popup document is not focused on repeated openPopup() invocations
// via the keyboard shortcut, so navigator.clipboard.writeText() rejects
// with a NotAllowedError. That is the expected trigger for the execCommand
// fallback, so don't treat it as a warning-worthy failure.
function isUnfocusedError(e: unknown): boolean {
  return e instanceof DOMException && e.name === "NotAllowedError";
}

async function copyToClipboard(text: string): Promise<void> {
  // Ensure the popup document is focused; openPopup() does not always
  // hand focus back to the popup on repeated invocations.
  window.focus();
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (e) {
    if (!isUnfocusedError(e)) {
      const detail = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      console.warn("[md-link] clipboard.writeText failed, falling back:", detail);
    }
  }
  if (!copyViaExecCommand(text)) {
    throw new Error("execCommand copy failed");
  }
}

async function run(): Promise<void> {
  // Clear any lingering error badge from a previous failed run.
  void chrome.action.setBadgeText({ text: "" });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    flagError("No active tab");
    return;
  }

  const title = (tab.title && tab.title.trim()) || tab.url;
  const markdown = `[${sanitizeTitle(title)}](${formatUrl(tab.url)})`;

  try {
    await copyToClipboard(markdown);
  } catch (e) {
    console.error("[md-link] clipboard write failed:", e);
    flagError("Copy failed");
    return;
  }

  setTimeout(() => window.close(), AUTO_CLOSE_MS);
}

run();
