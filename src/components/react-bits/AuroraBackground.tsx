import { motion } from 'framer-motion';

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen bg-slate-950 text-slate-50 transition-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -inset-[10px] opacity-50">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              backgroundImage: [
                "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{
              backgroundPosition: ["100% 0%", "0% 100%"],
              backgroundImage: [
                "radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.15) 0%, transparent 40%)",
                "radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 40%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 mix-blend-screen"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
