#!/usr/bin/env python3
"""Build a portable static site; no package installation required."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'dist'
if OUTPUT.is_symlink():
    raise SystemExit('Refusing to replace a symlink at dist/.')
OUTPUT.mkdir(exist_ok=True)
for name in ('index.html', '.nojekyll'):
    shutil.copy2(ROOT / name, OUTPUT / name)
for name in ('assets', 'docs'):
    shutil.copytree(ROOT / name, OUTPUT / name, dirs_exist_ok=True)
print(f'Built static site: {OUTPUT}')
