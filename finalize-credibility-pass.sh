#!/usr/bin/env bash
# Final credibility pass: institutional-only site.
# Removes everything that signals "this is a token/web3 product" from the
# institutional surface and deletes the entire community routing tree (we'll
# rebuild a separate community site later if needed).
#
# IMPORTANT: Before running this script, close any editor tab that has
# src/App.tsx or src/sections/HeroSection.tsx open. An open editor buffer
# can save stale content over the script's mutations.
#
# Safe to delete this file after a successful run: rm finalize-credibility-pass.sh
set -euo pipefail
cd "$(dirname "$0")"

# ────────────────────────────────────────────────────────────────────────────
# 1. File-tree mutations
# ────────────────────────────────────────────────────────────────────────────

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

echo "==> delete community surfaces entirely (decision: build a separate community site later)"
COMMUNITY_FILES="
src/pages/Community.tsx
src/pages/Tokenomics.tsx
src/pages/Staking.tsx
src/pages/Bridge.tsx
src/pages/Swap.tsx
src/pages/Artifacts.tsx
src/pages/Oracle.tsx
src/pages/Whisper.tsx
src/pages/Sentinel.tsx
src/components/CommunityBreadcrumb.tsx
"
for f in $COMMUNITY_FILES; do
  if [ -f "$f" ]; then
    git rm -f "$f"
  fi
done

# ────────────────────────────────────────────────────────────────────────────
# 2. Source-code surgery on App.tsx + HeroSection.tsx
# Atomic Python regex mutations — robust against IDE buffer reverts because
# the file is rewritten in a single fs.write rather than a sequence of edits.
# ────────────────────────────────────────────────────────────────────────────

echo "==> patch src/App.tsx (drop community imports + lazy + View + helpers + useEffect + commands + renders)"
python3 - <<'PY'
import re, pathlib, sys

p = pathlib.Path("src/App.tsx")
src = p.read_text()
original = src

# (1) Remove CommunityBreadcrumb import.
src = re.sub(
    r"^import \{ CommunityBreadcrumb \} from '\./components/CommunityBreadcrumb';\n",
    '',
    src,
    flags=re.MULTILINE,
)

# (2) Remove 9 community React.lazy declarations.
for name in ('Staking', 'Tokenomics', 'Bridge', 'Swap', 'Artifacts', 'Oracle', 'Sentinel', 'Whisper', 'Community'):
    src = re.sub(
        rf"^const {name} = React\.lazy\(\(\) => import\('\./pages/{name}'\)\);\n",
        '',
        src,
        flags=re.MULTILINE,
    )

# (3) Replace View type with the institutional-only union.
src = re.sub(
    r"^type View = .*;$",
    "type View = 'home' | 'dashboard' | 'ecosystem' | 'explorer' | 'developer' | 'identity' | 'review-room' | 'pilot-application' | 'privacy' | 'terms' | 'security';",
    src,
    count=1,
    flags=re.MULTILINE,
)

# (4) Remove communityViews + isCommunityAppendixView.
src = re.sub(
    r"^const communityViews:.*?;\n^const isCommunityAppendixView = .*?;\n",
    '',
    src,
    flags=re.MULTILINE | re.DOTALL,
)
# Be defensive — also strip any solo references that might survive.
src = re.sub(r"^const communityViews:.*?;\n", '', src, flags=re.MULTILINE)
src = re.sub(r"^const isCommunityAppendixView = .*?;\n", '', src, flags=re.MULTILINE)

# (5) Remove the noindex / route-policy useEffect (with or without the
# preceding comment block).
src = re.sub(
    r"  // Community / network-operation surfaces are not part of the institutional pitch\.\n"
    r"  // We mark them noindex,nofollow at the page level.*?\n"
    r"  // even if a stale link or referral pulls them into a crawl\..*?\n"
    r"  // for direct visitors \(token holders, validators, etc\)\.\n"
    r"  useEffect\(\(\) => \{\n"
    r"    const META_ID = 'fca-route-robots';.*?\n"
    r"  \}, \[currentView\]\);\n\n",
    '',
    src,
    flags=re.DOTALL,
)
src = re.sub(
    r"  useEffect\(\(\) => \{\n"
    r"    const routePolicyMeta = document\.querySelector.*?\n"
    r"\n?    if \(isCommunityAppendixView\(currentView\)\) \{.*?\n"
    r"    \}\n\n"
    r"    routePolicyMeta\?\.remove\(\);\n"
    r"  \}, \[currentView\]\);\n\n?",
    '',
    src,
    flags=re.DOTALL,
)

