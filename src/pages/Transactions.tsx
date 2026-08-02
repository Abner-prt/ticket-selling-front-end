import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, CheckCircle, Clock, QrCode, Calendar, MapPin, Tag } from 'lucide-react';
import type { OrderHistoryDto } from '../types/api';

// Mocks de compras premium
const MOCK_ORDERS: OrderHistoryDto[] = [
  {
    id: 1042,
    totalAmount: 1850.00,
    paymentStatus: 'Completado',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        eventId: 1,
        eventTitle: 'World\'s Hottest Tour - Bad Bunny',
        quantity: 2,
        unitPrice: 925.00
      }
    ]
  },
  {
    id: 1045,
    totalAmount: 1500.00,
    paymentStatus: 'Pendiente',
    createdAt: new Date().toISOString(),
    items: [
      {
        eventId: 3,
        eventTitle: 'Mañana Será Bonito Tour - Karol G',
        quantity: 1,
        unitPrice: 1500.00
      }
    ]
  }
];

export const Transactions = () => {
  const [orders] = useState<OrderHistoryDto[]>(MOCK_ORDERS);


  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-900 to-slate-50 opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200">
            <Ticket className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mis Entradas</h1>
            <p className="text-slate-500 font-medium">Gestiona tus boletos comprados y próximos eventos</p>
          </div>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-xl"
          >
            <Ticket className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Aún no tienes entradas</h2>
            <p className="text-slate-500 max-w-md mx-auto">Explora nuestro catálogo de eventos y asegura tu lugar en las mejores experiencias.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {orders.map((order, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', bounce: 0.3 }}
                  key={order.id} 
                  className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Cabecera de la Orden */}
                  <div className="bg-slate-900 px-8 py-5 flex flex-wrap gap-4 justify-between items-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400 via-slate-900 to-slate-900 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 block">No. de Orden</span>
                      <div className="text-xl font-black flex items-center gap-2">
                        #{order.id}
                        <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                          {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 block">Total Pagado</span>
                        <div className="text-xl font-black text-orange-400">L. {order.totalAmount.toFixed(2)}</div>
                      </div>
                      
                      <div className="h-10 w-px bg-slate-700 hidden sm:block" />

                      <div>
                        {order.paymentStatus === 'Completado' ? (
                          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold shadow-inner">
                            <CheckCircle className="w-5 h-5" /> Completado
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-xl text-sm font-bold shadow-inner">
                            <Clock className="w-5 h-5 animate-pulse" /> Pendiente
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Detalle de Boletos (Cuerpo) */}
                  <div className="p-8 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {order.items.map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex shadow-sm group hover:border-orange-200 transition-colors">
                          
                          {/* Sección Izquierda: Info del Evento */}
                          <div className="flex-grow p-6 flex flex-col justify-between border-r border-slate-200 border-dashed relative">
                            {/* Decoración recorte boleto */}
                            <div className="absolute -right-3 -top-3 w-6 h-6 bg-slate-50 rounded-full border-b border-l border-slate-200" />
                            <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-slate-50 rounded-full border-t border-l border-slate-200" />

                            <div>
                              <div className="flex items-center gap-2 text-orange-500 text-xs font-bold tracking-wider uppercase mb-2">
                                <Tag className="w-3 h-3" /> Admisión General
                              </div>
                              <h4 className="font-black text-lg text-slate-900 leading-tight mb-4 group-hover:text-orange-500 transition-colors">
                                {item.eventTitle}
                              </h4>
                              
                              <div className="space-y-2 text-sm text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-slate-400" /> Fecha por definir
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-slate-400" /> Lugar del evento
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end">
                              <div>
                                <span className="block text-xs text-slate-400 font-semibold mb-1">CANTIDAD</span>
                                <span className="font-black text-slate-700 text-lg">{item.quantity} Boleto(s)</span>
                              </div>
                              <div className="text-right">
                                <span className="block text-xs text-slate-400 font-semibold mb-1">PRECIO UNI.</span>
                                <span className="font-black text-slate-700">L. {item.unitPrice.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Sección Derecha: QR Code Simulado */}
                          <div className="w-40 bg-slate-50 p-4 flex flex-col items-center justify-center relative">
                            {order.paymentStatus === 'Completado' ? (
                              <>
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 group-hover:border-orange-300 transition-all duration-300">
                                  <QrCode className="w-20 h-20 text-slate-800" strokeWidth={1.5} />
                                </div>
                                <p className="text-[10px] font-mono text-slate-400 mt-3 tracking-widest uppercase">
                                  ID: {Math.random().toString(36).substr(2, 8)}
                                </p>
                                <button className="mt-3 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">
                                  Descargar PDF
                                </button>
                              </>
                            ) : (
                              <div className="text-center p-4">
                                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-slate-500">QR no disponible</p>
                                <p className="text-[10px] text-slate-400 mt-1">Pago pendiente</p>
                              </div>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
