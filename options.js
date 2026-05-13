const COMMAND_NAME = "copy-md-link";

function formatShortcut(shortcut) {
  if (!shortcut) return "(not set)";
  return shortcut;
}

async function renderCurrentShortcut() {
  const el = document.getElementById("current-shortcut");
  try {
    const commands = await chrome.commands.getAll();
    const cmd = commands.find((c) => c.name === COMMAND_NAME);
    el.textContent = formatShortcut(cmd && cmd.shortcut);
    el.classList.toggle("muted", !(cmd && cmd.shortcut));
  } catch (e) {
    el.textContent = "(unavailable)";
    console.error("[md-link] failed to read commands:", e);
  }
}

document.getElementById("open-shortcuts").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

renderCurrentShortcut();
