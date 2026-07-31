import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { EventDto } from '../types/api';

export interface CartItem {
  event: EventDto;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (event: EventDto, quantity: number) => void;
  removeFromCart: (eventId: number) => void;
  updateQuantity: (eventId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (event: EventDto, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.event.id === event.id);
      if (existing) {
        return prev.map((item) =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { event, quantity }];
    });
  };

  const removeFromCart = (eventId: number) => {
    setItems((prev) => prev.filter((item) => item.event.id !== eventId));
  };

  const updateQuantity = (eventId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(eventId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.event.id === eventId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.event.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
