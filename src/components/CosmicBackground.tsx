export const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-3] pointer-events-none overflow-hidden">
      {/* Ambient Cosmic Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(202,138,4,0.08)_0%,transparent_40%),radial-gradient(circle_at_10%_80%,rgba(56,189,248,0.05)_0%,transparent_30%),radial-gradient(circle_at_90%_20%,rgba(234,179,8,0.04)_0%,transparent_40%)]" />
      
      {/* Star Dust Drift Layers */}
      <div className="stars-1 opacity-60" />
      <div className="stars-2 opacity-50" />
    </div>
  );
};
