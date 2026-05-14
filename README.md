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

1. Run `npm install` then `npm run build` to produce `dist/`.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `dist/` directory.
5. (Optional) Pin the extension to the toolbar.

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
| `background.ts` | Service worker — receives the command and opens the popup |
| `popup.html` / `popup.ts` / `popup.css` | Reads the active tab, writes to clipboard, auto-closes after 1 s |
| `options.html` / `options.ts` / `options.css` | Options page — shows current shortcut and links to `chrome://extensions/shortcuts` |
| `tsconfig.json` | TypeScript compiler config (typecheck only; Vite/CRXJS handle bundling) |
| `icons/icon.svg` | Source icon |
| `icons/icon{16,32,48,128}.png` | Toolbar / store icons |

## Build

Bundled with [Vite](https://vitejs.dev/) and
[@crxjs/vite-plugin](https://crxjs.dev/vite-plugin). Load the produced
`dist/` directory into Chrome via **Load unpacked**.

```sh
npm install        # install Vite and @crxjs/vite-plugin
npm run dev        # vite dev server with HMR for popup/options
npm run build      # production build into dist/
npm run preview    # preview the built dist/
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