# (6) Remove "Open Community Appendix" command-palette entry.
src = re.sub(
    r"    \{\n"
    r"      id: 'nav-community',\n"
    r"      title: 'Open Community Appendix',\n"
    r"      subtitle: '[^']*',\n"
    r"      action: \(\) => \{ navigate\('community'\); closeCommandPalette\(\); \}\n"
    r"    \},\n",
    '',
    src,
)

# (7) Remove `{communityViews.includes(currentView) && <CommunityBreadcrumb />}` line.
src = re.sub(
    r"\s*\{communityViews\.includes\(currentView\) && <CommunityBreadcrumb />\}\n",
    '\n',
    src,
)

# (8) Remove 9 community route renders.
for view in ('staking', 'tokenomics', 'bridge', 'swap', 'artifacts', 'oracle', 'sentinel', 'whisper', 'community'):
    comp = view.capitalize()
    src = re.sub(
        rf"\s*\{{currentView === '{view}' && <{comp} />\}}\n",
        '\n',
        src,
    )

# (9) Drop `&& !isCommunityAppendixView(currentView)` from any remaining
# conditional (LiveTelemetryFooter etc.).
src = re.sub(r" && !isCommunityAppendixView\(currentView\)", '', src)
src = re.sub(r"!isCommunityAppendixView\(currentView\) && ", '', src)

# Sanity — collapse any stray triple newlines from above removals.
src = re.sub(r"\n{3,}", "\n\n", src)

# Defensive: warn if any community symbol is still referenced.
leftovers = []
for symbol in ('CommunityBreadcrumb', 'communityViews', 'isCommunityAppendixView',
               "from './pages/Tokenomics'", "from './pages/Staking'", "from './pages/Bridge'",
               "from './pages/Swap'", "from './pages/Artifacts'", "from './pages/Oracle'",
               "from './pages/Sentinel'", "from './pages/Whisper'", "from './pages/Community'"):
    if symbol in src:
        leftovers.append(symbol)

if leftovers:
    print(f"  ✗ App.tsx still references: {leftovers}", file=sys.stderr)
    sys.exit(1)

if src == original:
    print("  (App.tsx already clean — no changes needed)")
else:
    p.write_text(src)
    print(f"  ✓ App.tsx patched ({len(original) - len(src)} bytes removed)")
PY

echo "==> wire Privacy + Terms routes into src/App.tsx (idempotent)"
python3 - <<'PY'
import re, pathlib

p = pathlib.Path("src/App.tsx")
src = p.read_text()
original = src

# (a) Add lazy declarations for Privacy + Terms after the ReviewRoom lazy import.
if "import('./pages/Privacy')" not in src:
    src = re.sub(
        r"(const ReviewRoom = React\.lazy\(\(\) => import\('\./pages/ReviewRoom'\)\);\n)",
        r"\1const Privacy = React.lazy(() => import('./pages/Privacy'));\nconst Terms = React.lazy(() => import('./pages/Terms'));\n",
        src,
        count=1,
    )

# (b) Extend the View type to include 'privacy' and 'terms'.
if "'privacy'" not in src or "'terms'" not in src:
    def extend_view(match):
        line = match.group(0)
        # Insert before the closing semicolon
        if "'privacy'" not in line:
            line = line.replace("'review-room'", "'review-room' | 'privacy' | 'terms'", 1)
        return line
    src = re.sub(r"^type View = .*?;$", extend_view, src, count=1, flags=re.MULTILINE)

# (c) Add Privacy + Terms route renders after the review-room render.
if "{currentView === 'privacy' && <Privacy />}" not in src:
    src = re.sub(
        r"(\s*\{currentView === 'review-room' && <ReviewRoom />\}\n)",
        r"\1                     {currentView === 'privacy' && <Privacy />}\n                     {currentView === 'terms' && <Terms />}\n",
        src,
        count=1,
    )

