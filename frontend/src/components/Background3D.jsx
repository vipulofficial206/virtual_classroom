import React, { useEffect, useState, useRef } from 'react';

const Background3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Increase count and size for better visibility
  const particles = Array.from({ length: 120 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 6 + 2,
    speed: Math.random() * 40 + 20,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  const blobs = [
    { color: 'bg-indigo-600/30', size: 'h-[60rem] w-[60rem]', speed: 40, offset: { x: 10, y: 10 } },
    { color: 'bg-indigo-500/25', size: 'h-[50rem] w-[50rem]', speed: 60, offset: { x: 40, y: 30 } },
    { color: 'bg-purple-600/25', size: 'h-[55rem] w-[55rem]', speed: 50, offset: { x: 70, y: 50 } },
    { color: 'bg-blue-600/20', size: 'h-[45rem] w-[45rem]', speed: 30, offset: { x: 20, y: 80 } },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none select-none"
    >
      {/* Immersive Deep Glow Blobs */}
      <div className="absolute inset-0 filter blur-[120px] opacity-70">
        {blobs.map((blob, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-transform duration-1000 ease-out ${blob.color} ${blob.size}`}
            style={{
              transform: `translate(
                ${(mousePos.x - 0.5) * -blob.speed}px, 
                ${(mousePos.y - 0.5) * -blob.speed}px
              )`,
              left: `${blob.offset.x}%`,
              top: `${blob.offset.y}%`,
            }}
          />
        ))}
      </div>

      {/* Parallax Starfield / Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white transition-transform duration-700 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              transform: `translate(
                ${(mousePos.x - 0.5) * -p.speed}px, 
                ${(mousePos.y - 0.5) * -p.speed}px
              )`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grid / Digital Matrix Overlay (Optional but premium) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      {/* Subtle Grain Overlay for texture - Replaced external 403 SVG with inline base64 noise */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]"></div>
      
      {/* Deep Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-60"></div>
    </div>
  );
};

export default Background3D;
