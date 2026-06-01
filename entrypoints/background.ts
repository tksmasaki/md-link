export default defineBackground(() => {
  chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "copy-md-link") return;
    try {
      await chrome.action.openPopup();
    } catch (e) {
      console.error("[md-link] openPopup failed:", e);
      await chrome.action.setBadgeText({ text: "!" });
      await chrome.action.setBadgeBackgroundColor({ color: "#c62828" });
      setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
    }
  });
});
