import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ firstName, lastName, email, password });
      navigate("/events");
      navigate('/login', { state: { successMessage: '¡Cuenta creada con éxito! Por favor inicia sesión.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Crea tu cuenta
              </h2>
              <p className="text-slate-500 font-medium">
                Únete a ALABAN TICKETS hoy mismo
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex gap-3 text-sm mb-6 items-center"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 ml-1 text-sm">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 text-slate-900 rounded-xl pl-10 pr-3 py-3 outline-none transition-all focus:ring-4 focus:ring-orange-500/10 text-sm"
                      placeholder="Juan"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 ml-1 text-sm">
                    Apellido
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all focus:ring-4 focus:ring-orange-500/10 text-sm"
                      placeholder="Pérez"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2 ml-1 text-sm">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 text-slate-900 rounded-xl pl-12 pr-4 py-3 outline-none transition-all focus:ring-4 focus:ring-orange-500/10"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2 ml-1 text-sm">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 text-slate-900 rounded-xl pl-12 pr-12 py-3 outline-none transition-all focus:ring-4 focus:ring-orange-500/10"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Completar Registro"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-slate-500 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
