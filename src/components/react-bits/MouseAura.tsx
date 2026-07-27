import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function MouseAura({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX - 200); // 200 es la mitad del efecto
      springY.set(e.clientY - 200);
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [springX, springY]);

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-50 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      {/* Capa de fondo de malla */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Aura que sigue al mouse */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-fuchsia-500/20 blur-[100px] pointer-events-none z-0"
        style={{
          x: springX,
          y: springY,
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {/* Orbes de acento estáticos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
