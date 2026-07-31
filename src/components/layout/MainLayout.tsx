import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, Ticket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export function MainLayout() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">ALABAN TICKETS</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-semibold transition-colors ${isActive('/') ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}`}>Inicio</Link>
            <Link to="/events" className={`font-semibold transition-colors ${isActive('/events') ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}`}>Catálogo</Link>
            {user && (
              <Link to="/transactions" className={`font-semibold transition-colors ${isActive('/transactions') ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}`}>Mis Compras</Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-orange-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-slate-700 font-medium">Hola, {user.firstName}</span>
                <button 
                  onClick={logout}
                  className="text-slate-600 hover:text-red-500 transition-colors p-2"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 hover:text-orange-500 font-semibold transition-colors">Entrar</Link>
                <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-colors">Registro</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-black text-white tracking-tighter">ALABAN TICKETS</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ALABAN TICKETS. Proyecto de Paradigmas de Programación.
          </p>
        </div>
      </footer>
    </div>
  );
}
