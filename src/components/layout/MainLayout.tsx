import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MouseAura } from '../react-bits/MouseAura';
import { ShinyText } from '../react-bits/ShinyText';
import { Ticket } from 'lucide-react';
import { Magnet } from '../react-bits/Magnet';

export function MainLayout() {
  return (
    <MouseAura>
      {/* Encabezado  */}
      <header className="absolute top-0 left-0 w-full p-6 z-40 pointer-events-none flex justify-center md:justify-start">
        <div className="pointer-events-auto">
          <Magnet padding={30}>
            <Link to="/" className="flex items-center gap-3 group bg-slate-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all">
              <div className="p-2 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-transform group-hover:rotate-12">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <ShinyText text="ALABAN TICKETS" className="text-2xl font-black tracking-tight" />
            </Link>
          </Magnet>
        </div>
      </header>

      <Navbar />
      
      <main className="flex-grow flex flex-col z-10 relative pb-24 pt-24">
        <Outlet />
      </main>

      <Footer />
    </MouseAura>
  );
}
