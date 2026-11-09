#!/usr/bin/env python3
"""Preview the source locally. Use --built to preview dist/."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=8000)
parser.add_argument('--built', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
if args.built:
    root = root / 'dist'
if not (root / 'index.html').exists():
    raise SystemExit('Run python3 scripts/build.py first.')
server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(SimpleHTTPRequestHandler, directory=str(root)))
print(f'Faisal’s portfolio: http://127.0.0.1:{args.port}', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nPreview stopped.')
finally:
    server.server_close()
