import os
import re
from PIL import Image

imagery_path = 'C:/Users/pkish/HEARTH/src/region-imagery.js'
tex_dir = 'C:/Users/pkish/HEARTH/assets/textures/'

with open(imagery_path, 'r', encoding='utf-8') as f:
    content = f.read()

entries = re.findall(r'(\w+):\s*\{\s*file:\s*[\'"]([^\'"]+)[\'"]', content)

print(f"Total region mappings found: {len(entries)}")
print(f"{'ID':<25} {'File':<36} {'Resolution':<15} {'Size (KB)':<10} {'Status'}")
print('-' * 95)

low_res = []
missing = []

for rid, fname in entries:
    fpath = os.path.join(tex_dir, fname)
    if not os.path.exists(fpath):
        print(f"{rid:<25} {fname:<36} {'MISSING':<15} {'0':<10} FAIL")
        missing.append((rid, fname))
        continue
    sz = os.path.getsize(fpath) / 1024
    try:
        im = Image.open(fpath)
        w, h = im.size
        res_str = f"{w}x{h}"
        status = "OK"
        if w < 1000 or h < 1000:
            status = "LOW_RES (<1000)"
            low_res.append((rid, fname, w, h))
        elif w < 1280 or h < 1280:
            status = "MED_RES (<1280)"
        print(f"{rid:<25} {fname:<36} {res_str:<15} {sz:<10.1f} {status}")
    except Exception as e:
        print(f"{rid:<25} {fname:<36} {'CORRUPT':<15} {sz:<10.1f} {e}")

print("=" * 95)
print(f"Missing count: {len(missing)}")
print(f"Low-res (<1000) count: {len(low_res)}")
