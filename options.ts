const COMMAND_NAME = "copy-md-link";

function formatShortcut(shortcut: string | undefined): string {
  if (!shortcut) return "(not set)";
  return shortcut;
}

function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`[md-link] missing element #${id}`);
  return el as T;
}

async function renderCurrentShortcut(): Promise<void> {
  const el = getElement("current-shortcut");
  try {
    const commands = await chrome.commands.getAll();
    const cmd = commands.find((c) => c.name === COMMAND_NAME);
    el.textContent = formatShortcut(cmd?.shortcut);
    el.classList.toggle("muted", !cmd?.shortcut);
  } catch (e) {
    el.textContent = "(unavailable)";
    console.error("[md-link] failed to read commands:", e);
  }
}

getElement("open-shortcuts").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

renderCurrentShortcut();
