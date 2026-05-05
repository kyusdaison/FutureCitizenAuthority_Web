#!/usr/bin/env bash
# Commit + push the CipherHeading removal from the 6 institutional surfaces.
# Safe to delete this file after successful run: rm finalize-cipher-removal.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "==> sanity: typecheck"
npx tsc --noEmit -p tsconfig.app.json
echo "    tsc clean."

echo "==> commit"
git add -A
git diff --cached --stat
git commit -m "polish(institutional): drop CipherHeading decode + fake radar stats + breach/ascension cyberpunk themes

Three parallel cleanups that all push the same direction (institutional
register, away from cyberpunk decoration):

1. CipherHeading decode-animation removed from 6 institutional surfaces
   (AudiencePaths, OperatingModel, Identity section + page, Assurance,
   Conversion). Hollywood-style scramble-decode read as 'startup wants
   to look mysterious' rather than 'institutional infrastructure'.
   Component file kept — still in use by 5 community surfaces (Oracle,
   Swap, Artifacts, Sentinel, Staking) where decoder aesthetic fits.

2. /identity page: removed generateHash() emitting fake '0x...' strings
   and the 16-segment radar with hardcoded stats
   [85, 92, 78, 65, 88, 95] labeled TRUST/ACCESS/ACTIVITY/GOVERNANCE.
   Fake metrics on an institutional surface are a credibility leak.

3. theme-breach (whole-site-turns-red on isBreached) and theme-ascension
   (gold mode at level >= 3) removed from App.tsx + index.css. These
   were a parallel game-state machine with no institutional purpose.

Plus accessibility tightening on HexGridBackground (mousemove listener
now respects prefers-reduced-motion and pointer: fine)."

echo "==> push"
git push origin main

echo ""
echo "✅ done. To redeploy: bash deploy-cloudflare.sh"
echo "   To remove this script: rm finalize-cipher-removal.sh"
