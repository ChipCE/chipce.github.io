# Build small WOFF2 web fonts from the source TTFs in python/fonts/.
# Re-run after adding a new icon, or text with uncommon kanji.
#   cd src/python
#   python subset-fonts.py
import re
from pathlib import Path

from fontTools import subset

HERE = Path(__file__).resolve().parent
SRC = HERE.parent                      # src/
FONTS_IN = HERE / "fonts"
FONTS_OUT = SRC / "public" / "fonts"

PAGES = [SRC / "index.html", SRC / "public" / "products.json"]
SCRIPTS = list((SRC / "src").glob("*.js"))


def common_japanese():
    """ASCII, CJK punctuation, kana, full-width forms and JIS level-1 kanji."""
    chars = {chr(c) for c in range(0x20, 0x7F)}
    chars |= {chr(c) for c in range(0x3000, 0x3100)}
    chars |= {chr(c) for c in range(0xFF00, 0xFFF0)}
    # Shift_JIS lead bytes 0x81-0x98 cover symbols, kana and level-1 kanji
    for hi in range(0x81, 0x99):
        for lo in range(0x40, 0xFD):
            try:
                chars.add(bytes([hi, lo]).decode("shift_jis"))
            except UnicodeDecodeError:
                pass
    return chars


def used_icons():
    """Code points written as &#x....; in the page and scripts."""
    codes = set()
    for f in PAGES[:1] + SCRIPTS:
        codes |= {int(h, 16) for h in re.findall(r"&#x([0-9a-fA-F]+);", f.read_text(encoding="utf-8"))}
    return codes


def build(src, out, unicodes):
    options = subset.Options()
    options.flavor = "woff2"
    font = subset.load_font(src, options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    subset.save_font(font, out, options)
    print(f"{out.name}: {out.stat().st_size / 1024:.1f} KB")


FONTS_OUT.mkdir(exist_ok=True)

text = common_japanese()
for f in PAGES:
    text |= set(f.read_text(encoding="utf-8"))
build(FONTS_IN / "PixelMplus12-Regular.ttf", FONTS_OUT / "PixelMplus12-Regular.woff2",
      {ord(c) for c in text})

build(FONTS_IN / "GohuFont11NerdFontMono-Regular.ttf", FONTS_OUT / "icons.woff2", used_icons())
