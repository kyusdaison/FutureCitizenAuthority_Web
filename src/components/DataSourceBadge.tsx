type DataSourceKind = 'live' | 'sample' | 'representative' | 'mixed' | 'disabled';

const sourceStyles: Record<DataSourceKind, string> = {
  live: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200',
  sample: 'border-slate-400/25 bg-white/[0.035] text-slate-300',
  representative: 'border-fc-gold/35 bg-fc-gold/[0.08] text-fc-gold',
  mixed: 'border-cyan-300/25 bg-cyan-300/[0.06] text-cyan-200',
  disabled: 'border-slate-500/20 bg-slate-500/[0.05] text-slate-400',
};

const sourceLabels: Record<DataSourceKind, string> = {
  live: 'Live source',
  sample: 'Sample source',
  representative: 'Representative source',
  mixed: 'Mixed source',
  disabled: 'Action disabled',
};

interface DataSourceBadgeProps {
  kind: DataSourceKind;
  label?: string;
  pulse?: boolean;
  className?: string;
}

export const DataSourceBadge = ({ kind, label, pulse = false, className = '' }: DataSourceBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.22em] ${sourceStyles[kind]} ${className}`}
    >
      {pulse && <span className="h-1 w-1 rounded-full bg-current animate-pulse" aria-hidden />}
      {label ?? sourceLabels[kind]}
    </span>
  );
};
