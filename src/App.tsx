import React, { useEffect } from 'react';
import { ArrowRight, Hexagon, ChevronRight, Twitter, Linkedin, MessageCircle, PenTool, Network, Star, Share2, User } from 'lucide-react';
import InteractiveCanvas from './components/InteractiveCanvas';
import TypewriterHeadline from './components/TypewriterHeadline';

export default function App() {
  // Injecting custom styles for the specific fade-in animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      body {
        font-family: 'Inter', sans-serif;
        background-color: #fafafa;
        color: #0f172a;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
      
      .delay-100 { animation-delay: 100ms; }
      .delay-200 { animation-delay: 200ms; }
      .delay-300 { animation-delay: 300ms; }
      .delay-400 { animation-delay: 400ms; }

      @keyframes radialPulse {
        0% { 
          -webkit-mask-size: 0% 0%;
          mask-size: 0% 0%;
          opacity: 0;
        }
        15% {
          opacity: 0.6;
        }
        85% {
          opacity: 0;
        }
        100% { 
          -webkit-mask-size: 200vmax 200vmax;
          mask-size: 200vmax 200vmax;
          opacity: 0;
        }
      }

      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .animate-cursor-blink {
        animation: cursorBlink 1s step-end infinite;
      }
      
      /* Subtle animated gradient background for the white theme */
      .bg-mesh-light {
        background-color: #ffffff;
        background-image: 
          radial-gradient(at 40% 20%, hsla(228,100%,94%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189,100%,96%,1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,97%,1) 0px, transparent 50%);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-mesh-light selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden text-slate-900">
      
      {/* ========================================
        GLASSMORPHIC PILL NAVIGATION
        ========================================
      */}
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 animate-fade-in-up">
        <nav className="flex items-center justify-between w-full max-w-4xl px-4 py-2 bg-white/70 backdrop-blur-lg border border-slate-200/60 rounded-full shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-2 pl-2 cursor-pointer">
            <PenTool className="w-6 h-6 text-slate-900" />
            <span className="font-bold tracking-tight text-lg hidden sm:block">IntelliDraw</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#use-cases" className="hover:text-slate-900 transition-colors">Use Cases</a>
            <a href="#docs" className="hover:text-slate-900 transition-colors">Docs</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>

          {/* CTA */}
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95">
            Get Started Free
          </button>
        </nav>
      </div>

      {/* ========================================
        MAIN HERO SECTION
        ========================================
      */}
      <div className="relative w-full flex flex-col items-center justify-center pt-28 pb-10">
        {/* Animated Dot Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 40% 50% at center, transparent 10%, black 60%)',
            maskImage: 'radial-gradient(ellipse 40% 50% at center, transparent 10%, black 60%)',
          }}
        >
          {/* Base Grid Layer (Normal dots - 1px) */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Wave Grid Layer (Thicker dots - 2px, organically pulsed radially) */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #64748b 2.5px, transparent 2.5px)',
              backgroundSize: '24px 24px',
              WebkitMaskImage: 'radial-gradient(circle, transparent 35%, black 50%, transparent 65%)',
              maskImage: 'radial-gradient(circle, transparent 35%, black 50%, transparent 65%)',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              animation: 'radialPulse 6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite',
            }}
          />
        </div>
        
        <main className="relative z-10 pt-12 pb-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Pill Badge */}
        <div className="animate-fade-in-up flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/50 text-sm font-medium text-slate-600 mb-8 shadow-sm">
          <Network className="w-4 h-4 text-blue-600" />
          <span>Describe it. See it. Ship it.</span>
        </div>

        {/* Hero Headlines */}
        <TypewriterHeadline />

        <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
          Stop dragging boxes around a whiteboard. Describe your system in plain English (or speak it), and watch a precision Mermaid diagram materialize on an infinite canvas.
        </p>

        {/* Hero CTA */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 text-slate-900 font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-sm">
            See a Live Demo →
          </button>
        </div>
        </main>
      </div>

      {/* ========================================
        STATS SECTION
        ========================================
      */}
      <section className="animate-fade-in-up delay-400 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-slate-200">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">∞</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Infinite Canvas</p>
            </div>
            
            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">&lt; 2s</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Avg Generation</p>
            </div>
            
            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">100%</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Mermaid Compatible</p>
            </div>
            
            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">Git</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Version History</p>
            </div>

          </div>
          
          <div className="mt-12 text-center">
             <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Built for engineers, PMs, and teams who think fast</p>
          </div>
        </div>
      </section>

      {/* ========================================
        SECONDARY FEATURE SECTION
        ========================================
      */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.1] mb-6">
            Conversational <br/>
            <span className="text-slate-400">diagramming</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
            Describe your flowchart, architecture, or process in plain language. IntelliDraw's AI agent interprets your intent, generates valid Mermaid syntax, and renders it live on an infinite canvas.
          </p>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2">
            Try it now
          </button>
        </div>
        
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in-up delay-200">
          <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-2xl bg-white rounded-[3rem] border border-slate-200/60 shadow-xl flex items-center justify-center relative overflow-hidden p-1.5 focus-within:ring-4 ring-blue-500/10 transition-all">
             <InteractiveCanvas />
          </div>
        </div>
      </section>

      {/* ========================================
        SKILL MARKETPLACE & TESTIMONIAL SECTION
        ========================================
      */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Copy & Testimonial */}
          <div className="flex-1 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.1] mb-6">
              Teach the AI your style. <br/>
              <span className="text-slate-500">Share it with the world.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-lg">
              Create reusable Skill Notes — structured instructions that shape how the AI generates your diagrams. Publish skills to the Marketplace, install community standards, and enforce consistency across your entire team.
            </p>

            {/* Light-theme adaptation of the dark testimonial card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-snug mb-8">
                "It’s like having a Senior Architect who knows exactly how I like to work. The time saved is just incredible."
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <User className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Alex Rivera</h4>
                  <p className="text-sm text-slate-500">Lead Engineer @ CloudScale</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: UI Mockup / Illustration */}
          <div className="flex-1 w-full animate-fade-in-up delay-200 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-2 relative overflow-hidden">
              {/* Soft background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              
              <div className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Skill Shared!</h3>
                    <p className="text-slate-500 text-sm">Microservices Architecture v2</p>
                  </div>
                </div>

                {/* Abstract Content Lines */}
                <div className="space-y-6 mb-12">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div className={`h-3 rounded-full bg-slate-200 ${i === 1 ? 'w-3/4' : 'w-1/2'}`}></div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-900 font-bold py-4 rounded-xl transition-all hover:shadow-sm">
                  View in Workspace
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================
        FOOTER
        ========================================
      */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Footer Logo & Desc */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <PenTool className="w-7 h-7 text-slate-900" />
                <span className="font-bold tracking-tight text-xl">IntelliDraw</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed pr-4">
                The AI-native diagramming platform for engineers, PMs, and teams who think faster than they can drag-and-drop.
              </p>
            </div>

            {/* Footer Links Container */}
            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Platform</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
                  <li><a href="#use-cases" className="hover:text-slate-900 transition-colors">Use Cases</a></li>
                  <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 IntelliDraw. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
