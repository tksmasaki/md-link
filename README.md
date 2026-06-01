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

1. Run `npm install` then `npm run build` to produce `.output/chrome-mv3/`.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `.output/chrome-mv3/` directory.
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
| `wxt.config.ts` | Manifest definition and command (shortcut) registration |
| `entrypoints/background.ts` | Service worker — receives the command and opens the popup |
| `entrypoints/popup/` (`index.html` / `main.ts` / `popup.css`) | Reads the active tab, writes to clipboard, auto-closes after 1 s |
| `entrypoints/options/` (`index.html` / `main.ts` / `options.css`) | Options page — shows current shortcut and links to `chrome://extensions/shortcuts` |
| `lib/markdown.ts` / `lib/dom.ts` | Shared helpers (Markdown formatting, DOM lookups) |
| `tsconfig.json` | TypeScript compiler config (extends WXT's generated config) |
| `icon.svg` | Source icon |
| `public/icons/icon{16,32,48,128}.png` | Toolbar / store icons |

## Build

Built with [WXT](https://wxt.dev/) (a Vite-based extension framework). Load the
produced `.output/chrome-mv3/` directory into Chrome via **Load unpacked**.

```sh
npm install        # install dependencies
npm run dev        # WXT dev server with HMR for popup/options
npm run build      # production build into .output/chrome-mv3/
npm run zip        # build a distributable zip
npm run typecheck  # type check
npm test           # unit tests
```

Requires Node.js 20+.

## Tech stack

- TypeScript
- [WXT](https://wxt.dev/) (Vite-based extension framework)
- Manifest V3
- Vitest

## Regenerate icons

```sh
for size in 16 32 48 128; do
  sips -s format png icon.svg --out "public/icons/icon${size}.png" -Z $size
done
```

(macOS' built-in `sips` is used; on other platforms use
`rsvg-convert` or ImageMagick.)
