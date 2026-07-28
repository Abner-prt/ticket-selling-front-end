import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ticket, Search, ShoppingCart, User, Home, LogOut } from 'lucide-react';
import { Magnet } from '../react-bits/Magnet';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Catalogo', path: '/events', icon: Search },
    { name: 'Mis Compras', path: '/my-purchases', icon: Ticket },
    { name: 'Carrito', path: '/cart', icon: ShoppingCart },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="flex items-center gap-2 p-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Magnet key={item.name} padding={20}>
              <Link 
                to={item.path}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-6 h-6 z-10 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} />
                <span className="sr-only">{item.name}</span>
                
                {/* Tooltip al pasar el mouse */}
                <span className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all px-2 py-1 bg-slate-800 text-xs rounded-md pointer-events-none whitespace-nowrap border border-white/10">
                  {item.name}
                </span>
              </Link>
            </Magnet>
          );
        })}
        
        {/* Boton condicional de Perfil / Logout */}
        <Magnet padding={20}>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 group"
            >
              <LogOut className="w-6 h-6 z-10 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
              <span className="sr-only">Cerrar Sesion</span>
              <span className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all px-2 py-1 bg-slate-800 text-xs rounded-md pointer-events-none whitespace-nowrap border border-white/10 text-white">
                Cerrar Sesion
              </span>
            </button>
          ) : (
            <Link 
              to="/login"
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                location.pathname === '/login' || location.pathname === '/register'
                  ? 'text-fuchsia-400' 
                  : 'text-slate-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10'
              } group`}
            >
              {(location.pathname === '/login' || location.pathname === '/register') && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <User className={`w-6 h-6 z-10 transition-transform group-hover:scale-110 ${(location.pathname === '/login' || location.pathname === '/register') ? 'scale-110 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : ''}`} />
              <span className="sr-only">Perfil</span>
              <span className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all px-2 py-1 bg-slate-800 text-xs rounded-md pointer-events-none whitespace-nowrap border border-white/10 text-white">
                Perfil
              </span>
            </Link>
          )}
        </Magnet>
      </div>
    </motion.nav>
  );
}
