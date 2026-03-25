import { motion } from 'framer-motion';

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-telemetry text-yellow-500">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full mb-6 relative"
      >
        <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatType: "reverse" }}
        className="tracking-[0.3em] text-[10px] font-bold"
      >
        DECRYPTING SECTOR...
      </motion.div>
    </div>
  );
};
