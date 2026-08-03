import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { EventDto, ResponseDto, PageDto } from '../types/api';
import { getEventImage } from '../utils/imageHelper';

export const EventsCatalog = () => {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get<ResponseDto<PageDto<EventDto>>>('/api/event?pageSize=50');
        if (response.data.status && response.data.data) {
          setEvents(response.data.data.items || []);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => cat === 'Todos' || (e.categoryName && e.categoryName.includes(cat)));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Encabezado */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explorar Eventos</h1>
          <p className="text-slate-400 text-lg">Encuentra los mejores conciertos, obras y conferencias cerca de ti.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Barra lateral filtros */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-24">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" /> Filtros
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Búsqueda</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-900"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Categorías</label>
                <div className="space-y-2">
                  {['Todos', 'Conciertos', 'Teatro', 'Deportes', 'Convenciones', 'E-Sports', 'Festivales', 'Cine', 'Familiares', 'Especiales'].map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat) || (cat === 'Todos' && selectedCategories.length === 0)}
                        onChange={(e) => {
                          if (cat === 'Todos') {
                            setSelectedCategories([]);
                          } else {
                            if (e.target.checked) {
                              setSelectedCategories(prev => [...prev.filter(c => c !== 'Todos'), cat]);
                            } else {
                              setSelectedCategories(prev => prev.filter(c => c !== cat));
                            }
                          }
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500" 
                      />
                      <span className="text-slate-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Grilla de resultados */}
        <main className="w-full md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Mostrando {filteredEvents.length} resultados
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={event.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="h-48 bg-slate-200 relative">
                    <img 
                      src={getEventImage(event.categoryId, event.id, event.title)} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-orange-600">
                      L. {event.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1">{event.title}</h3>
                    <div className="space-y-2 mb-4 flex-1">
                      <p className="flex items-center text-sm text-slate-500 gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="flex items-center text-sm text-slate-500 gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        {event.location}
                      </p>
                    </div>
                    <Link 
                      to={`/events/${event.id}`}
                      className="w-full text-center bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white font-semibold py-2.5 rounded transition-colors"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No se encontraron eventos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
