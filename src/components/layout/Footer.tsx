import { Globe, Mail, MessageCircle, Ticket } from 'lucide-react';
import { Magnet } from '../react-bits/Magnet';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#030014]/80 backdrop-blur-3xl pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <Ticket className="h-8 w-8 text-fuchsia-500" />
              <span className="text-2xl font-black text-white tracking-tighter">ALABAN TICKETS</span>
            </div>
            <p className="text-slate-500 max-w-sm text-center md:text-left text-sm font-medium">
              Redefiniendo la forma en que vives tus eventos favoritos. Diseño, velocidad y seguridad en cada compra.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs opacity-50">Síguenos</h4>
            <div className="flex space-x-4">
              <Magnet padding={20}>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-fuchsia-500/20 text-slate-400 hover:text-fuchsia-400 transition-colors border border-white/5 hover:border-fuchsia-500/30">
                  <span className="sr-only">Sitio Web</span>
                  <Globe className="h-5 w-5" />
                </a>
              </Magnet>
              <Magnet padding={20}>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors border border-white/5 hover:border-blue-500/30">
                  <span className="sr-only">Mensaje</span>
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Magnet>
              <Magnet padding={20}>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-violet-500/20 text-slate-400 hover:text-violet-400 transition-colors border border-white/5 hover:border-violet-500/30">
                  <span className="sr-only">Correo</span>
                  <Mail className="h-5 w-5" />
                </a>
              </Magnet>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
          <p className="text-center text-xs font-medium text-slate-600">
            &copy; {new Date().getFullYear()} ALABAN TICKETS. Todos los derechos reservados.
            <br />
            Proyecto - Paradigmas de Programación.
          </p>
        </div>
      </div>
    </footer>
  );
}
