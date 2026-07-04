import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Copy, Check, Code, Network, Focus } from 'lucide-react';

const MERMAID_CODE = `flowchart TD
    A[Login Request] --> B[User submits email + password]
    B --> C[Verify password hash]
    C --> D[Issue JWT + refresh token]
    D --> E[Redirect to /dashboard]`;

export default function InteractiveCanvas() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [view, setView] = useState<'flowchart' | 'code'>('flowchart');
  const [copied, setCopied] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || view === 'code') return;

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
  }, [view]);

  const handleCopy = () => {
    const showCopied = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    };

    // execCommand must run synchronously inside the click gesture, and it
    // works in embedded/insecure contexts where the async API is sandboxed —
    // so it goes first, and its return value tells us if the copy landed.
    const textarea = document.createElement('textarea');
    textarea.value = MERMAID_CODE;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(textarea);

    if (ok) {
      showCopied();
      return;
    }

    navigator.clipboard?.writeText(MERMAID_CODE).then(showCopied).catch(() => {});
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (view === 'code') return;
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
      style={{ cursor: view === 'code' ? 'default' : isDragging ? 'grabbing' : 'grab' }}
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
          display: view === 'code' ? 'none' : undefined,
        }}
      >
        <div className="flex flex-col items-center">
          
          <div className="w-[140px] h-[60px] bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-slate-800 text-[15px] font-medium shadow-sm relative z-10 transition-transform duration-200 hover:border-slate-400">
            Login Request
          </div>

          <Arrow height={40} />

          <div className="w-[280px] p-5 bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-center text-slate-800 text-[15px] shadow-sm relative z-10 leading-relaxed transition-transform duration-200 hover:border-slate-400">
            User submits<br/>email + password
          </div>

          <Arrow height={46} />

          <div className="w-[240px] h-[64px] bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-slate-800 text-[15px] shadow-sm relative z-10 transition-transform duration-200 hover:border-slate-400">
            Verify password hash
          </div>

          <Arrow height={46} />

          <div className="w-[280px] p-6 bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-center text-slate-800 text-[15px] shadow-sm relative z-10 leading-snug transition-transform duration-200 hover:border-slate-400">
            Issue JWT +<br/>refresh token
          </div>

          <Arrow height={46} />

          <div className="w-[240px] h-[64px] bg-[#f0f0f0] border border-[#d4d4d4] rounded-xl flex items-center justify-center text-slate-800 text-[15px] shadow-sm relative z-10 transition-transform duration-200 hover:border-slate-400">
            Redirect to /dashboard
          </div>

          {/* Continuing arrow to fade out */}
          <div className="relative flex justify-center z-0 h-[60px] w-[20px]">
             <div className="absolute top-0 w-[2px] bg-gradient-to-b from-[#a3a3a3] to-transparent h-full" />
          </div>

        </div>
      </div>

      {/* Code View — the Mermaid source behind the flowchart */}
      {view === 'code' && (
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/60">
              <span className="font-mono text-xs font-semibold tracking-widest text-slate-500 uppercase">auth_flow.mmd</span>
              <span className="font-mono text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Mermaid</span>
            </div>
            <pre className="p-5 font-mono text-[12px] md:text-[13px] leading-relaxed text-slate-700 overflow-x-auto select-text cursor-text" onPointerDown={e => e.stopPropagation()}>
              {MERMAID_CODE}
            </pre>
          </div>
        </div>
      )}

      {/* Floating Toolbar (Top Center) */}
      <div 
        className="absolute xl:top-6 top-4 left-1/2 -translate-x-1/2 flex items-center bg-white border border-slate-200/80 rounded-full shadow-sm p-1 z-20 pointer-events-auto cursor-default transition-transform"
        onPointerDown={e => e.stopPropagation()}
      >
         <button
           onClick={() => setView('flowchart')}
           className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${view === 'flowchart' ? 'text-slate-800 font-semibold bg-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'}`}>
           <Network className="w-4 h-4" />
           Flowchart
         </button>
         <button
           onClick={() => setView('code')}
           className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${view === 'code' ? 'text-slate-800 font-semibold bg-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'}`}>
           <Code className="w-4 h-4" />
           Code
         </button>
         <div className="w-px h-5 bg-slate-200 mx-1"></div>
         <button
           onClick={handleCopy}
           title={copied ? 'Copied!' : 'Copy Mermaid code'}
           className="text-slate-500 hover:text-slate-800 p-2 ml-1 mr-1 rounded-full hover:bg-slate-50 transition-colors">
           {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
         </button>
      </div>

      {/* Floating Controls (Mid Left) — only relevant to the flowchart view */}
      {view === 'flowchart' && (
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
      )}
    </div>
  );
}
