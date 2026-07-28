import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { ShinyText } from '../components/react-bits/ShinyText';
import { Magnet } from '../components/react-bits/Magnet';
import { useAuth } from '../context/AuthContext';

// Formulario de registro usando el estilo visual de Abner
export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register({ firstName, lastName, email, password });
      navigate('/events');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-violet-500/10 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-500/10 blur-[60px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <ShinyText text="Crea tu cuenta" className="text-3xl mb-2" speed={3} />
              <p className="text-slate-400 font-medium">Unete a ALABAN TICKETS hoy mismo</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-4 flex gap-3 text-sm mb-6 items-center"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2 ml-1 text-sm">Nombre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-violet-500/50 text-white rounded-xl pl-10 pr-3 py-3 outline-none transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] text-sm"
                      placeholder="Juan"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2 ml-1 text-sm">Apellido</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-violet-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] text-sm"
                      placeholder="Perez"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2 ml-1 text-sm">Correo electronico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 text-white rounded-xl pl-12 pr-4 py-3 outline-none transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2 ml-1 text-sm">Contrasena</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 text-white rounded-xl pl-12 pr-12 py-3 outline-none transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    placeholder="Minimo 6 caracteres"
                  />
                  {/* Boton para mostrar u ocultar la contrasena */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <Magnet padding={20}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Completar Registro'
                    )}
                  </button>
                </Magnet>
              </div>
            </form>

            <div className="mt-8 text-center text-slate-400 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-violet-400 font-bold hover:text-violet-300 transition-colors">
                Inicia sesion aqui
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
