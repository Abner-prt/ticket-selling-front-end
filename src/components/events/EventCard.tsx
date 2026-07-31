import { Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const isSoldOut = event.availableTickets === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[#0f0a1e]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:border-fuchsia-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] flex flex-col h-full relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-blue-500/5 pointer-events-none" />
      
      <div className="relative h-56 overflow-hidden m-3 rounded-[24px]">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e] to-transparent opacity-80" />
        
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <Tag className="w-3 h-3 text-fuchsia-400" />
            {event.category}
          </span>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="px-6 py-2 bg-red-500 text-white font-black rounded-xl uppercase tracking-widest rotate-[-12deg] border border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.5)] text-lg">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col relative z-10">
        <h3 className="text-2xl font-black text-white mb-3 line-clamp-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-blue-400 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-3 mb-6 text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <Calendar className="w-4 h-4 text-fuchsia-400" />
            </div>
            <span>{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} • {new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-white/10 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Desde</span>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400">
              ${event.price.toFixed(2)}
            </p>
          </div>
          
          <Link 
            to={`/events/${event.id}`}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              isSoldOut 
                ? 'bg-white/5 text-slate-500 cursor-not-allowed pointer-events-none border border-white/5' 
                : 'bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
            }`}
          >
            {isSoldOut ? 'Sin Boletos' : 'Comprar'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
