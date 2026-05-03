import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface GenericPageProps {
  title: string;
}

export default function GenericPage({ title }: GenericPageProps) {
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
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">{title}</h1>
          <div className="prose prose-slate prose-lg">
            <p>
              This is a placeholder page for <strong>{title}</strong>. While IntelliDraw is focused on reinventing the way diagrams are made with AI, we ensure to follow standard compliance processes.
            </p>
            <p>
              Information regarding our {title.toLowerCase()} policies and more will be fully available in this section. In the meantime, start diagramming with our app!
            </p>
            <div className="mt-8">
              <Link to="/" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                Go to the App
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Basic Footer for subpages */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          © 2026 IntelliDraw. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
