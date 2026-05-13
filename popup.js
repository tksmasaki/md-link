const AUTO_CLOSE_MS = 1000;

function showError(message) {
  const status = document.getElementById("status");
  const icon = document.getElementById("icon");
  const msg = document.getElementById("message");
  status.classList.add("error");
  icon.textContent = "!";
  msg.textContent = message;
}

function escapeMarkdown(text) {
  // Escape characters that would break a Markdown link label.
  return text.replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

async function run() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    showError("No active tab");
    return;
  }

  const title = (tab.title && tab.title.trim()) || tab.url;
  const markdown = `[${escapeMarkdown(title)}](${tab.url})`;

  try {
    await navigator.clipboard.writeText(markdown);
  } catch (e) {
    showError("Copy failed");
    console.error("[md-link] clipboard write failed:", e);
    return;
  }

  setTimeout(() => window.close(), AUTO_CLOSE_MS);
}

run();
