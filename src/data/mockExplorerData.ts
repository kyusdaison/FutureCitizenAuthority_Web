export interface Block {
  height: number;
  hash: string;
  miner: string;
  txCount: number;
  gasUsed: string;
  timeDelay: number; // Seconds ago
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  fee: string;
  timeDelay: number;
}

// Cryptographic hash generator
const generateHash = (prefix: string = '0x', length: number = 64): string => {
  const chars = '0123456789abcdef';
  let hash = prefix;
  for (let i = 0; i < length; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// FC Wallet Address generator
const generateAddress = (): string => {
  return generateHash('0xFC', 40);
};

// Random Validator Names
const validators = ['Nexus Node', 'Gamma Shield', 'Delta Force', 'Epsilon Prime', 'Validator Alpha', 'Chronos Forge', 'Aether Gateway', 'Silica Protocol'];

export const generateInitialBlocks = (count: number = 10, currentHeight: number = 18459200): Block[] => {
  return Array.from({ length: count }).map((_, i) => ({
    height: currentHeight - i,
    hash: generateHash(),
    miner: validators[Math.floor(Math.random() * validators.length)],
    txCount: Math.floor(Math.random() * 250) + 12, // 12 to 262 txs
    gasUsed: (Math.random() * 15 + 1).toFixed(2) + 'M',
    timeDelay: i * 2, // 2 second block times roughly
  }));
};

export const generateInitialTransactions = (count: number = 10): Transaction[] => {
  return Array.from({ length: count }).map((_, i) => ({
    hash: generateHash(),
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 5000).toFixed(4),
    fee: (Math.random() * 0.05).toFixed(6),
    timeDelay: i * 1, // rapid txs
  }));
};
