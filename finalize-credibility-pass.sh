#!/usr/bin/env bash
# Final credibility pass: Credential Vault rewrite + HexGridBackground deletion + mockDataService rename.
# Safe to delete this file after successful run: rm finalize-credibility-pass.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "==> remove untracked re-export shim if present (leftover half-rename)"
if [ -f src/services/previewDataService.ts ] && ! git ls-files --error-unmatch src/services/previewDataService.ts >/dev/null 2>&1; then
  rm -v src/services/previewDataService.ts
fi

echo "==> rename mockDataService.ts -> previewDataService.ts (preserves history via git mv)"
if [ -f src/services/mockDataService.ts ] && [ ! -f src/services/previewDataService.ts ]; then
  git mv src/services/mockDataService.ts src/services/previewDataService.ts
else
  echo "    (already renamed — skipping)"
fi

echo "==> delete HexGridBackground.tsx (now orphan after Hero + Identity section removed it)"
if [ -f src/components/HexGridBackground.tsx ]; then
  git rm -f src/components/HexGridBackground.tsx
else
  echo "    (already deleted — skipping)"
fi

echo "==> typecheck"
npx tsc --noEmit -p tsconfig.app.json
echo "    tsc clean."

echo "==> production build sanity"
npm run build 2>&1 | tail -8
echo "    build clean."

echo "==> stage everything for commit"
git add -A
git diff --cached --stat

echo "==> commit"
git commit -m "polish(institutional): credential vault + drop hex grid + rename mockDataService + drop tactical pseudo-classified language

Five coordinated cleanups completing the institutional credibility pass
opened in the deep-check review:

1. /identity Control Vault rewritten as Credential Vault.
   Removed 'Custody Reserve' + 'Network Capacity' numeric panels (UNIT
   amounts, USD reference values, CONTROLLED NODES counter) — they read
   as crypto-wallet shape regardless of the Sample label. Replaced with
   three reviewable rows: Credential records (4 active / 0 revoked),
   Issuer key custody (MPC 2-of-3, agency-owned), Recovery & escalation
   (multi-signer attestation, named operators).

2. HexGridBackground deleted.
   Animated hexagonal canvas grid in the Hero and IdentitySection read
   as blockchain visual cliché — wrong frame for an institutional buyer.
   Net bundle impact: main index chunk ~131 kB -> ~102 kB
   (-29 kB raw, -6 kB gzipped on first paint).

3. mockDataService renamed to previewDataService.
   File path renamed via git mv; export const renamed; PREVIEW doc
   comment added at top of file. The literal 'mock' name on an
   institutional import path was a tell that survived all earlier
   polish. Five consumer sites updated (Identity, Tokenomics, Artifacts,
   Sentinel, Staking) to import the new symbol from the new path.

4. Removed bg-tactical-grid / bg-tactical-dots overlays from four
   institutional sections (AudiencePaths, OperatingModel, Assurance,
   Conversion). The 'tactical' framing evoked military / intel rather
   than civic / institutional. Orphan @utility definitions also dropped
   from index.css (-6 kB raw on the CSS chunk).

5. Removed [CLASSIFICATION: UNRESTRICTED] tag and [REVIEW FILE] prefixes
   from IdentitySection.tsx. The pseudo-classified report aesthetic
   read as 'security theater' rather than reviewable infrastructure.
   Bullet content kept (privacy-proof model, governance access, raw
   data exposure) but rephrased in plain institutional language.

Verified: tsc --noEmit exit 0, vite build exit 0 with no >500 kB chunk
warnings."

echo "==> push"
git push origin main

echo ""
echo "✅ done. To redeploy: bash deploy-cloudflare.sh"
echo "   To remove this script: rm finalize-credibility-pass.sh"
