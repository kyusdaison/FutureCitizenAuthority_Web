export interface ArtifactData {
  id: string;
  type: string;
  rarity: string;
  power: number;
  owner: string;
  image: string;
  traits: string[];
  status: string;
}

const MOCK_ARTIFACTS: ArtifactData[] = [
  {
    id: 'CRD-RES-0148',
    type: 'Resident Credential',
    rarity: 'Legendary',
    power: 9940,
    owner: '0x49fA…bD21',
    image: '/products/fcc_series3_resident_1774149181409.png',
    traits: ['Issuer-attested', 'Recovery-bound', 'Audit-sealed'],
    status: 'Active'
  },
  {
    id: 'CRD-OPS-0072',
    type: 'Treasury Operator Key',
    rarity: 'Rare',
    power: 4200,
    owner: '0x22cB…8f0A',
    image: '/products/fcc_series3_vault_1774149135581.png',
    traits: ['Limit-bound', 'Quorum-gated'],
    status: 'Active'
  },
  {
    id: 'CRD-AUD-0029',
    type: 'Auditor Attestation',
    rarity: 'Uncommon',
    power: 1540,
    owner: '0x88fC…4b9B',
    image: '/products/fcc_series3_chain_1774149083861.png',
    traits: ['Read-only', 'Time-boxed'],
    status: 'Idle'
  },
  {
    id: 'CRD-REC-A1',
    type: 'Recovery Council Share',
    rarity: 'Epic',
    power: 7800,
    owner: '0x1A4f…7c22',
    image: '/products/fcc_series3_kyc_1774149108992.png',
    traits: ['MPC share', 'Council-only', 'Escalation-bound'],
    status: 'Active'
  }
];

export interface EcosystemApp {
  name: string;
  category: string;
  description: string;
  signal: string;
  icon: string;
}

const MOCK_APPS: EcosystemApp[] = [
  { name: 'Aether Settlement', category: 'Payments', description: 'Institutional settlement and disbursement workflow for verified operator roles.', signal: 'Pilot ready', icon: 'bg-indigo-500' },
  { name: 'Nova Services', category: 'Public Services', description: 'Digital service workflow for residents, program operators, and partner institutions.', signal: '12K sample users', icon: 'bg-blue-600' },
  { name: 'Civic Registry', category: 'Records', description: 'Registry surface for credentials, service status, and institutional evidence files.', signal: 'Credential schema mapped', icon: 'bg-purple-500' },
  { name: 'Interoperability Gateway', category: 'Interoperability', description: 'Controlled message and settlement references for approved external systems.', signal: 'Review required', icon: 'bg-teal-400' },
  { name: 'Treasury Controls', category: 'Controls', description: 'Policy gates for payouts, approvals, reporting checkpoints, and custody limits.', signal: 'Sample controls', icon: 'bg-pink-500' },
  { name: 'Chronos Governance', category: 'Governance', description: 'Committee approvals, reserve workflows, and policy management controls.', signal: 'Approval matrix', icon: 'bg-rose-500' }
];

export interface CoreProduct {
  name: string;
  description: string;
  image: string;
}

const MOCK_CORE_PRODUCTS: CoreProduct[] = [
  { name: 'Future Citizen Chain Node', description: 'A reviewable ledger surface for identity, settlement, and governance events.', image: '/products/fcc_series3_chain_1774149083861.png' },
  { name: 'Future Citizen ID Crystal', description: 'Verifiable digital identity artifact for controlled enrollment and access.', image: '/products/fcc_series3_id_1774149095822.png' },
  { name: 'FC Chain KYC Firewall', description: 'Compliance control surface protecting sensitive identity and policy data.', image: '/products/fcc_series3_kyc_1774149108992.png' },
  { name: 'Future Citizen Nano Storage', description: 'Minimalist matte black NFC cold storage drive.', image: '/products/fcc_series3_wallet_1774149120347.png' },
  { name: 'Future Citizen Protocol Vault', description: 'Secure custody and recovery interface for institutional wallet operations.', image: '/products/fcc_series3_vault_1774149135581.png' },
  { name: 'Future Citizen Premium Pay', description: 'Programmable payment card surface for verified services and payouts.', image: '/products/fcc_series3_pay_1774149150764.png' },
  { name: 'FC Stablecoin', description: 'Cash-backed settlement instrument for programmable treasury workflows.', image: '/products/fcc_series3_stable_1774149166041.png' },
  { name: 'Future Citizen Digital Access', description: 'Digital access key for resident, operator, and partner service flows.', image: '/products/fcc_series3_resident_1774149181409.png' }
];

export interface ValidatorData {
  name: string;
  weight: string;
  assurance: string;
  uptime: string;
  fee: string;
}

const MOCK_VALIDATORS: ValidatorData[] = [
  { name: 'Region-1 Settlement Node', weight: '18.4%', assurance: 'A+', uptime: '100%', fee: '0%' },
  { name: 'Region-2 Settlement Node', weight: '12.1%', assurance: 'A', uptime: '99.9%', fee: '2%' },
  { name: 'Region-3 Settlement Node', weight: '9.8%', assurance: 'A', uptime: '99.9%', fee: '1%' },
  { name: 'Reserve Validator', weight: '7.2%', assurance: 'B+', uptime: '99.8%', fee: '4%' }
];

export interface IdentityStat {
  title: string;
  val: string;
  sub: string;
}

