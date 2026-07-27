import { motion } from 'framer-motion';
import { Link } from 'react-router';

export function Home() {
  return (
    <div className="flex-grow flex items-center justify-center p-8 pointer-events-none">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-[140px] font-black mb-6 leading-none tracking-tighter"
        >
          DISFRUTA EL <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 via-violet-600 to-blue-600">
            SENTIMIENTO
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto mb-14 tracking-tight"
        >
          Una experiencia inmersiva para descubrir y comprar tus próximos eventos favoritos.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="pointer-events-auto"
        >
          <Link to="/events/1" className="inline-block px-10 py-5 bg-white text-black font-black text-lg rounded-full transition-transform hover:scale-105 hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            EXPLORAR CATÁLOGO
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
