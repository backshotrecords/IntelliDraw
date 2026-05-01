import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Copy, Code, Network, Focus } from 'lucide-react';

export default function InteractiveCanvas() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.005;
      setScale(s => {
        let newScale = s - e.deltaY * zoomSensitivity;
        return Math.max(0.3, Math.min(newScale, 3));
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    // @ts-ignore
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    // @ts-ignore
    e.target.releasePointerCapture(e.pointerId);
  };

  // The arrow SVG to connect nodes
  const Arrow = ({ height = 40 }) => (
    <div className="relative flex justify-center z-0" style={{ height, width: 20 }}>
       {/* Line */}
       <div className="absolute top-0 w-[2px] bg-[#a3a3a3]" style={{ height: height - 5 }} />
       {/* Arrow head */}
       <div 
         className="absolute bottom-0"
         style={{
           width: 0, 
           height: 0, 
           borderLeft: '5px solid transparent',
           borderRight: '5px solid transparent',
           borderTop: '6px solid #a3a3a3',
         }}
       />
    </div>
  );

  return (
    <div 
      className="relative w-full h-full bg-[#fcfcfc] overflow-hidden select-none font-sans rounded-[2.5rem]"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          // Scale affects dot distance, position affects offset
          backgroundImage: 'radial-gradient(#c7c7c7 1.5px, transparent 1.5px)',
          backgroundSize: `${24 * scale}px ${24 * scale}px`,
          backgroundPosition: `${position.x}px ${position.y}px`
        }}
      />

      {/* Canvas Content */}
      <div 
        className="absolute top-[20%] left-1/2 origin-top"
        style={{
          transform: `translate(calc(-50% + ${position.x}px), ${position.y}px) scale(${scale})`,
        }}
      >
        <div className="flex flex-col items-center">
          
          <div className="w-[140px] h-[60px] bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-slate-800 text-[15px] font-medium shadow-sm relative z-10 transition-transform duration-200 hover:border-slate-400">
            Start
          </div>
          
          <Arrow height={40} />
          
          <div className="w-[280px] p-5 bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-center text-slate-800 text-[15px] shadow-sm relative z-10 leading-relaxed transition-transform duration-200 hover:border-slate-400">
            Click Sign Up for Free or<br/>Start for Free
          </div>

          <Arrow height={46} />

          <div className="w-[240px] h-[64px] bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-slate-800 text-[15px] shadow-sm relative z-10 transition-transform duration-200 hover:border-slate-400">
            Create an Account
          </div>

          <Arrow height={46} />

          <div className="w-[280px] p-6 bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-center text-slate-800 text-[15px] shadow-sm relative z-10 leading-snug transition-transform duration-200 hover:border-slate-400">
            Store Username and<br/>Password Somewhere<br/>Safe
          </div>

          {/* Continuing arrow to fade out */}
          <div className="relative flex justify-center z-0 h-[60px] w-[20px]">
             <div className="absolute top-0 w-[2px] bg-gradient-to-b from-[#a3a3a3] to-transparent h-full" />
          </div>

        </div>
      </div>

      {/* Floating Toolbar (Top Center) */}
      <div 
        className="absolute xl:top-6 top-4 left-1/2 -translate-x-1/2 flex items-center bg-white border border-slate-200/80 rounded-full shadow-sm p-1 z-20 pointer-events-auto cursor-default transition-transform"
        onPointerDown={e => e.stopPropagation()}
      >
         <button className="flex items-center gap-2 text-slate-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors">
           <Network className="w-4 h-4" />
           Flowchart
         </button>
         <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
           <Code className="w-4 h-4" />
           Code
         </button>
         <div className="w-px h-5 bg-slate-200 mx-1"></div>
         <button className="text-slate-500 hover:text-slate-800 p-2 ml-1 mr-1 rounded-full hover:bg-slate-50 transition-colors">
           <Copy className="w-4 h-4" />
         </button>
      </div>

      {/* Floating Controls (Mid Left) */}
      <div 
        className="absolute left-4 xl:left-6 top-[60%] lg:top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 pointer-events-auto cursor-default"
        onPointerDown={e => e.stopPropagation()}
      >
        <div className="flex flex-col bg-white border border-slate-200/80 rounded-[1.25rem] shadow-sm overflow-hidden">
          <button 
            onClick={() => setScale(s => Math.min(s + 0.2, 3))}
            className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b border-slate-100"
            title="Zoom In"
          >
            <ZoomIn className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
          <button 
             onClick={() => setScale(s => Math.max(s - 0.2, 0.3))}
            className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>
        
        <button 
          onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
          className="p-2.5 bg-white border border-slate-200/80 rounded-[1rem] shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
          title="Fit to Screen"
        >
          <Focus className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>

        <div className="text-center text-[11px] font-bold text-slate-400 mt-1 select-none">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
}