// 8 institutional sample stats. The first 6 mirror the Dashboard KPI tile
// vocabulary 1:1 so the Identity sidebar reads as the same operating story.
// The last 2 are institutional extensions that complete the issuance picture.
const MOCK_IDENTITY_STATS: IdentityStat[] = [
  { title: 'CREDENTIALS ISSUED · 30D', val: '1,492', sub: '+12% week-on-week' },
  { title: 'APPROVALS PENDING', val: '47', sub: '6 high-risk · 41 standard' },
  { title: 'POLICY FLAGS · 7D', val: '3', sub: '1 active · 2 resolved this week' },
  { title: 'RECOVERY CASES', val: '5', sub: '2 open · 3 closed · avg 18h' },
  { title: 'AUDIT EVENTS · 24H', val: '14,902', sub: 'integrity ✓ · 0 missing' },
  { title: 'SERVICE SLA · 30D', val: '99.6%', sub: 'issuance · recovery · escalation' },
  { title: 'ACTIVE ISSUERS', val: '12', sub: '11 civic offices + 1 recovery council' },
  { title: 'REVOKED CREDENTIALS · 30D', val: '8', sub: 'all reasons documented' }
];

export interface ActivityLog {
  action: string;
  amount: string;
  target: string;
  time: string;
  color: string;
}

// 8 recent operating events that read as the activity stream behind the
// 8 stats above. Vocabulary is locked to issuance / approval / policy /
// recovery / audit — same surface the Dashboard tiles describe.
const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { action: 'Credential issued', amount: '', target: 'Resident · Tier 2 → 0x83a9…d214', time: '2 mins ago', color: 'text-cyan-300' },
  { action: 'Approval granted', amount: '', target: 'APR-0481 · Treasury settlement', time: '14 mins ago', color: 'text-cyan-300' },
  { action: 'Policy flag raised', amount: '', target: 'Treasury · single-actor approval', time: '47 mins ago', color: 'text-fc-gold' },
  { action: 'Recovery case opened', amount: '', target: 'Custodian · Holder 0x6e90…2bd1', time: '2 hours ago', color: 'text-fc-gold' },
  { action: 'Credential revoked', amount: '', target: 'Operator · APR-0479 review outcome', time: '4 hours ago', color: 'text-white' },
  { action: 'Audit export sealed', amount: '', target: '24h sweep · integrity ✓', time: '8 hours ago', color: 'text-cyan-300' },
  { action: 'Approval queue cleared', amount: '', target: '12 routed · 0 escalated', time: '14 hours ago', color: 'text-cyan-300' },
  { action: 'Issuer key rotation', amount: '', target: 'Civic Office #12 · scheduled rotation', time: '1 day ago', color: 'text-white' }
];

export interface ProposalData {
  id: string;
  title: string;
  status: string;
  endsIn: string;
  yesPct: number;
  noPct: number;
  abstainPct: number;
}

export interface SystemNode {
  name: string;
  status: 'OPERATIONAL' | 'SECURE' | 'ELEVATED' | 'OFFLINE';
  ping: string;
}

const MOCK_PROPOSALS: ProposalData[] = [
  {
    id: 'FCP-315',
    title: 'Enhance Network Scalability (Layer 2 Integration)',
    status: 'Voting Active',
    endsIn: '2D 5H 12M',
    yesPct: 68,
    noPct: 12,
    abstainPct: 20
  }
];

const MOCK_SYSTEM_NODES: SystemNode[] = [
  { name: 'RPC NODES', status: 'OPERATIONAL', ping: '12ms' },
  { name: 'CONSENSUS', status: 'SECURE', ping: '8ms' },
  { name: 'SETTLEMENT RAIL', status: 'OPERATIONAL', ping: '15ms' },
  { name: 'INTEROP RELAY', status: 'ELEVATED', ping: '45ms' },
  { name: 'POLICY DATA', status: 'OPERATIONAL', ping: '22ms' },
  { name: 'CREDENTIAL ISSUANCE', status: 'SECURE', ping: '18ms' }
];

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * PREVIEW DATA — sample, not live.
 *
 * All data returned from this service is hardcoded sample content used for
 * UI scaffolding on community surfaces and the Sample-labeled rows of the
 * institutional Identity Vault / Dashboard / Sentinel / Tokenomics surfaces.
 * It must never be presented to a reviewer as production telemetry without
 * an explicit Sample / PREVIEW label adjacent to the rendered value.
 *
 * Each method returns data after a small artificial delay to simulate the
 * shape of an async fetch.  This is deliberate: it forces consumers to handle
 * loading states the same way they will when a real backend replaces it.
 */
export const previewDataService = {
  getArtifacts: async (): Promise<ArtifactData[]> => {
    await delay(800);
    return MOCK_ARTIFACTS;
  },

  getEcosystemApps: async (): Promise<EcosystemApp[]> => {
    await delay(600);
    return MOCK_APPS;
  },

  getCoreProducts: async (): Promise<CoreProduct[]> => {
    await delay(500);
    return MOCK_CORE_PRODUCTS;
  },

  getValidators: async (): Promise<ValidatorData[]> => {
    await delay(700);
    return MOCK_VALIDATORS;
  },

  getIdentityStats: async (): Promise<IdentityStat[]> => {
    await delay(500);
    return MOCK_IDENTITY_STATS;
  },

  getActivityLogs: async (): Promise<ActivityLog[]> => {
    await delay(600);
    return MOCK_ACTIVITY_LOGS;
  },

  getActiveProposals: async (): Promise<ProposalData[]> => {
    await delay(500);
    return MOCK_PROPOSALS;
  },

  getSystemNodes: async (): Promise<SystemNode[]> => {
    await delay(450);
    return MOCK_SYSTEM_NODES;
  }
};
