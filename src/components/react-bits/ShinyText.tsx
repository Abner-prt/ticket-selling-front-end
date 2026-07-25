import { motion } from 'framer-motion';

export function ShinyText({ text, disabled = false, speed = 3, className = '' }: { text: string, disabled?: boolean, speed?: number, className?: string }) {

  return (
    <div
      className={`relative inline-block overflow-hidden ${className}`}
      style={
        {
          '--shiny-color': 'rgba(255, 255, 255, 0.8)',
          '--shiny-bg-color': 'rgba(255, 255, 255, 0.2)',
        } as React.CSSProperties
      }
    >
      <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 font-bold">
        {text}
      </div>
      
      {!disabled && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: "linear",
          }}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            width: '50%',
            transform: 'skewX(-20deg)',
          }}
        />
      )}
    </div>
  );
}