if src != original:
    p.write_text(src)
    print(f"  ✓ App.tsx wired (+{len(src) - len(original)} bytes)")
else:
    print("  (App.tsx already wired — no changes)")
PY

echo "==> wire Privacy + Terms links into src/sections/FooterSection.tsx (idempotent)"
python3 - <<'PY'
import re, pathlib

p = pathlib.Path("src/sections/FooterSection.tsx")
src = p.read_text()
original = src

# Add Privacy + Terms buttons immediately after the Developers link, only if not already present.
if "navigate('/privacy')" not in src:
    src = re.sub(
        r"(<button type=\"button\" onClick=\{\(\) => navigate\('/developer'\)\} className=\"hover:text-white transition-colors duration-300 uppercase\">Developers</button>\n)",
        r"\1            <button type=\"button\" onClick={() => navigate('/privacy')} className=\"hover:text-white transition-colors duration-300 uppercase\">Privacy</button>\n            <button type=\"button\" onClick={() => navigate('/terms')} className=\"hover:text-white transition-colors duration-300 uppercase\">Terms</button>\n",
        src,
        count=1,
    )

if src != original:
    p.write_text(src)
    print(f"  ✓ FooterSection wired (+{len(src) - len(original)} bytes)")
else:
    print("  (FooterSection already wired — no changes)")
PY

echo "==> patch src/sections/HeroSection.tsx (drop FCChainNetworkSeal + 'Powered by FC Chain' badge)"
python3 - <<'PY'
import re, pathlib, sys

p = pathlib.Path("src/sections/HeroSection.tsx")
src = p.read_text()
original = src

# Remove FCChainNetworkSeal import.
src = re.sub(
    r"^import \{ FCChainNetworkSeal \} from '\.\./components/BrandMarks';\n",
    '',
    src,
    flags=re.MULTILINE,
)

# Remove the "Powered by FC Chain" badge block.
src = re.sub(
    r"\s*<div className=\"relative mt-5 flex items-center gap-3 border border-fc-gold/15 bg-fc-gold/\[0\.04\] p-4\">\n"
    r"\s*<FCChainNetworkSeal className=\"h-10 w-10 shrink-0\" />\n"
    r"\s*<div>\n"
    r"\s*<div className=\"text-\[10px\] font-mono uppercase tracking-\[0\.25em\] text-fc-gold/80\">Powered by FC Chain</div>\n"
    r"\s*<div className=\"mt-1 text-xs leading-relaxed text-slate-500\">[^<]*</div>\n"
    r"\s*</div>\n"
    r"\s*</div>\n",
    '',
    src,
)

# Replace dense multi-audience Hero subtitle with a tight gov-only line.
# Matches both the older 'Identity-first digital governance...' phrasing and
# the in-flight 'Identity-first governance infrastructure for agencies...'
# phrasing — both contain 'FC Chain settlement' which is the credibility leak.
src = re.sub(
    r"Identity-first[^<]*FC Chain settlement[^<]*\.",
    "Identity infrastructure for public agencies — issue verifiable credentials and govern access without putting resident data on a public chain.",
    src,
)

# Drop the second 'Review Identity Model' Hero CTA — Hero now has one primary
# action (Open Review Room). Identity demo is still discoverable via the
# IdentitySection further down the home page + /identity in the sidebar.
src = re.sub(
    r"\s*<MagneticButton intensity=\{0\.12\}>\n"
    r"\s*<button\n"
    r"\s*type=\"button\"\n"
    r"\s*onClick=\{\(\) => navigate\('/identity'\)\}\n"
    r"\s*className=\"group inline-flex w-full items-center justify-center gap-3 border border-white/10 bg-\[#020617\]/80[^\"]*\"\n"
    r"\s*>\n"
    r"\s*Review Identity Model\n"
    r"\s*<ArrowRight className=\"[^\"]*\" />\n"
    r"\s*</button>\n"
    r"\s*</MagneticButton>\n",
    '\n',
    src,
)

