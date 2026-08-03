import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ShieldCheck, Plus, Minus, ShoppingCart } from 'lucide-react';
import api from '../services/api';
import type { EventDto, ResponseDto } from '../types/api';
import { useCart } from '../context/CartContext';
import { getEventImage } from '../utils/imageHelper';

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [event, setEvent] = useState<EventDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get<ResponseDto<EventDto>>(`/api/event/${id}`);
        if (response.data.status) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleAddToCart = () => {
    if (event) {
      addToCart(event, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Evento no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Hero Banner */}
      <div className="w-full h-[400px] relative bg-slate-900">
        <img 
          src={getEventImage(event.categoryId, event.id, event.title)}
          alt={event.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 font-bold rounded text-sm mb-4">
              Evento Destacado
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">{event.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-slate-600 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">{event.location}</span>
              </div>
            </div>

            <div className="prose max-w-none text-slate-600">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Acerca de este evento</h3>
              <p className="leading-relaxed whitespace-pre-line">
                {event.description || "Prepárate para vivir una experiencia inolvidable. Este evento ha sido cuidadosamente preparado para ofrecerte el mejor entretenimiento, con producción de primer nivel y momentos que recordarás por siempre."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Compra */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-xl shadow-slate-200/50 p-6 border border-slate-100 sticky top-24">
            <div className="text-center mb-6">
              <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Precio por boleto</span>
              <div className="text-4xl font-bold text-orange-500 mt-1">L. {event.price.toFixed(2)}</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-600 font-medium">Cantidad</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold text-slate-800 pt-2 border-t border-slate-100">
                <span>Total:</span>
                <span>L. {(event.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/30"
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir al Carrito
            </button>

            <div className="mt-6 flex items-start gap-3 text-sm text-slate-500 bg-orange-50 p-4 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-orange-500 shrink-0" />
              <p>Compra 100% segura. Tus datos están protegidos y tus boletos garantizados.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
