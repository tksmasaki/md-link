# MD Link

Chrome extension that copies the current page as a Markdown link
(`[title](url)`) with a keyboard shortcut.

## Features

- Copy the active tab as `[title](url)` to the clipboard.
- Default shortcut: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>
  (macOS: <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>).
- Shows a small "Copied!" popup for 1 second on success.
- Shortcut can be changed from the options page (or directly at
  `chrome://extensions/shortcuts`).

## Install (unpacked)

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select this directory.
4. (Optional) Pin the extension to the toolbar.

The default shortcut <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> is
registered automatically. If it conflicts with another extension, open
`chrome://extensions/shortcuts` and rebind it.

## Usage

- Press the shortcut, **or** click the toolbar icon.
- The current page's `[title](url)` is copied to the clipboard.
- A green "Copied!" popup appears for 1 second.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Manifest V3 definition and command (shortcut) registration |
| `background.js` | Service worker — receives the command and opens the popup |
| `popup.html` / `popup.js` / `popup.css` | Reads the active tab, writes to clipboard, auto-closes after 1 s |
| `options.html` / `options.js` / `options.css` | Options page — shows current shortcut and links to `chrome://extensions/shortcuts` |
| `icons/icon.svg` | Source icon |
| `icons/icon{16,32,48,128}.png` | Toolbar / store icons |

## Build

The source files at the repository root can be loaded into Chrome directly
(via **Load unpacked**). A `dist/` build is also provided for packaging.

```sh
npm run build      # build into dist/ (already cleans dist/ first)
npm run clean      # remove dist/
npm run rebuild    # clean + build (explicit alias)
```

Requires Node.js 20+.

## Regenerate icons

```sh
for size in 16 32 48 128; do
  sips -s format png icons/icon.svg --out "icons/icon${size}.png" -Z $size
done
```

(macOS' built-in `sips` is used; on other platforms use
`rsvg-convert` or ImageMagick.)
