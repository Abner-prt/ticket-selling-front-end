import { motion } from 'framer-motion';
import { ArrowRight, Music, Trophy, Theater, Tent, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import { EventCard } from '../components/events/EventCard';
import { Magnet } from '../components/react-bits/Magnet';

const categories = [
  { name: 'Conciertos', icon: Music, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  { name: 'Deportes', icon: Trophy, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Teatro', icon: Theater, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { name: 'Festivales', icon: Tent, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Familiar', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export function Home() {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Sección Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center p-8 pointer-events-none relative z-10">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[140px] font-black mb-6 leading-none tracking-tighter"
          >
            SIENTE LA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-600">
              MÚSICA
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
            className="pointer-events-auto flex justify-center"
          >
            <Magnet padding={40}>
              <Link to="/events" className="px-10 py-5 bg-white text-black font-black text-lg rounded-full transition-all hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] block">
                EXPLORAR CATÁLOGO
              </Link>
            </Magnet>
          </motion.div>
        </div>
      </section>

      {/* Carrusel de Categorías */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={`/events?category=${category.name.toLowerCase()}`}
                    className="group flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full pr-8 pl-4 py-3 transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  >
                    <div className={`p-3 rounded-full ${category.bg} ${category.color} transition-transform group-hover:rotate-12`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-200 tracking-wide">{category.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Eventos Destacados */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">Eventos Destacados</h2>
            <p className="text-xl text-slate-400 font-medium">No te pierdas los espectáculos más esperados del año.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/events" className="group flex items-center gap-3 text-fuchsia-400 hover:text-fuchsia-300 font-bold text-lg transition-colors">
              Ver cartelera completa 
              <span className="p-2 rounded-full bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20 transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
