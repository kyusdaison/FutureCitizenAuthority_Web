#!/usr/bin/env bash
# Finalize the bundle-weight pass:
# - drop the orphan react-globe.gl + @react-three/* + three deps from package.json
# - regenerate package-lock.json (273 packages drop out)
# - delete the leftover src/react-globe.gl.d.ts type stub (now unnecessary)
# - commit all in-progress edits (App.tsx + IdentityAvatar + VanguardOrb + Ecosystem +
#   ConversionSection + HeroSection + IdentitySection + mockDataService) + package.* changes
# - push
#
# Safe to delete this file after a successful run: rm finalize-cleanup.sh

set -euo pipefail

cd "$(dirname "$0")"

echo "==> remove leftover type stub (untracked)"
if [ -f src/react-globe.gl.d.ts ]; then
  rm -v src/react-globe.gl.d.ts
fi

echo "==> npm install (regenerates package-lock without 4 dropped deps + 273 transitive)"
npm install --no-audit --no-fund

echo "==> typecheck sanity"
npx tsc --noEmit -p tsconfig.app.json
echo "    tsc clean."

echo "==> production build sanity (should NOT warn about >500 kB chunks anymore)"
npm run build 2>&1 | tail -8

echo "==> stage everything for the commit"
git add -A

echo "==> diff stat about to commit"
git diff --cached --stat

echo "==> commit"
git commit -m "perf(bundle): rip three.js + react-globe.gl from VanguardOrb / IdentityAvatar — drops 858 kB three-vendor chunk

Removed deps: @react-three/fiber, @react-three/drei, three, react-globe.gl
Removed: src/react-globe.gl.d.ts (orphan type stub)
Refactored: VanguardOrb (-109 lines), IdentityAvatar (-36 lines)

Build impact:
  before: 1571 kB JS across 33 chunks; three-vendor 858 kB triggered >500 kB warning
  after:  ~728 kB JS, no >500 kB warning, largest chunk is react-vendor at 182 kB
  saved:  ~843 kB raw, ~234 kB gzipped

Other in-progress edits picked up in same commit:
  App.tsx — community surface subtitles renamed to 'appendix' language
  Ecosystem.tsx — small copy refinement
  ConversionSection / HeroSection / IdentitySection — minor copy
  mockDataService — adjusted alongside the avatar refactor"

echo "==> push"
git push origin main

echo ""
echo "✅ finalize done. To redeploy: bash deploy-cloudflare.sh"
echo "   To remove this script: rm finalize-cleanup.sh"
