import { ArrowRight, Gauge, Route, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';

export const FooterSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-[#010204] border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-fc-gold/5 object-cover pointer-events-none"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-8xl font-serif font-light tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Start With A<br/><span className="italic drop-shadow-none text-gray-500 font-serif">Reviewable Pilot.</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-base text-slate-400 leading-[1.8]">
          The fastest way to evaluate Future Citizen is to define one useful service path, inspect the identity and control model, then run a bounded pilot with measurable review criteria.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/review-room')}
              className="relative p-[1px] bg-white/15 hover:bg-fc-gold transition-colors overflow-hidden group w-full h-full block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fc-gold to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out pointer-events-none"></div>
              <div className="relative bg-[#010204] px-8 md:px-12 py-5 flex items-center justify-center gap-3 border border-white/5 w-full h-full">
                <ShieldCheck className="w-4 h-4 text-fc-gold group-hover:text-white transition-colors" />
	                <span className="text-xs font-bold uppercase text-fc-gold group-hover:text-white transition-colors z-10 drop-shadow-md">Open Review Room</span>
                <ArrowRight className="w-4 h-4 text-fc-gold group-hover:text-white transition-colors" />
              </div>
            </button>
          </MagneticButton>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-8 md:px-12 py-5 text-xs font-bold uppercase text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            <Gauge className="w-4 h-4 text-cyan-300" />
            Review Control Dashboard
          </button>
        </div>
        <MagneticButton className="mt-8">
          <button
            type="button"
            onClick={() => navigate('/#deployment')}
            className="relative p-[1px] bg-white/10 hover:bg-white/20 transition-colors overflow-hidden group w-full h-full block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fc-gold to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out pointer-events-none"></div>
            <div className="relative bg-[#010204] px-10 py-4 flex items-center justify-center border border-white/5 w-full h-full">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-fc-gold/50 group-hover:border-fc-gold transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-fc-gold/50 group-hover:border-fc-gold transition-colors"></div>
              <Route className="mr-3 w-4 h-4 text-fc-gold group-hover:text-white transition-colors" />
	              <span className="text-xs font-bold uppercase text-slate-300 group-hover:text-white transition-colors z-10 drop-shadow-md">Map Deployment Path</span>
            </div>
          </button>
        </MagneticButton>
        <div className="mt-40 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-bold tracking-[0.4em] uppercase w-full">
          <span>© {new Date().getFullYear()} Future Citizen Authority</span>
          <div className="flex gap-10 mt-6 md:mt-0">
            <button type="button" onClick={() => navigate('/identity')} className="hover:text-white transition-colors duration-300 uppercase">Identity</button>
            <button type="button" onClick={() => navigate('/review-room')} className="hover:text-white transition-colors duration-300 uppercase">Review Room</button>
            <button type="button" onClick={() => navigate('/#deployment')} className="hover:text-white transition-colors duration-300 uppercase">Deployment</button>
            <button type="button" onClick={() => navigate('/explorer')} className="hover:text-white transition-colors duration-300 uppercase">Explorer</button>
            <button type="button" onClick={() => navigate('/developer')} className="hover:text-white transition-colors duration-300 uppercase">Developers</button>
            <button type="button" onClick={() => navigate('/community')} className="hover:text-white transition-colors duration-300 uppercase">Community</button>
          </div>
        </div>
      </div>
    </section>
  );
};
