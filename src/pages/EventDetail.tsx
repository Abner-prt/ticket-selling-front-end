import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket as TicketIcon, AlertCircle } from 'lucide-react';
import { AuroraBackground } from '../components/react-bits/AuroraBackground';
import { ShinyText } from '../components/react-bits/ShinyText';
import { Magnet } from '../components/react-bits/Magnet';
import { TicketMap } from '../components/event/TicketMap';
import type { Event } from '../types';

//datos inventados btw para btns y executions que se haran despues al implementar backend
const MOCK_EVENT: Event = {
  id: 1,
  title: 'Concierto de Luis Miguel',
  description: 'Un espectáculo inolvidable reviviendo los más grandes éxitos del sol de México. Una noche llena de romanticismo, boleros y mariachi en vivo. Prepárate para cantar a todo pulmón.',
  date: '2026-11-20T21:00:00Z',
  location: 'Auditorio Nacional',
  imageUrl: 'https://images.unsplash.com/photo-1540039155732-6847350057c0?auto=format&fit=crop&q=80',
  category: 'Concierto',
  price: 250.00,
  totalTickets: 1000,
  availableTickets: 300
};

export function EventDetail() {
  const { id: _id } = useParams();
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // si un evento no se enuentra
  const event = MOCK_EVENT; 

  const handleBuy = () => {
    if (!selectedZone) return;
    alert(`Comprando ${ticketQuantity} boleto(s) para la zona ${selectedZone.label} por L. ${selectedZone.price * ticketQuantity}`);
    // TODO integration: navigate('/checkout') or adding to cart
  };

  return (
    <AuroraBackground>
      <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[calc(100vh-80px)] flex flex-col z-10">
        
        {/* Seccion del Encabezado */}
        <div className="mb-8 lg:mb-12 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <ShinyText text={event.title} speed={2.5} className="py-2" />
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">{event.description}</p>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-4">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
              <Calendar className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-slate-200 font-medium">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
              <Clock className="w-8 h-8 text-violet-400 mb-2" />
              <span className="text-slate-200 font-medium">{new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
              <MapPin className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-slate-200 font-medium">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Grid de Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          
          {/* Interactivo de mapa */}
          <div className="lg:col-span-2 h-[600px] lg:h-[800px] flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-blue-400" />
              Selecciona tu Zona
            </h2>
            <div className="flex-1 relative rounded-3xl p-1 bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-amber-500/20">
              <TicketMap onSelectZone={setSelectedZone} />
            </div>
          </div>

          {/* Panel de seleccion de zonas */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl sticky top-24">
              {selectedZone ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedZone.label}</h3>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {selectedZone.capacity} lugares disponibles
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400">Precio Unitario</span>
                      <span className="text-xl font-bold text-white">L. {selectedZone.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-400">Cantidad</span>
                      <div className="flex items-center gap-4 bg-slate-950 rounded-xl p-1 border border-slate-800">
                        <button 
                          onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                          className="w-10 h-10 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
                        >-</button>
                        <span className="w-8 text-center font-bold text-lg">{ticketQuantity}</span>
                        <button 
                          onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                          className="w-10 h-10 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
                        >+</button>
                      </div>
                    </div>
                    
                    <div className="h-px w-full bg-slate-700/50 mb-4"></div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-slate-300 font-medium">Total a Pagar</span>
                      <span className="text-3xl font-black text-amber-400">
                        L. {selectedZone.price * ticketQuantity}
                      </span>
                    </div>
                  </div>

                  <Magnet padding={20} disabled={false}>
                    <button 
                      onClick={handleBuy}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                    >
                      Continuar al Pago
                    </button>
                  </Magnet>
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                    <TicketIcon className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2">Ninguna zona seleccionada</h3>
                  <p className="text-sm">Explora el mapa interactivo y selecciona la zona en la que deseas comprar tus boletos.</p>
                </div>
              )}
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded-2xl p-4 flex gap-3 text-blue-200 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-400" />
              <p>Las entradas están sujetas a disponibilidad. Tienes 10 minutos para completar tu compra una vez inicies el pago.</p>
            </div>
          </div>
        </div>

      </div>
    </AuroraBackground>
  );
}
