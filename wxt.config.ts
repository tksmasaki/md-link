import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "MD Link",
    description: "Copy the current page as a Markdown link: [title](url).",
    minimum_chrome_version: "127",
    permissions: ["activeTab"],
    action: {
      default_title: "Copy page as Markdown link",
      default_icon: {
        16: "icons/icon16.png",
        32: "icons/icon32.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png",
      },
    },
    icons: {
      16: "icons/icon16.png",
      32: "icons/icon32.png",
      48: "icons/icon48.png",
      128: "icons/icon128.png",
    },
    commands: {
      "copy-md-link": {
        suggested_key: {
          default: "Ctrl+Shift+L",
          mac: "Command+Shift+L",
        },
        description: "Copy current page as Markdown link",
      },
    },
  },
});
