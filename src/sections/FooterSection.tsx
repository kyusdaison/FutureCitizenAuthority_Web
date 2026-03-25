import { MagneticButton } from '../components/MagneticButton';

export const FooterSection = () => {
  return (
    <section className="py-24 px-6 bg-[#010204] border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-fc-gold/5 object-cover pointer-events-none"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-8xl font-serif font-light tracking-tight mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Ascend to<br/><span className="italic drop-shadow-none text-gray-500 font-serif">Sovereignty.</span>
        </h2>
        <MagneticButton className="mt-4">
          <button className="relative p-[1px] bg-white/15 hover:bg-fc-gold transition-colors overflow-hidden group w-full h-full block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fc-gold to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out pointer-events-none"></div>
            <div className="relative bg-[#010204] px-16 py-6 flex items-center justify-center border border-white/5 w-full h-full">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-fc-gold/50 group-hover:border-fc-gold transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-fc-gold/50 group-hover:border-fc-gold transition-colors"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-fc-gold group-hover:text-white transition-colors z-10 drop-shadow-md">Read the Whitepaper</span>
            </div>
          </button>
        </MagneticButton>
        <div className="mt-40 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-bold tracking-[0.4em] uppercase w-full">
          <span>© {new Date().getFullYear()} Future Citizen Authority</span>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">X Corp</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Discord</a>
            <a href="#" className="hover:text-white transition-colors duration-300">GitHub Source</a>
          </div>
        </div>
      </div>
    </section>
  );
};
