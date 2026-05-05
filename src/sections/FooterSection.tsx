import { ArrowRight, Download, Mail, Route, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';
import { pilotApplicationRoute, reviewPacketHref, trackConversionEvent } from '../lib/conversion';

export const FooterSection = () => {
  const navigate = useNavigate();
  const openReviewRoom = () => {
    trackConversionEvent('review_room_opened', 'homepage-footer');
    navigate('/review-room');
  };
  const startPilotRequest = () => {
    trackConversionEvent('pilot_request_started', 'homepage-footer');
    navigate(pilotApplicationRoute);
  };

  const downloadPacket = () => {
    trackConversionEvent('review_packet_downloaded', 'homepage-footer');
  };

  return (
    <section className="py-20 px-5 sm:py-24 sm:px-6 bg-[#010204] border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-fc-gold/5 object-cover pointer-events-none"></div>
      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        <h2 className="break-words text-3xl sm:text-5xl md:text-7xl xl:text-8xl font-serif font-light tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Start With A<br/><span className="italic drop-shadow-none text-gray-500 font-serif">Reviewable Pilot.</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-sm sm:text-base text-slate-400 leading-[1.8]">
          The fastest way to evaluate Future Citizen: pick one service path, inspect the identity and control model, then run a bounded pilot with measurable outcomes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton className="w-full sm:w-auto">
            <button
              type="button"
              onClick={openReviewRoom}
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
            onClick={startPilotRequest}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-8 md:px-12 py-5 text-xs font-bold uppercase text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            <Mail className="w-4 h-4 text-cyan-300" />
            Request A Pilot
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={reviewPacketHref}
            download
            onClick={downloadPacket}
            className="inline-flex w-full items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-8 py-4 text-xs font-bold uppercase text-slate-300 transition-colors hover:border-fc-gold/35 hover:text-white sm:w-auto"
          >
            <Download className="w-4 h-4 text-fc-gold" />
            Download Pilot Packet
          </a>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex w-full items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-8 py-4 text-xs font-bold uppercase text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white sm:w-auto"
          >
            Open Operating Dashboard
          </button>
        </div>
        <MagneticButton className="mt-6">
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
        <div className="mt-24 sm:mt-40 border-t border-white/10 pt-8 sm:pt-10 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center text-[10px] text-gray-500 font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase w-full">
          <span className="text-center md:text-left">© {new Date().getFullYear()} Future Citizen Authority</span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-8 md:gap-y-0">
            <button type="button" onClick={() => navigate('/identity')} className="hover:text-white transition-colors duration-300 uppercase">Identity</button>
            <button type="button" onClick={() => navigate('/review-room')} className="hover:text-white transition-colors duration-300 uppercase">Review Room</button>
            <button type="button" onClick={() => navigate('/#deployment')} className="hover:text-white transition-colors duration-300 uppercase">Deployment</button>
            <button type="button" onClick={() => navigate('/explorer')} className="hover:text-white transition-colors duration-300 uppercase">Evidence</button>
            <button type="button" onClick={() => navigate('/developer')} className="hover:text-white transition-colors duration-300 uppercase">Developers</button>
            <button type="button" onClick={() => navigate('/privacy')} className="hover:text-white transition-colors duration-300 uppercase">Privacy</button>
            <button type="button" onClick={() => navigate('/terms')} className="hover:text-white transition-colors duration-300 uppercase">Terms</button>
            <button type="button" onClick={() => navigate('/security')} className="hover:text-white transition-colors duration-300 uppercase">Security</button>
          </div>
        </div>
      </div>
    </section>
  );
};
