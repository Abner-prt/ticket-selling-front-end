import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle, Clock } from 'lucide-react';
import apiClient from '../api/client';
import type { OrderHistoryDto, ResponseDto } from '../types/api';

export const Transactions = () => {
  const [orders, setOrders] = useState<OrderHistoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiClient.get<ResponseDto<OrderHistoryDto[]>>('/checkout/history');
        if (response.data.status) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Mis Transacciones</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <Ticket className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-700">No hay transacciones</h2>
            <p className="text-slate-500 mt-2">Aún no has comprado ningún boleto.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order.id} 
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
                  <div>
                    <span className="text-slate-400 text-sm">Orden #{order.id}</span>
                    <div className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-sm">Total</span>
                    <div className="font-bold text-orange-400">${order.totalAmount.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.paymentStatus === 'Completed' ? (
                      <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        <CheckCircle className="w-4 h-4" /> Pagado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        <Clock className="w-4 h-4" /> Pendiente
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">Boletos Adquiridos</h4>
                  <div className="space-y-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-800">{item.eventTitle}</p>
                          <p className="text-sm text-slate-500">Cantidad: {item.quantity} x ${item.unitPrice.toFixed(2)}</p>
                        </div>
                        <div className="font-bold text-slate-800">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
