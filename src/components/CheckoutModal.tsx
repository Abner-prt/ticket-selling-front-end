import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

// Llave pública de stripe
const stripePromise = loadStripe('pk_test_51Tz7uWAAvyQ9NEo33zidPtCxDU7FEcY6Y6GmxBrdw6kmNi3ASh8wEmxELfINcnGikQcmNTL1BIUW41Ae0Iiad9Mc00JcI0OeiC');

const CheckoutForm = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    // TODO: Aquí en el futuro llamaremos a nuestro backend para crear el PaymentIntent
    // Por ahorita se simula un tiempo de espera de 2 segundos para mostrar el UI
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // clear al carrito
      setTimeout(() => {
        clearCart();
        onClose();
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Pago Exitoso!</h3>
        <p className="text-slate-500">Tus boletos han sido generados correctamente.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Detalles de la tarjeta</label>
        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#334155',
                  fontFamily: '"Inter", sans-serif',
                  '::placeholder': {
                    color: '#94a3b8',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="border-t border-slate-100 pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-600 font-medium">Total a Pagar</span>
          <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Lock className="w-5 h-5" /> Procesar Pago Seguro
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Checkout</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <Elements stripe={stripePromise}>
                  <CheckoutForm onClose={onClose} />
                </Elements>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
