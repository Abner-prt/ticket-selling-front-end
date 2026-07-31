import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const handleCheckout = async () => {
    // TODO: Implementar pago real más adelante
    alert('Función de pago deshabilitada temporalmente hasta que se implemente la pasarela.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center">
        <ShoppingCart className="w-20 h-20 text-slate-300 mb-6" />
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Tu carrito está vacío</h2>
        <p className="text-slate-500 mb-8">Parece que aún no has seleccionado ningún evento.</p>
        <Link to="/events" className="bg-orange-500 text-white px-8 py-3 rounded font-bold hover:bg-orange-600 transition-colors">
          Explorar Eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Tu Carrito de Compras</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-4">
            {items.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={item.event.id} 
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="w-full sm:w-24 h-24 bg-slate-100 rounded overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1540039155733-d7696d4ebaf7?auto=format&fit=crop&q=80&w=200" alt="Thumb" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{item.event.title}</h3>
                  <p className="text-slate-500 text-sm">{new Date(item.event.date).toLocaleDateString()} - {item.event.location}</p>
                  <div className="text-orange-500 font-bold mt-2">${item.event.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded">
                    <button 
                      onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                    >-</button>
                    <span className="w-8 text-center font-semibold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                    >+</button>
                  </div>
                  
                  <div className="w-24 text-right font-bold text-slate-800">
                    ${(item.event.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.event.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="font-bold text-xl text-slate-800 mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 border-b border-slate-100 pb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.reduce((a,b)=>a+b.quantity, 0)} boletos)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cargos de servicio</span>
                  <span>$0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-2xl font-bold text-slate-900 mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                  {error}
                </div>
              )}

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" /> Pagar Ahora
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
