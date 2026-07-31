import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { EventCard } from '../components/events/EventCard';
import { motion } from 'framer-motion';

export function EventsCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  
  const categories = ['Todos', 'Concierto', 'Deportes', 'Teatro', 'Festival', 'Familiar'];

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-grow pt-10 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
      >
        <div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">Explorar Cartelera</h1>
          <p className="text-slate-400 text-xl font-medium">Filtra y encuentra tu próxima experiencia inolvidable.</p>
        </div>
        
        <div className="flex-shrink-0 w-full md:w-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-500 group-focus-within:text-fuchsia-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar por artista o lugar..."
              className="w-full md:w-[400px] pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 text-white placeholder-slate-500 text-lg font-medium transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Barra Lateral / Filtros */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-72 flex-shrink-0"
        >
          <div className="bg-[#0f0a1e]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sticky top-32 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 text-white font-bold border-b border-white/10 pb-6">
              <Filter className="w-6 h-6 text-fuchsia-400" />
              <span className="text-xl">Filtros</span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Categorías</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedCategory === category 
                        ? 'bg-fuchsia-500 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]' 
                        : 'border-white/20 group-hover:border-fuchsia-500/50 bg-black/50'
                    }`}>
                      {selectedCategory === category && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <span className={`text-lg font-medium transition-colors ${selectedCategory === category ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {category}
                    </span>
                    <input 
                      type="radio" 
                      name="category" 
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-colors flex items-center justify-center gap-3 font-bold border border-white/10 hover:border-white/20">
              <SlidersHorizontal className="w-5 h-5" />
              Más Filtros
            </button>
          </div>
        </motion.div>

        {/* Grilla de Resultados */}
        <div className="flex-grow">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex justify-between items-center"
          >
            <p className="text-slate-400 text-lg font-medium">
              Mostrando <span className="text-white font-bold px-2 py-1 bg-white/10 rounded-lg mx-1">{filteredEvents.length}</span> eventos
            </p>
          </motion.div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
             <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0f0a1e]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-16 text-center flex flex-col items-center justify-center shadow-2xl"
             >
              <div className="w-24 h-24 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Search className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No se encontraron eventos</h3>
              <p className="text-slate-400 text-lg max-w-md mx-auto mb-8 font-medium">
                No hay resultados para "<span className="text-white">{searchTerm}</span>" en la categoría seleccionada. Intenta cambiar los filtros.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="px-8 py-4 bg-white text-black font-black rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                Limpiar Filtros
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
