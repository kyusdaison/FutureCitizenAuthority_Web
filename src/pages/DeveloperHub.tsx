import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalLog } from '../components/TerminalLog';
import { useWallet } from '../contexts/WalletContext';

const MOCK_CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@futurecitizen/contracts/token/FCC20.sol";
import "@futurecitizen/contracts/access/Ownable.sol";

contract GlobalIdentityToken is FCC20, Ownable {
    constructor() FCC20("Global Identity", "GID", 18) {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    function mintIdentity(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    // FCA verification routine
    function verifyCitizen(address account) external view returns (bool) {
        return balanceOf(account) > 0;
    }
}
`;

const getDeploymentSequence = (identity: string, balance: number) => [
  "> fca-cli compile --network mainnet",
  "[INFO] Compiling 2 contract files...",
  "[INFO] Optimizing Bytecode (Runs: 200)",
  "Compiling @futurecitizen/contracts/token/FCC20.sol",
  "Compiling GlobalIdentityToken.sol",
  "[SUCCESS] Compilation successful. Output artifacts saved.",
  "> fca-cli deploy GlobalIdentityToken --network mainnet",
  "[INFO] Initializing deployment review...",
  "[INFO] Connecting to FCA RPC Node (ws://rpc.fc-chain.network)...",
  "Connection established. Sync status: SYNCHRONIZED",
  `Account: ${identity.substring(0, 6)}...${identity.substring(identity.length - 4)}`,
  `Balance: ${balance.toFixed(2)} FCC`,
  "",
  "Deploying 'GlobalIdentityToken'",
  "---------------------------",
  `Transaction Hash: 0x${Math.random().toString(16).substring(2, 14)}...f9b1`,
  "Waiting for block inclusion...",
  `Block Confirmed: #${Math.floor(Math.random() * 100000 + 18400000).toLocaleString()}`,
  "Gas Used: 2,410,392 Gwei (Approx 150 FCC deducted)",
  "",
  `[SUCCESS] Deployed to: 0xFC${Math.random().toString(16).substring(2, 10).toUpperCase()}...4bC9`,
  "Contract Verification initialized via FC-Trace...",
  "[SUCCESS] Source code verified.",
  "> Deployment Sequence Completed in 2.41s."
];

const DeveloperHub = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState('GlobalIdentityToken.sol');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { gainXP, connectedIdentity, balances, updateBalances } = useWallet();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDeploy = () => {
    if (isDeploying) return;
    
    if (!connectedIdentity) {
      setLogs(prev => [...prev, '> fca-cli deploy GlobalIdentityToken --network mainnet', '[ERROR] Verified FC-ID credential required. Identity missing.']);
      return;
    }
    
    if (balances.fcc < 150) {
      setLogs(prev => [...prev, '> fca-cli deploy GlobalIdentityToken --network mainnet', `[ERROR] Insufficient computation credits. Required: 150 FCC. Available: ${balances.fcc.toFixed(2)} FCC.`]);
      return;
    }

    setIsDeploying(true);
    setLogs([]);
    
    // Deduct exact cost
    updateBalances({ fcc: balances.fcc - 150 });
    
    const sequence = getDeploymentSequence(connectedIdentity, balances.fcc);
    let currentStep = 0;
    
    const pushNextLog = () => {
      if (currentStep < sequence.length) {
        setLogs(prev => [...prev, sequence[currentStep]]);
        currentStep++;
        
        // Randomize typing/execution speed slightly for realism
        const delay = Math.random() * 300 + 100; // 100-400ms
        timerRef.current = setTimeout(pushNextLog, delay);
      } else {
        setIsDeploying(false);
        gainXP(100); // XP for deploying
      }
    };

    // Initial delay
    timerRef.current = setTimeout(pushNextLog, 200);
  };

  const handleCommand = (cmd: string) => {
    setLogs(prev => [...prev, `> ${cmd}`]);
    
    const command = cmd.trim().toLowerCase();
    
    if (command === 'clear') {
      setLogs([]);
    } else if (command === 'help') {
      setLogs(prev => [...prev, '[INFO] Available Commands:', '  fca-cli compile', '  fca-cli deploy', '  clear', '  help']);
    } else if (command.startsWith('fca-cli compile')) {
      // Simulate quick compile
      setTimeout(() => {
        setLogs(prev => [...prev, "[INFO] Compiling 2 contract files...", "Compiling GlobalIdentityToken.sol", "[SUCCESS] Compilation successful."]);
        if (connectedIdentity) gainXP(100);
      }, 500);
    } else if (command.startsWith('fca-cli deploy')) {
      handleDeploy();
    } else {
      setTimeout(() => {
        setLogs(prev => [...prev, `[ERROR] Command not recognized: ${cmd}. Type 'help' for available commands.`]);
      }, 300);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-7xl mx-auto w-full pb-20">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10 flex justify-between items-end"
      >
        <div>
	          <h1 className="text-4xl font-mono font-bold uppercase text-white mb-2 tracking-wider">Developer Portal</h1>
	          <p className="font-mono text-slate-400">Compile, test, and deploy identity-aware logic to the FC Engine.</p>
        </div>
        <div className="hidden lg:flex gap-4">
           <div className="px-4 py-2 border border-cyan-500/20 bg-cyan-500/10 flex items-center gap-2">
             <div className="w-2 h-2 bg-cyan-500 animate-[pulse_2s_infinite]"></div>
             <span className="text-xs text-cyan-400 font-mono font-bold tracking-widest">RPC ONLINE</span>
           </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[70vh] min-h-[600px]">
        
        {/* Mock IDE / Code Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="agency-panel border-white/10 overflow-hidden flex flex-col relative group"
        >
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
          
          {/* IDE Tabs */}
          <div className="flex border-b border-white/10 bg-black/40 z-10">
             {['GlobalIdentityToken.sol', 'DeployScript.js'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-3 text-xs font-mono font-bold transition-colors border-r border-white/10 ${activeTab === tab ? 'bg-white/5 text-cyan-400 border-b-2 border-b-cyan-400' : 'text-slate-500 hover:bg-white/[0.02] hover:text-white'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          {/* IDE Line Numbers and Code */}
          <div className="flex flex-1 overflow-hidden z-10 bg-black/60 relative">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900 via-black to-black pointer-events-none"></div>
             <div className="w-12 bg-black/40 border-r border-white/5 text-right pr-2 py-4 text-slate-600 font-mono text-xs hidden md:block select-none">
               {MOCK_CONTRACT_CODE.split('\n').map((_, i) => (
                 <div key={i}>{i + 1}</div>
               ))}
             </div>
             <div className="flex-1 p-4 font-mono text-sm leading-relaxed overflow-auto relative">
                <pre className="text-slate-300 relative z-10">
                  <code className="language-solidity">
                    {MOCK_CONTRACT_CODE.split('\n').map((line, i) => {
                       // Very simple syntax highlighting for aesthetics
                       if (line.includes('//')) return <div key={i} className="text-slate-600">{line}</div>;
                       if (line.startsWith('pragma ') || line.startsWith('import ')) return <div key={i} className="text-cyan-400/80">{line}</div>;
                       if (line.includes('contract ') || line.includes('function ')) {
                          const parts = line.split(/(contract|function)/);
                          return (
                            <div key={i}>
                               {parts.map((p, idx) => (
                                 p === 'contract' || p === 'function' ? <span key={idx} className="text-cyan-400 font-bold">{p}</span> : <span key={idx} className="text-white">{p}</span>
                               ))}
                            </div>
                          );
                       }
                       return <div key={i} className="text-slate-300">{line}</div>;
                    })}
                  </code>
                </pre>
             </div>
          </div>
          
          {/* IDE Action Bar */}
          <div className="p-4 border-t border-white/10 bg-black/80 flex justify-between items-center z-10">
             <div className="text-xs text-telemetry text-slate-500">
                Compiler: solc v0.8.20+commit
             </div>
             <button 
               onClick={handleDeploy}
               disabled={isDeploying}
               className={`bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-500 px-8 py-2  font-mono font-bold text-xs tracking-widest transition-colors shadow-none ${isDeploying ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
	                {isDeploying ? 'DEPLOYING...' : 'VERIFY & DEPLOY'}
             </button>
          </div>
        </motion.div>

        {/* Console / Interaction Output */}
        <div className="flex flex-col h-full space-y-4">
           {/* Command Instructions */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: 0.3 }}
             className="agency-panel border-white/10 p-6 relative overflow-hidden group"
           >
	              <h3 className="text-sm font-mono font-bold text-white mb-2 uppercase tracking-widest">FCA CLI Instructions</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
	                Deploying directly to the FC Core Engine requires a validated <span className="text-cyan-500 font-bold">FC-ID</span> credential.
	                Transactions are inherently parallelized resulting in sub-second finality.
	                Gas fees are routed through the platform liquidity layer.
              </p>
           </motion.div>
           
           {/* Terminal Output */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: 0.4 }}
             className="flex-1 min-h-[400px]"
           >
             <TerminalLog 
               logs={logs} 
               isDeploying={isDeploying} 
               onCommand={handleCommand}
             />
           </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default DeveloperHub;
