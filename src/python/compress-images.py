# Shrink images that are over a size threshold, in place.
# Originals are copied to tmp/img-originals/ (git-ignored) before being overwritten.
#   cd src/python
#   python compress-images.py                 # src/public/img/products, files over 300 KB
#   python compress-images.py --dry-run
#   python compress-images.py ../public/img --max-kb 200
import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageOps

HERE = Path(__file__).resolve().parent
SRC = HERE.parent                                   # src/
REPO = SRC.parent
BACKUP = REPO / "tmp" / "img-originals"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

parser = argparse.ArgumentParser()
parser.add_argument("paths", nargs="*", default=[SRC / "public" / "img" / "products"])
parser.add_argument("--max-kb", type=int, default=300, help="only touch files bigger than this")
parser.add_argument("--max-size", type=int, default=1280, help="longest edge in px")
parser.add_argument("--quality", type=int, default=82, help="JPEG/WebP quality")
parser.add_argument("--dry-run", action="store_true")
args = parser.parse_args()

files = []
for p in map(Path, args.paths):
    files += [f for f in sorted(p.rglob("*")) if f.suffix.lower() in EXTS] if p.is_dir() else [p]

before = after = 0
for f in files:
    size = f.stat().st_size
    if size <= args.max_kb * 1024:
        continue
    if args.dry_run:
        print(f"would compress {f.name}: {size // 1024} KB")
        continue

    backup = BACKUP / f.resolve().relative_to(REPO)
    if not backup.exists():
        backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, backup)

    im = ImageOps.exif_transpose(Image.open(f))     # apply camera rotation before EXIF is dropped
    im.thumbnail((args.max_size, args.max_size), Image.LANCZOS)
    if f.suffix.lower() in {".jpg", ".jpeg"}:
        im.convert("RGB").save(f, quality=args.quality, optimize=True, progressive=True)
    elif f.suffix.lower() == ".webp":
        im.save(f, quality=args.quality)
    else:
        im.save(f, optimize=True)

    new = f.stat().st_size
    before += size
    after += new
    print(f"{f.name}: {size // 1024} KB -> {new // 1024} KB ({im.width}x{im.height})")

if before:
    print(f"total: {before / 1048576:.1f} MB -> {after / 1048576:.1f} MB, originals in {BACKUP}")
