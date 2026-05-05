import { readFileSync } from 'node:fs';

const checks = [
  {
    file: 'src/services/previewDataService.ts',
    forbidden: [/https:\/\/images\.unsplash\.com/],
  },
  {
    file: 'src/pages/Staking.tsx',
    required: [/as="h1"/],
    forbidden: [
      /VALIDATOR STAKING/i,
      /Identity Matrix/i,
      /Locking .*FCC/i,
      /Nexus/i,
      /\$DATA/i,
      /SIGN TX/i,
      /\bAPY\b/i,
      /Validator Topology Matrix/i,
    ],
  },
  {
    file: 'src/pages/Swap.tsx',
    required: [/as="h1"/],
    forbidden: [
      /LIQUIDITY MATRIX/i,
      /DECENTRALIZED EXCHANGE/i,
      /Order Book Stream/i,
      /INSUFFICIENT FCC/i,
      /\bMEV\b/i,
      /JITO/i,
      /VANGUARD/i,
      /FCC \//i,
      /Network Fee/i,
      /Execute Swap/i,
      /USDT/i,
    ],
  },
  {
    file: 'src/pages/Bridge.tsx',
    forbidden: [
      /WARP BRIDGE/i,
      /teleport liquidity/i,
      /cryptoverse/i,
      /DARK FOREST/i,
      /MINTING WRAPPED/i,
      /VANGUARD/i,
      /quantum wrap/i,
      /WARP SEQUENCE/i,
    ],
  },
  {
    file: 'src/pages/Artifacts.tsx',
    required: [/as="h1"/],
    forbidden: [
      /Quantum Forge/i,
      /ARTIFACT MINTED/i,
      /ADDED TO MATRIX/i,
      /Cost: 5,000 FCC/i,
      /NON-FUNGIBLE/i,
      /Marketplace/i,
      /Mint Unknown Artifact/i,
    ],
  },
  {
    file: 'src/pages/Oracle.tsx',
    required: [/as="h1"/],
  },
  {
    file: 'src/pages/Sentinel.tsx',
    required: [/as="h1"/],
  },
  {
    file: 'src/pages/ReviewRoom.tsx',
    required: [
      /pilotApplicationRoute/,
      /reviewPacketHref/,
      /Request pilot review/i,
      /Download review packet/i,
      /trackConversionEvent\(['"]pilot_request_started['"]/,
      /trackConversionEvent\(['"]review_packet_downloaded['"]/,
    ],
  },
  {
    file: 'src/sections/ConversionSection.tsx',
    required: [
      /pilotApplicationRoute/,
      /reviewPacketHref/,
      /trackConversionEvent\(['"]pilot_request_started['"]/,
      /trackConversionEvent\(['"]review_packet_downloaded['"]/,
    ],
  },
  {
    file: 'src/sections/FooterSection.tsx',
    required: [
      /pilotApplicationRoute/,
      /reviewPacketHref/,
      /trackConversionEvent\(['"]pilot_request_started['"]/,
      /trackConversionEvent\(['"]review_packet_downloaded['"]/,
    ],
  },
  {
    file: 'src/pages/PilotApplication.tsx',
    required: [
      /Request Pilot Review/,
      /name="organization"/,
      /name="contactEmail"/,
      /name="workflow"/,
      /createPilotRequestMailto/,
      /trackConversionEvent\(['"]pilot_application_submitted['"]/,
    ],
  },
  {
    file: 'src/lib/conversion.ts',
    required: [
      /pilotApplicationRoute = '\/pilot-application'/,
      /pilotRequestMailtoBase = 'mailto:review@fca\.ms'/,
      /fca:conversion-events/,
      /trackConversionEvent/,
      /createPilotRequestMailto/,
    ],
  },
  {
    file: 'src/App.tsx',
    required: [
      /PilotApplication/,
      /pilot-application/,
      /Privacy/,
      /Terms/,
      /Security/,
      /privacy/,
      /terms/,
      /security/,
      /<SeoMeta currentView=\{currentView\}/,
    ],
  },
  {
    file: 'src/lib/seo.ts',
    required: [
      /siteUrl = 'https:\/\/fca\.ms'/,
      /routeSeo/,
      /review-room/,
      /pilot-application/,
      /privacy/,
      /terms/,
      /security/,
      /buildRouteJsonLd/,
      /noindex/,
    ],
  },
  {
    file: 'src/components/SeoMeta.tsx',
    required: [
      /document\.title/,
      /setMetaByName\('description'/,
      /setMetaByProperty\('og:title'/,
      /setMetaByName\('twitter:card'/,
      /rel="canonical"/,
      /application\/ld\+json/,
      /getSeoForView/,
    ],
  },
  {
    file: 'index.html',
    required: [
      /og:site_name/,
      /og:locale/,
      /twitter:site/,
      /theme-color/,
      /https:\/\/fca\.ms\/hero-logo\.png/,
    ],
  },
  {
    file: 'src/pages/Privacy.tsx',
    required: [/Privacy policy/i, /fca:conversion-events/, /privacy@fca\.ms/, /localStorage/i],
  },
  {
    file: 'src/pages/Terms.tsx',
    required: [/Terms of use/i, /Not a financial product/i, /legal@fca\.ms/],
  },
  {
    file: 'src/pages/Security.tsx',
    required: [/Security posture/i, /security@fca\.ms/, /Vulnerability reporting/i, /Pilot controls/i],
  },
  {
    file: 'src/components/Sidebar.tsx',
    required: [/privacy/, /terms/, /security/],
  },
  {
    file: 'src/sections/FooterSection.tsx',
    required: [/privacy/, /terms/, /security/],
  },
  {
    file: 'public/sitemap.xml',
    required: [/https:\/\/fca\.ms\/privacy/, /https:\/\/fca\.ms\/terms/, /https:\/\/fca\.ms\/security/],
  },
  {
    file: 'public/fca-review-packet.md',
    required: [/Future Citizen Authority Review Packet/i, /review@fca\.ms/i, /Pilot scope memo/i],
  },
];

const failures = [];

for (const check of checks) {
  let text = '';

  try {
    text = readFileSync(check.file, 'utf8');
  } catch {
    failures.push(`${check.file}: missing file`);
    continue;
  }

  for (const pattern of check.required ?? []) {
    if (!pattern.test(text)) {
      failures.push(`${check.file}: missing ${pattern}`);
    }
  }

  for (const pattern of check.forbidden ?? []) {
    if (pattern.test(text)) {
      failures.push(`${check.file}: forbidden ${pattern}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Content guard failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Content guard passed');
