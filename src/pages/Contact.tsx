import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─── Slide-to-Join WhatsApp Card ─── */
function WhatsAppCard() {
  const WHATSAPP_LINK = 'https://chat.whatsapp.com/Jr1BYruwnVbKxv8iwJ6aQo';

  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const maxDrag = useRef(0);

  const updateMaxDrag = useCallback(() => {
    if (containerRef.current && thumbRef.current) {
      maxDrag.current =
        containerRef.current.clientWidth - thumbRef.current.clientWidth - 8;
    }
  }, []);

  const onStart = useCallback(
    (clientX: number) => {
      isDragging.current = true;
      updateMaxDrag();
      startX.current = clientX;

      const thumb = thumbRef.current;
      const text = textRef.current;
      if (thumb) {
        thumb.style.transition = 'none';
        thumb.style.backgroundColor = '#f8fafc';
      }
      if (text) text.style.transition = 'none';
    },
    [updateMaxDrag],
  );

  const onMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const dragAmount = clientX - startX.current;
    currentX.current = Math.min(Math.max(0, dragAmount), maxDrag.current);

    const thumb = thumbRef.current;
    const text = textRef.current;
    if (thumb) thumb.style.transform = `translateX(${currentX.current}px)`;
    if (text)
      text.style.opacity = String(
        1 - currentX.current / (maxDrag.current * 0.7),
      );
  }, []);

  const onEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const thumb = thumbRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;

    if (thumb) {
      thumb.style.transition =
        'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background-color 0.2s';
      thumb.style.backgroundColor = '#ffffff';
    }
    if (text) text.style.transition = 'opacity 0.3s ease';

    if (currentX.current > maxDrag.current * 0.75) {
      if (thumb)
        thumb.style.transform = `translateX(${maxDrag.current}px)`;
      setTimeout(() => {
        if (overlay) overlay.style.opacity = '1';
      }, 150);
      setTimeout(() => {
        window.open(WHATSAPP_LINK, '_blank', 'noopener');
      }, 800);
    } else {
      if (thumb) thumb.style.transform = 'translateX(0px)';
      if (text) text.style.opacity = '1';
      currentX.current = 0;
    }
  }, []);

  /* Attach global move / end listeners */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const handleMouseUp = () => onEnd();
    const handleTouchEnd = () => onEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', updateMaxDrag);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', updateMaxDrag);
    };
  }, [onMove, onEnd, updateMaxDrag]);

  return (
    <div
      className="w-full max-w-md mx-auto rounded-3xl p-8 flex flex-col items-center text-center"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow:
          '0 25px 50px -12px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.8) inset',
        border: '1px solid rgba(226,232,240,0.8)',
      }}
    >
      {/* IntelliDraw Logo */}
      <div className="flex items-center gap-2 mb-6" style={{ color: '#0b1120' }}>
        <img src="/favicon.svg" alt="IntelliDraw" className="w-7 h-7" />
        <span className="text-2xl font-bold tracking-tight">IntelliDraw</span>
      </div>

      {/* Badge + Title */}
      <div className="mb-8 w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-bold tracking-wide uppercase mb-4">
          {/* WhatsApp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Official Group
        </div>

        <h2 className="text-3xl font-extrabold leading-tight mb-3" style={{ color: '#0b1120' }}>
          Canvas Community
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed px-2">
          Join the AI-powered infinite canvas flow chart generator community. Share
          diagrams, get early access to features, and connect with other users.
        </p>
      </div>

      {/* Participant Avatars */}
      <div className="w-full mb-8">
        <div className="flex justify-center mb-3" style={{ zIndex: 20, position: 'relative' }}>
          {[
            { seed: 'Felix', bg: 'e2e8f0' },
            { seed: 'Aneka', bg: 'e0e7ff' },
            { seed: 'John', bg: 'fef3c7' },
          ].map((a, i) => (
            <div
              key={a.seed}
              className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
              style={{
                marginLeft: i === 0 ? 0 : '-0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${a.seed}&backgroundColor=${a.bg}`}
                alt={`Member ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div
            className="w-12 h-12 rounded-full border-2 border-white bg-white flex items-center justify-center"
            style={{
              marginLeft: '-0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            }}
          >
            <span className="text-xs font-bold" style={{ color: '#0b1120' }}>
              +84
            </span>
          </div>
        </div>
        <div className="text-xs font-medium text-gray-500">
          Over 80+ active creators inside
        </div>
      </div>

      {/* Slide-to-Join Slider */}
      <div className="w-full mb-2">
        <div
          ref={containerRef}
          className="relative w-full h-16 rounded-full overflow-hidden flex items-center p-1"
          style={{
            backgroundColor: '#0b1120',
            boxShadow: '0 10px 15px -3px rgba(11,17,32,0.2)',
            touchAction: 'none',
          }}
        >
          {/* Track text */}
          <div
            ref={textRef}
            className="absolute w-full text-center text-white/90 font-semibold text-sm pointer-events-none pr-4"
          >
            Slide to join WhatsApp
          </div>

          {/* Draggable thumb */}
          <div
            ref={thumbRef}
            className="relative h-14 w-20 bg-white rounded-full flex items-center justify-center z-10 select-none"
            style={{ cursor: 'grab', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' }}
            onMouseDown={(e) => onStart(e.clientX)}
            onTouchStart={(e) => onStart(e.touches[0].clientX)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#25D366"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          {/* Success overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none z-20"
            style={{ backgroundColor: '#25D366', opacity: 0, transition: 'opacity 0.3s' }}
          >
            <span className="text-white font-bold text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Opening WhatsApp…
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-gray-400 mt-5 font-medium uppercase tracking-wider flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block -mt-0.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Secure Community Link
      </p>
    </div>
  );
}

/* ─── Contact Page ─── */
export default function Contact() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-mesh-light selection:bg-slate-200 selection:text-slate-900 text-slate-900 flex flex-col">
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 animate-fade-in-up">
        <nav className="flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-white/70 backdrop-blur-lg border border-slate-200/60 rounded-full shadow-sm relative">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="IntelliDraw" className="w-6 h-6" />
            <span className="font-bold tracking-tight text-lg">IntelliDraw</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 pt-40 pb-24">

        <h1 className="article-title text-4xl md:text-5xl font-bold text-[#111827] mb-10 leading-tight">
          Contact Us
        </h1>

        <div className="animate-fade-in-up">
          <div className="article-body text-slate-700">
            <p className="mb-6">
              If your mind is always juggling big ideas, complex systems, and more moving parts than anyone else seems to notice, you're in the right place. IntelliDraw is built for thinkers who've been told they overthink, over-plan, or over-engineer—but know that's exactly where their edge lives.
            </p>

            <p className="mb-10">
              Join our research lab on WhatsApp and connect with others like you, turning deep thinking into real, working systems.
            </p>
          </div>

          {/* WhatsApp Join Card */}
          <div className="mb-12">
            <WhatsAppCard />
          </div>

          <div className="mt-12 text-left">
            <Link to="/" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              Go to the App
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