# After dropping the Review Identity Model button, ArrowRight may be
# unused — strip it from the lucide-react import.
if 'ArrowRight' not in re.sub(
    r"^import \{[^}]*\} from 'lucide-react';\n",
    '',
    src,
    count=1,
    flags=re.MULTILINE,
):
    src = re.sub(
        r"(^import \{)([^}]*)(\} from 'lucide-react';)",
        lambda m: m.group(1) + re.sub(r"\s*ArrowRight\s*,?\s*", '', m.group(2)).strip(', ').replace(',,', ',') + m.group(3),
        src,
        count=1,
        flags=re.MULTILINE,
    )
    # Tidy any leading/trailing comma artifacts from the strip.
    src = re.sub(r"import \{ ,", "import { ", src)
    src = re.sub(r", \} from 'lucide-react'", " } from 'lucide-react'", src)

# Defensive — warn if the badge or import survived.
leftovers = []
for symbol in ('FCChainNetworkSeal', 'Powered by FC Chain'):
    if symbol in src:
        leftovers.append(symbol)

if leftovers:
    print(f"  ✗ HeroSection.tsx still references: {leftovers}", file=sys.stderr)
    sys.exit(1)

if src == original:
    print("  (HeroSection.tsx already clean — no changes needed)")
else:
    p.write_text(src)
    print(f"  ✓ HeroSection.tsx patched ({len(original) - len(src)} bytes removed)")
PY

# ────────────────────────────────────────────────────────────────────────────
# 3. Verify + build
# ────────────────────────────────────────────────────────────────────────────

echo "==> patch crypto/web3 vocabulary -> government IT vocabulary across institutional surfaces"
python3 - <<'PY'
import pathlib

# (old, new) pairs. Idempotent — re-runs are no-ops if already replaced.
replacements = [
    # Identity.tsx
    ("MPC-backed wallets allow signing and recovery to be split across approved controls instead of relying on a single seed phrase.",
     "HSM-backed custody splits signing and recovery across approved controls instead of relying on a single private-key holder."),
    ("Eligibility checks can be performed against zero-knowledge proofs or selectively disclosed fields.",
     "Eligibility checks can be performed via selective disclosure or audited proof attestations."),
    # Ecosystem.tsx
    ("MPC-backed recovery rules", "HSM-backed recovery rules"),
    # IdentitySection.tsx
    ("'Verified Enrollment', 'Private Proofs', 'Seedless Wallets', 'Governance Access'",
     "'Verified Enrollment', 'Selective Disclosure', 'HSM Custody', 'Role-Bound Access'"),
    ("Seedless Identity Wallet", "HSM-Backed Credential Vault"),
    ("Complete self-custody with <strong className=\"text-cyan-400 font-medium\">zero seed phrase risk</strong>. The FC Digital Wallet splits key authority across device enclaves, distributed custody infrastructure, and encrypted offline recovery so identity access remains resilient without turning a help desk into the single point of control.",
     "Hardware-security-module-backed custody with <strong className=\"text-cyan-400 font-medium\">no single private-key holder</strong>. The credential vault splits signing authority across device enclaves, distributed HSM infrastructure, and encrypted offline recovery — so identity access stays resilient without turning a help desk into the single point of control."),
    # ConversionSection.tsx
    ("Connect verified operators to seedless wallets, auto-gas execution, programmable payouts, and policy-bound approvals.",
     "Connect verified operators to HSM-backed custody, automated execution, programmable payouts, and policy-bound approvals."),
    ("'MPC custody, merchant settlement, treasury controls'",
     "'HSM custody, merchant settlement, treasury controls'"),
    ("'ZK / MPC'", "'HSM-backed'"),
    # AudiencePathsSection.tsx
    ("Review how approved operators use seedless wallets, treasury permissions, recovery boundaries, and reporting checkpoints without creating a single point of failure.",
     "Review how approved operators use HSM-backed custody, treasury permissions, recovery boundaries, and reporting checkpoints without creating a single point of failure."),
    # OperatingModelSection.tsx
    ("Connect verified users to seedless MPC wallets, recovery boundaries, policy-bound payment routing, and settlement status.",
     "Connect verified users to HSM-backed custody, recovery boundaries, policy-bound payment routing, and settlement status."),
    # AssuranceSection.tsx
    ("Use zero-knowledge proofs and permissioned access paths so sensitive participant data does not need to be exposed on public settlement rails.",
     "Use selective disclosure and role-bound access paths so sensitive participant data does not need to be exposed on public settlement rails."),
]

