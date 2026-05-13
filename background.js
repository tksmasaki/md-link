chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-md-link") return;
  try {
    await chrome.action.openPopup();
  } catch (e) {
    console.error("[md-link] openPopup failed:", e);
  }
});
