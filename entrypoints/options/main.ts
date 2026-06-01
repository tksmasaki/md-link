import { getElement } from "../../lib/dom";

const COMMAND_NAME = "copy-md-link";

async function renderCurrentShortcut(): Promise<void> {
  const el = getElement("current-shortcut");
  try {
    const commands = await chrome.commands.getAll();
    const cmd = commands.find((c) => c.name === COMMAND_NAME);
    el.textContent = cmd?.shortcut || "(not set)";
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
