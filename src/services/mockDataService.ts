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
    id: 'FC-ID-8842',
    type: 'Identity Nexus',
    rarity: 'Legendary',
    power: 9940,
    owner: '0x49fA...bD21',
    image: 'https://images.unsplash.com/photo-1542644485-cbd46ec6fd56?q=80&w=600&auto=format&fit=crop',
    traits: ['Cybernetic', 'Quantum Sync', 'Neural Link'],
    status: 'Active'
  },
  {
    id: 'MECH-X-99',
    type: 'Exosuit Construct',
    rarity: 'Rare',
    power: 4200,
    owner: '0x22cB...8f0A',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=600&auto=format&fit=crop',
    traits: ['Heavy Armor', 'Plasma Core'],
    status: 'Staked'
  },
  {
    id: 'NANO-DRONE-V2',
    type: 'Surveillance Unit',
    rarity: 'Uncommon',
    power: 1540,
    owner: '0x88fC...4b9B',
    image: 'https://images.unsplash.com/photo-1473663678007-9b2658fc5ec7?q=80&w=600&auto=format&fit=crop',
    traits: ['Stealth Tech', 'AI Optics'],
    status: 'Idle'
  },
  {
    id: 'QUANTUM-KEY-A1',
    type: 'Access Protocol',
    rarity: 'Epic',
    power: 7800,
    owner: '0x1A4f...7c22',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
    traits: ['Decryption', 'Root Access', 'Vault Bypass'],
    status: 'Active'
  }
];

export interface EcosystemApp {
  name: string;
  category: string;
  description: string;
  tvl: string;
  icon: string;
}

const MOCK_APPS: EcosystemApp[] = [
  { name: 'Aether Finance', category: 'DeFi', description: 'Premier DEX & Lending protocol on Future Citizen Chain. Deep liquidity for FCC.', tvl: '$245M', icon: 'bg-indigo-500' },
  { name: 'Nova Realms', category: 'Gaming', description: 'Fully on-chain MMORPG. Conquer sectors and build your empire in Web3.', tvl: '12K Users', icon: 'bg-blue-600' },
  { name: 'Galactic Market', category: 'NFTs', description: 'The official marketplace for Citizen Identity NFTs, digital land, and rare artifacts.', tvl: '$89M Vol', icon: 'bg-purple-500' },
  { name: 'Nexus Bridge', category: 'Bridges', description: 'Fast, secure cross-chain bridging between Ethereum, Solana, and FCC.', tvl: '$512M', icon: 'bg-teal-400' },
  { name: 'Prism Swap', category: 'DeFi', description: 'Aggregated AMM offering the best execution prices across all FCC liquidity pools.', tvl: '$120M', icon: 'bg-pink-500' },
  { name: 'Chronos DAO', category: 'DAO', description: 'Decentralized reserve currency and treasury management protocol.', tvl: '$56M', icon: 'bg-rose-500' }
];

export interface CoreProduct {
  name: string;
  description: string;
  image: string;
}

const MOCK_CORE_PRODUCTS: CoreProduct[] = [
  { name: 'Future Citizen Chain Node', description: 'The Sovereign Ledger of Identity and Trust.', image: '/products/fcc_series3_chain_1774149083861.png' },
  { name: 'Future Citizen ID Crystal', description: 'Biometric Digital Identity encased in dark frosted crystal.', image: '/products/fcc_series3_id_1774149095822.png' },
  { name: 'FC Chain KYC Firewall', description: 'Sleek, monolithic compliance shield protecting sovereign data.', image: '/products/fcc_series3_kyc_1774149108992.png' },
  { name: 'Future Citizen Nano Storage', description: 'Minimalist matte black NFC cold storage drive.', image: '/products/fcc_series3_wallet_1774149120347.png' },
  { name: 'Future Citizen Protocol Vault', description: 'Hyper-secure crystalline locking mechanism.', image: '/products/fcc_series3_vault_1774149135581.png' },
  { name: 'Future Citizen Premium Pay', description: 'Striking premium metal credit card on dark silk.', image: '/products/fcc_series3_pay_1774149150764.png' },
  { name: 'FC Stablecoin', description: 'Magnetic obsidian pedestal balancing gold algorithmic value.', image: '/products/fcc_series3_stable_1774149166041.png' },
  { name: 'Future Citizen Digital Access', description: 'Luxurious holographic smart-city key hovering above the grid.', image: '/products/fcc_series3_resident_1774149181409.png' }
];

export interface ValidatorData {
  name: string;
  weight: string;
  apy: string;
  uptime: string;
  fee: string;
}

const MOCK_VALIDATORS: ValidatorData[] = [
  { name: 'FC Core Alpha', weight: '18.4%', apy: '14.2%', uptime: '100%', fee: '0%' },
  { name: 'Nexus Subnet', weight: '12.1%', apy: '13.8%', uptime: '99.9%', fee: '2%' },
  { name: 'Vanguard Node 01', weight: '9.8%', apy: '14.0%', uptime: '99.9%', fee: '1%' },
  { name: 'Quantum Validator', weight: '7.2%', apy: '13.5%', uptime: '99.8%', fee: '4%' }
];

export interface IdentityStat {
  title: string;
  val: string;
  sub: string;
}

const MOCK_IDENTITY_STATS: IdentityStat[] = [
  { title: 'ON-CHAIN TXs', val: '1,492', sub: '+12% this week' },
  { title: 'STAKED VOLUME', val: '45,290 FCC', sub: 'Yielding 14.2% APY' },
  { title: 'MINTED ARTIFACTS', val: '8 / 12', sub: 'Matrix Level 2' },
  { title: 'GOVERNANCE POWER', val: '9.4 vPWR', sub: 'Active Voter' }
];

export interface ActivityLog {
  action: string;
  amount: string;
  target: string;
  time: string;
  color: string;
}

const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { action: 'STAKED', amount: '+500 FCC', target: 'Vanguard Node #009', time: '2 mins ago', color: 'text-yellow-400' },
  { action: 'MINTED', amount: 'Artifact', target: 'Neon Genesis Badge', time: '4 hours ago', color: 'text-purple-400' },
  { action: 'SWAPPED', amount: '120 USDC', target: '-> 45.2 FCC', time: '12 hours ago', color: 'text-cyan-400' },
  { action: 'VOTED', amount: 'Prop-84', target: 'Matrix Parameter Update', time: '1 day ago', color: 'text-white' },
  { action: 'BRIDGED', amount: '2.5 ETH', target: 'Origin -> FC Chain Vanguard', time: '2 days ago', color: 'text-blue-400' }
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
  { name: 'VANGUARD DEX', status: 'OPERATIONAL', ping: '15ms' },
  { name: 'BRIDGE RELAY', status: 'ELEVATED', ping: '45ms' },
  { name: 'ORACLE AI', status: 'OPERATIONAL', ping: '22ms' },
  { name: 'ARTIFACT MINT', status: 'SECURE', ping: '18ms' },
];

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDataService = {
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
