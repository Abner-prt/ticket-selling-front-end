import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, CheckCircle, Clock, Calendar, MapPin, Tag, Loader2, AlertCircle, Download } from 'lucide-react';
import type { OrderHistoryDto, ResponseDto } from '../types/api';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export const Transactions = () => {
  const [orders, setOrders] = useState<OrderHistoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDownloadPDF = async (orderId: number, itemIndex: number, eventTitle: string) => {
    const elementId = `ticket-${orderId}-${itemIndex}`;
    const element = document.getElementById(elementId);
    if (!element) return;
    
    setIsDownloading(elementId);
    try {
      const dataUrl = await toPng(element, { backgroundColor: '#ffffff', cacheBust: true, pixelRatio: 2 });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const elWidth = element.clientWidth || 1;
      const elHeight = element.clientHeight || 1;
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (elHeight * pdfWidth) / elWidth;
      
      pdf.addImage(dataUrl, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Boleto_${eventTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Orden_${orderId}.pdf`);
    } catch (err: any) {
      alert("Error al generar el PDF: " + (err.message || "Error desconocido"));
      console.error("Error generating PDF", err);
    } finally {
      setIsDownloading(null);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<ResponseDto<OrderHistoryDto[]>>('/api/orders/my-orders');
        if (response.data.status) {
          setOrders(response.data.data);
        } else {
          setError(response.data.message || 'Error al obtener historial');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error de conexión con el servidor');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-16 h-16 text-orange-500" />
            </motion.div>
            <p className="mt-4 font-semibold text-slate-500">Cargando tus compras...</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-red-50/50 rounded-3xl border border-red-100 shadow-sm"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-900 mb-2">Ups, algo salió mal</h2>
            <p className="text-red-700 max-w-md mx-auto">{error}</p>
          </motion.div>
        ) : orders.length === 0 ? (
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
                  {/* Cabecera de la orden */}
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
                        {order.paymentStatus === 'Completado' || order.paymentStatus === 'Completed' ? (
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
                  
                  {/* Detalle de boletos */}
                  <div className="p-8 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {order.items.map((item, i) => (
                        <div key={i} id={`ticket-${order.id}-${i}`} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex shadow-sm group hover:border-orange-200 transition-colors">
                          
                          {/* Seccion izquierda info del evento */}
                          <div className="flex-grow p-6 flex flex-col justify-between border-r border-slate-200 border-dashed relative">
                            {/* Decoracion recorte boleto */}
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

                          {/* Seccion derecha codigo qr */}
                          <div className="w-40 bg-slate-50 p-4 flex flex-col items-center justify-center relative">
                            {order.paymentStatus === 'Completado' || order.paymentStatus === 'Completed' ? (
                              <>
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 group-hover:border-orange-300 transition-all duration-300">
                                  <QRCode 
                                    value={`${window.location.origin}/verify/${order.id}`} 
                                    size={100} 
                                    level="L" 
                                  />
                                </div>
                                <p className="text-[10px] font-mono text-slate-400 mt-3 tracking-widest uppercase">
                                  ID: {order.id.toString().padStart(4, '0')}-{i}
                                </p>
                                <button 
                                  onClick={() => handleDownloadPDF(order.id, i, item.eventTitle)}
                                  disabled={isDownloading === `ticket-${order.id}-${i}`}
                                  className="mt-3 flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                                >
                                  {isDownloading === `ticket-${order.id}-${i}` ? (
                                    <><Loader2 className="w-3 h-3 animate-spin" /> Guardando...</>
                                  ) : (
                                    <><Download className="w-3 h-3" /> Descargar PDF</>
                                  )}
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
