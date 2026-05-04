import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '../components/CosmicBackground';
import { HologramModal } from '../components/HologramModal';
import { mockDataService, type EcosystemApp, type CoreProduct } from '../services/mockDataService';
import { useSoundEffects } from '../hooks/useSoundEffects';



const Ecosystem = () => {
  const [apps, setApps] = useState<EcosystemApp[]>([]);
  const [coreProducts, setCoreProducts] = useState<CoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<EcosystemApp | null>(null);
  const { playSuccess, playHover } = useSoundEffects();

  useEffect(() => {
    const fetchEcosystemData = async () => {
      try {
        const [fetchedApps, fetchedProducts] = await Promise.all([
          mockDataService.getEcosystemApps(),
          mockDataService.getCoreProducts()
        ]);
        setApps(fetchedApps);
        setCoreProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch ecosystem data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEcosystemData();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-16 relative z-10 max-w-7xl mx-auto w-full pb-20 flex justify-center items-center min-h-[60vh]">
        <CosmicBackground />
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-cyan-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span className="text-slate-400 font-mono text-sm tracking-widest">LOADING ECOSYSTEM...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-6 relative z-10 max-w-7xl mx-auto w-full pb-20">
      <CosmicBackground />

      {/* Series III Core Infrastructure */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-24 pt-8"
      >
        <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[10px] pointer-events-none -z-10"></div>
            <h1 className="text-4xl md:text-6xl text-vanguard mb-4 text-white uppercase tracking-widest font-bold">Future Citizen Authority Core Infrastructure</h1>
            <p className="text-cyan-500 text-telemetry text-[10px] md:text-xs mb-4 font-bold tracking-widest uppercase">Institutional Product Surfaces</p>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-medium">Identity, custody, compliance, and settlement components designed for reviewable digital governance deployments.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {coreProducts.map((product, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                    <div className="agency-panel overflow-hidden cursor-pointer h-full flex flex-col border border-white/5 hover:border-white/20 transition-colors">
                        <div className="relative overflow-hidden w-full pt-[100%] bg-black/40">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="absolute top-0 left-0 w-full h-full object-contain p-4 transform group-hover:scale-[1.08] transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow relative z-10 bg-black border-t border-white/5 group-hover:bg-slate-900/50 transition-colors">
                            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-widest text-vanguard text-white mb-2 group-hover:text-cyan-500 transition-colors">{product.name}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">{product.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Integration Directory */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="pt-10 border-t border-white/10 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
	            <h2 className="text-3xl md:text-4xl text-vanguard text-white mb-2 uppercase tracking-widest font-bold">Integration Directory</h2>
	            <p className="text-slate-400 text-sm font-medium">Discover payment, asset, identity, governance, and developer integrations built on Future Citizen Chain.</p>
          </div>
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
	              placeholder="Search integrations..." 
              className="w-full input-neon pl-10 bg-black/40 border-white/10 focus:border-cyan-500/50 font-mono text-sm"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-4 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
	          {['All', 'Payments', 'Assets', 'Identity', 'Bridges', 'Governance', 'Tools'].map((tag, i) => (
            <button key={tag} className={`px-5 py-2  text-xs font-bold transition-colors whitespace-nowrap border uppercase tracking-widest ${i === 0 ? 'bg-white text-black border-white' : 'bg-black/40 text-slate-300 hover:bg-white/10 hover:text-white border-white/10'}`}>
              {tag}
            </button>
          ))}
        </div>

        {/* DApps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1 }}
              onMouseEnter={() => playHover()}
              className="agency-panel p-6 flex flex-col group cursor-pointer relative overflow-hidden"
            >
               {/* Glow effect on hover */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-md -mr-16 -mt-16 transition-all group-hover:bg-cyan-500/10"></div>
               
               <div className="flex justify-between items-start mb-5 relative z-10">
                 <div className={`w-12 h-12  flex items-center justify-center ${app.icon} bg-opacity-20 border border-white/10 group-hover:border-cyan-500/30 transition-colors`}>
                    {/* Placeholder App Icon */}
                    <div className={`w-6 h-6  ${app.icon} grayscale group-hover:grayscale-0`}></div>
                 </div>
                 <span className="text-telemetry font-bold tracking-widest uppercase text-[9px] text-cyan-500/80 bg-cyan-500/10 px-2.5 py-1 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                   {app.category}
                 </span>
               </div>

               <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2 relative z-10 group-hover:text-cyan-400 transition-colors">{app.name}</h3>
               <p className="text-sm text-slate-400 mb-6 flex-1 relative z-10 line-clamp-2 leading-relaxed">{app.description}</p>
               
               <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4 relative z-10 group-hover:border-cyan-500/20 transition-colors">
                  <div>
	                     <div className="text-[9px] text-slate-500 uppercase tracking-[0.2em] mb-1 font-bold">Operational Signal</div>
                     <div className="text-sm font-mono text-white font-medium">{app.tvl}</div>
                  </div>
                  <button onClick={() => { setSelectedApp(app); playSuccess(); }} className="text-cyan-500 text-xs font-bold hover:text-black hover:bg-cyan-500 border border-cyan-500/50 px-5 py-2 uppercase tracking-widest transition-colors">
	                    Review
                  </button>
               </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
	           <button className="btn-vercel-outline px-8">Load More Integrations</button>
        </div>
      </motion.div>

      {/* Futuristic Extracted App Hologram Modal */}
      <HologramModal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={selectedApp?.name || ''}
        theme="blue"
        data={{
          Category: selectedApp?.category,
          Description: selectedApp?.description,
          TotalValueLocked: selectedApp?.tvl,
	          SecurityAudit: 'Verified by Security Operations',
          DeploymentBlock: Math.floor(Math.random() * 5000000 + 10000000),
          ContractAddress: `0xFC${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
        }}
      />
    </div>
  );
}

export default Ecosystem;
