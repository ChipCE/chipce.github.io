# ChipCE.github.io

Source for snakeoildev.com, served by GitHub Pages from the repo root.

## Where files live

**Edit only inside `src/`.** Everything else is generated from it.

| What | Master (edit here) | Copied to |
|---|---|---|
| Product list | `src/public/products.json` | `src/dist/` → repo root |
| Product images | `src/public/img/products/` | `src/dist/img/` → `img/` |
| Car logos (128 px tall) | `src/public/img/logo/` | `src/dist/img/` → `img/` |
| Shop logos | `src/public/img/shop/` | `src/dist/img/` → `img/` |
| Other images (avatar, site logo, background) | `src/public/img/` | `src/dist/img/` → `img/` |
| Product PDFs | `src/public/doc/products/` | `src/dist/doc/` → `doc/` |
| Fonts | `src/python/fonts/*.ttf` (see below) | `src/public/fonts/*.woff2` → `src/dist/fonts/` → `fonts/` |
| Favicon | `src/public/favicon.png` | `src/dist/` → repo root |
| Page HTML | `src/index.html` | `src/dist/` → repo root |
| JS / CSS | `src/src/*.js`, `src/src/style.css` | bundled into `src/dist/assets/` → `assets/` |

Not part of the site:

- `src/python/`: image conversion helper (`imgConvert.py`) and its source images.
- `src/item.html` / `src/src/item.js`: not built or deployed (only `index.html` is a Vite entry).
- `tmp/`: scratch files.

## Paths inside products.json

Paths are written from the site root, e.g. `"/img/products/beat-door-stopper.jpg"` and
`"/doc/products/beat-cassette-phone-holder.pdf"`. That maps to
`src/public/img/products/beat-door-stopper.jpg` in the source.

## Fonts

The full TTFs (3.6 MB) live in `src/python/fonts/` and are not published.
`src/python/subset-fonts.py` cuts them down to small WOFF2 files in `src/public/fonts/`:

- `PixelMplus12-Regular.woff2` (~140 KB): ASCII, kana, JIS level-1 kanji, plus every
  character in `index.html` and `products.json`.
- `icons.woff2` (~3 KB): only the Nerd Font icons written as `&#x....;` in `index.html` / `src/*.js`.

Re-run it after adding a new icon, or text with an uncommon kanji (it would show in a fallback font):

```
cd src/python
pip install -r requirements.txt
python subset-fonts.py
```

## Publishing

```
cd src
export.bat        (or ./export.sh)
```

This runs `npm run build` (`src/public/` + `src/` → `src/dist/`), then copies
`src/dist/*` to the repo root. Commit and push to publish.

Never edit `src/dist/` or the root copies (`index.html`, `products.json`,
`img/`, `doc/`, `fonts/`, `assets/`); they are overwritten on the next export.

Note: the export script deletes the old root `assets/`, `fonts/`, `img/`,
`index.html` and `favicon.png` first, but not `doc/` or `products.json`.
Those are overwritten, so a PDF removed from `src/public/doc/` stays in the root `doc/`
until it is deleted by hand.

## Local preview

```
cd src
npm run dev
```
