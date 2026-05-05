import { useMemo } from 'react';

interface IdentityAvatarProps {
  address: string | null;
  level: number;
}

const hashAddress = (address: string | null) => {
  if (!address) return 0;
  return address.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

export const IdentityAvatar = ({ address, level }: IdentityAvatarProps) => {
  const traits = useMemo(() => {
    const seed = hashAddress(address);
    const hue = seed % 360;
    const accent = level >= 3 ? '#c59a45' : `hsl(${hue} 78% 56%)`;
    const secondary = level >= 3 ? '#facc15' : `hsl(${(hue + 160) % 360} 74% 58%)`;
    const rotate = seed % 45;

    return { accent, secondary, rotate };
  }, [address, level]);

  if (!address) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/5 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 scanline-overlay opacity-30"></div>
        <div className="text-white/20 font-mono text-xs tracking-widest uppercase">Identity Undefined</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-pointer group overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 md:h-40 md:w-40"
          style={{ boxShadow: `0 0 40px ${traits.accent}33` }}
        >
          <div
            className="absolute inset-3 rounded-full border border-dashed opacity-70 animate-[spin_16s_linear_infinite]"
            style={{ borderColor: traits.accent }}
          />
          <div
            className="absolute inset-8 rounded-[35%] border opacity-80 animate-[spin_12s_linear_infinite_reverse]"
            style={{ borderColor: traits.secondary, transform: `rotate(${traits.rotate}deg)` }}
          />
          <div
            className="h-16 w-16 rounded-[32%] border bg-black/40 md:h-20 md:w-20"
            style={{
              borderColor: traits.accent,
              background: `radial-gradient(circle at 35% 30%, ${traits.secondary}44, transparent 48%), linear-gradient(135deg, ${traits.accent}33, rgba(2,6,23,0.9))`,
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 backdrop-blur-md border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-white/50 font-mono">Credential Signature</span>
        <span className="text-[10px] text-cyan-400 font-mono">Verified</span>
      </div>
    </div>
  );
};
