import { motion } from 'framer-motion';
import { ArrowRight, Ticket, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center bg-slate-900 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1540039155733-d7696d4ebaf7?auto=format&fit=crop&q=80" 
            alt="Concert Crowd" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="inline-block px-4 py-1 mb-6 border-l-4 border-orange-500 bg-orange-500/10 text-orange-400 font-semibold uppercase tracking-wider text-sm">
              Alaban Tickets
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Vive la <span className="text-orange-500">Experiencia</span> al Máximo.
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              Descubre los mejores eventos, conciertos y obras de teatro. Asegura tu lugar con nuestra plataforma rápida, segura y confiable.
            </p>
            <div className="flex gap-4">
              <Link to="/events" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded flex items-center gap-2 transition-all shadow-lg shadow-orange-500/30">
                Ver Cartelera <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded transition-all">
                Conócenos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">¿Por qué Elegirnos?</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-lg"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mb-6">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Boletos Garantizados</h3>
              <p className="text-slate-600">
                Todas tus compras están respaldadas. Obtén tus entradas al instante directamente en tu correo.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-lg"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Pagos Seguros</h3>
              <p className="text-slate-600">
                Integración total con pasarelas certificadas internacionalmente para proteger tus datos financieros.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-lg"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Proceso Rápido</h3>
              <p className="text-slate-600">
                Olvídate de las filas virtuales eternas. Compra en 3 clics y prepárate para disfrutar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para el próximo gran evento?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
            Explora nuestro catálogo y encuentra los conciertos, obras de teatro y conferencias que todos están esperando.
          </p>
          <Link to="/events" className="inline-block bg-white text-orange-600 font-bold py-4 px-10 rounded shadow-lg hover:bg-slate-100 transition-all">
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
};