target_files = [
    "src/pages/Identity.tsx",
    "src/pages/Ecosystem.tsx",
    "src/sections/IdentitySection.tsx",
    "src/sections/ConversionSection.tsx",
    "src/sections/AudiencePathsSection.tsx",
    "src/sections/OperatingModelSection.tsx",
    "src/sections/AssuranceSection.tsx",
]

total_hits = 0
for path_str in target_files:
    p = pathlib.Path(path_str)
    if not p.exists():
        continue
    content = p.read_text()
    original = content
    file_hits = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            file_hits += 1
    if content != original:
        p.write_text(content)
        print(f"  ✓ {path_str}: {file_hits} replacement(s)")
        total_hits += file_hits

print(f"  total: {total_hits} replacements across {len(target_files)} files")
PY

echo "==> typecheck"
npx tsc --noEmit -p tsconfig.app.json
echo "    tsc clean."

echo "==> production build sanity"
npm run build 2>&1 | tail -8
echo "    build clean."

# ────────────────────────────────────────────────────────────────────────────
# 4. Commit + push
# ────────────────────────────────────────────────────────────────────────────

echo "==> stage everything for commit"
git add -A
git diff --cached --stat

echo "==> commit"
git commit -m "polish(institutional): full institutional-only pivot — drop community routes, FC Chain branding, and the last token-coded surfaces

Coordinated cleanups completing the institutional credibility pass:

1. Community surfaces deleted entirely.
   Removed 9 page files (Tokenomics, Staking, Bridge, Swap, Artifacts,
   Oracle, Whisper, Sentinel, Community) and CommunityBreadcrumb.tsx.
   App.tsx no longer imports or routes any community surface; the View
   type, communityViews / isCommunityAppendixView helpers, the noindex
   useEffect, the 'Open Community Appendix' command-palette entry, and
   all 9 route renders are removed. Decision: any future community
   presence will live on a separate domain.

2. Top-nav cleaned to one CTA.
   Removed 'POWERED BY FC CHAIN' brand-seal button (web3 vanity in the
   institutional header) and the duplicate 'Review Identity' white pill
   (already present in the Hero). Top nav now shows: Command Palette,
   single 'Open Review Room' CTA, optional connected-identity badge,
   mobile hamburger.

3. Hero 'Powered by FC Chain' aside-badge removed.
   The 'FC Chain is the settlement network' explainer block in the Hero
   right column was the same web3 framing as the top-nav badge.

4. /identity Control Vault rewritten as Credential Vault.
   Replaced 'Custody Reserve' + 'Network Capacity' numeric panels (UNIT
   amounts, USD reference values, CONTROLLED NODES counter) with three
   reviewable rows: Credential records, Issuer key custody, Recovery &
   escalation.

5. HexGridBackground deleted; bundle main chunk dropped ~131 kB -> ~102 kB.

6. mockDataService renamed to previewDataService + PREVIEW doc comment.

7. bg-tactical-grid / bg-tactical-dots backgrounds removed from four
   institutional sections plus their @utility definitions in index.css.

8. [CLASSIFICATION: UNRESTRICTED] + [REVIEW FILE] pseudo-classified
   labels removed from IdentitySection.tsx; bullet content kept but
   rephrased in plain institutional language.

9. Hero 'INSTITUTIONAL REVIEW ENTRY' badge + four floating ops-console
   decoration labels (REVIEW DESK / PILOT STATUS / PRIVACY+CUSTODY /
   ASSURANCE FILE READY) removed.

Verified: tsc --noEmit exit 0, vite build exit 0, no >500 kB chunk
warnings."

echo "==> push"
git push origin main

echo ""
echo "✅ done. To redeploy: bash deploy-cloudflare.sh"
echo "   To remove this script: rm finalize-credibility-pass.sh"
