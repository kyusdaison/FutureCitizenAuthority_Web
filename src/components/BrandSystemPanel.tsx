import {
  FCATextCrest,
  FCChainNetworkSeal,
  FCCTokenMark,
  FCCTokenMonochrome,
  FCCTokenNavyOnLight,
} from './BrandMarks';

const brandLayers = [
  {
    label: 'Authority',
    title: 'Future Citizen Authority',
    note: 'Official institution, governance, and trust context',
    mark: <FCATextCrest className="h-7 w-7" />,
  },
  {
    label: 'Network',
    title: 'FC Chain',
    note: 'Settlement network, validator layer, and explorer',
    mark: <FCChainNetworkSeal className="h-7 w-7" />,
  },
  {
    label: 'Native token',
    title: 'FCC',
    note: 'Gas, tokenomics, wallet, and exchange ticker',
    mark: <FCCTokenMark className="h-8 w-8" />,
  },
];

const tokenVariants = [
  {
    label: 'Navy on light',
    mark: <FCCTokenNavyOnLight className="h-14 w-14" />,
  },
  {
    label: 'Monochrome',
    mark: <FCCTokenMonochrome className="h-14 w-14" />,
  },
];

export const BrandSystemPanel = () => {
  return (
    <aside className="w-full max-w-md border border-white/10 bg-[#020617]/70 p-3 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/10 pb-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-slate-500">Brand usage</span>
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-fc-gold/70">
          FCA / FC Chain / FCC
        </span>
      </div>

      <div className="space-y-2">
        {brandLayers.map((layer) => (
          <div key={layer.title} className="flex items-center gap-3 border border-white/10 bg-white/[0.02] p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">{layer.mark}</div>
            <div className="min-w-0 text-left">
              <div className="mb-1 text-[8px] font-mono uppercase tracking-[0.18em] text-fc-gold/70">{layer.label}</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{layer.title}</div>
              <div className="mt-1 hidden text-[10px] leading-relaxed text-slate-500 2xl:block">{layer.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 border border-white/10 bg-white/[0.02] p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-fc-gold/70">FCC application marks</span>
          <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-slate-600">Wallet / UI</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {tokenVariants.map((variant) => (
            <div key={variant.label} className="flex flex-col items-center justify-center border border-white/10 bg-[#020617]/70 p-2">
              <div className="flex h-16 w-16 items-center justify-center">{variant.mark}</div>
              <span className="mt-2 text-center text-[8px] font-mono uppercase tracking-[0.16em] text-slate-500">{variant.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
