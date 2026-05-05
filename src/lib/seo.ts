export const siteUrl = 'https://fca.ms';
export const defaultSeoImage = `${siteUrl}/hero-logo.png`;
export const siteName = 'Future Citizen Authority';

type RouteSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string;
  noindex?: boolean;
};

const institutionalDescription =
  'Trusted authority layer for public agencies and regulated institutions to issue verifiable credentials, govern access, and review audit-ready pilot evidence.';

export const routeSeo: Record<string, RouteSeo> = {
  home: {
    title: 'Future Citizen Authority - Trusted Identity Infrastructure for Public Agencies',
    description: institutionalDescription,
    path: '/',
    keywords: 'public sector digital identity, verifiable credentials, access governance, pilot review',
  },
  'review-room': {
    title: 'Review Room - Future Citizen Authority Pilot Evidence Packet',
    description:
      'Review FCA pilot scope, identity controls, custody boundaries, approval matrix, audit trail, data boundary, and 60-90 day pilot decision path.',
    path: '/review-room',
    keywords: 'pilot evidence packet, approval matrix, custody boundary, audit trail, review room',
  },
  'pilot-application': {
    title: 'Request Pilot Review - Future Citizen Authority',
    description:
      'Submit a first pilot review request with organization owner, priority workflow, private data boundary, approval roles, and target pilot window.',
    path: '/pilot-application',
    keywords: 'pilot request, pilot application, institutional review, digital identity pilot',
  },
  privacy: {
    title: 'Privacy Policy - Future Citizen Authority',
    description:
      'Review how fca.ms handles visitor metadata, browser-local conversion events, email correspondence, demo state, and data-subject requests.',
    path: '/privacy',
    keywords: 'privacy policy, local storage, data minimization, visitor metadata, data subject request',
  },
  terms: {
    title: 'Terms of Use - Future Citizen Authority',
    description:
      'Read the review-stage terms for fca.ms, including sample content boundaries, no financial product statement, acceptable use, and legal contact points.',
    path: '/terms',
    keywords: 'terms of use, acceptable use, review-stage material, no financial product',
  },
  security: {
    title: 'Security Posture - Future Citizen Authority',
    description:
      'Review the security posture for fca.ms, including browser demo boundaries, pilot controls, reporting channels, and data minimization principles.',
    path: '/security',
    keywords: 'security posture, vulnerability reporting, pilot controls, browser demo security',
  },
  identity: {
    title: 'Verified Identity - Future Citizen Authority',
    description:
      'Inspect the credential issuance model for privacy-preserving access, service permissions, issuer authority, revocation, and W3C verifiable credential flows.',
    path: '/identity',
    keywords: 'verified identity, W3C credentials, credential issuance, access governance',
  },
  dashboard: {
    title: 'Operating Dashboard - Future Citizen Authority',
    description:
      'Preview representative pilot controls, approval queues, issuance activity, policy escalations, and evidence labels for institutional operators.',
    path: '/dashboard',
    keywords: 'operating dashboard, approval controls, policy escalation, pilot telemetry',
  },
  explorer: {
    title: 'Evidence Explorer - Future Citizen Authority',
    description:
      'Review representative settlement references, audit events, exception records, and exportable evidence for controlled pilot evaluation.',
    path: '/explorer',
    keywords: 'evidence explorer, audit events, settlement references, exception review',
  },
  ecosystem: {
    title: 'Integration Directory - Future Citizen Authority',
    description:
      'Map approved identity, payment, custody, governance, and infrastructure integrations around a controlled pilot deployment.',
    path: '/ecosystem',
    keywords: 'integration directory, identity integrations, payment integrations, governance infrastructure',
  },
  developer: {
    title: 'Integration Portal - Future Citizen Authority',
    description:
      'Preview SDKs, proof hooks, policy surfaces, API posture, and technical appendix material for approved integration partners.',
    path: '/developer',
    keywords: 'developer portal, SDK, proof hooks, policy API, integration tooling',
  },
  community: {
    title: 'Community Appendix - Future Citizen Authority',
    description:
      'Community-oriented appendix pages for specialist audiences, separated from the institutional pilot review path.',
    path: '/community',
    keywords: 'community appendix, specialist materials, Future Citizen Authority',
    noindex: true,
  },
  tokenomics: {
    title: 'Economics Appendix - Future Citizen Authority',
    description: 'Representative economics appendix for community review, separated from institutional pilot materials.',
    path: '/tokenomics',
    keywords: 'economics appendix, community review',
    noindex: true,
  },
  staking: {
    title: 'Network Operations Console - Future Citizen Authority',
    description: 'Representative network operations appendix for community and specialist review.',
    path: '/staking',
    keywords: 'network operations, specialist appendix',
    noindex: true,
  },
  bridge: {
    title: 'Controlled Interoperability - Future Citizen Authority',
    description: 'Representative interoperability appendix for specialist review.',
    path: '/bridge',
    keywords: 'controlled interoperability, specialist appendix',
    noindex: true,
  },
  swap: {
    title: 'Settlement Routing Appendix - Future Citizen Authority',
    description: 'Representative settlement routing appendix for specialist review.',
    path: '/swap',
    keywords: 'settlement routing, specialist appendix',
    noindex: true,
  },
  artifacts: {
    title: 'Public Records Appendix - Future Citizen Authority',
    description: 'Representative public records appendix for specialist review.',
    path: '/artifacts',
    keywords: 'public records appendix, specialist review',
    noindex: true,
  },
  oracle: {
    title: 'Policy Intelligence Appendix - Future Citizen Authority',
    description: 'Representative policy intelligence appendix for specialist review.',
    path: '/oracle',
    keywords: 'policy intelligence, specialist appendix',
    noindex: true,
  },
  sentinel: {
    title: 'FC Sentinel Appendix - Future Citizen Authority',
    description: 'Representative security operations appendix for specialist review.',
    path: '/sentinel',
    keywords: 'security operations, specialist appendix',
    noindex: true,
  },
  whisper: {
    title: 'Communications Appendix - Future Citizen Authority',
    description: 'Representative communications appendix for specialist review.',
    path: '/whisper',
    keywords: 'communications appendix, specialist review',
    noindex: true,
  },
};

export const getSeoForView = (view: string) => {
  const seo = routeSeo[view] ?? routeSeo.home;
  return {
    ...seo,
    canonicalUrl: `${siteUrl}${seo.path}`,
    image: defaultSeoImage,
    robots: seo.noindex ? 'noindex, nofollow' : 'index, follow',
  };
};

export const buildRouteJsonLd = (view: string) => {
  const seo = getSeoForView(view);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: defaultSeoImage,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'review@fca.ms',
        contactType: 'pilot review',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
    },
  ];
};
