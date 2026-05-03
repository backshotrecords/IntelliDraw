import React from 'react';
import { Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Footer Logo & Desc */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/favicon.svg" alt="IntelliDraw" className="w-7 h-7" />
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
                <li><Link to="/#features" className="hover:text-slate-900 transition-colors">Features</Link></li>
                <li><Link to="/#use-cases" className="hover:text-slate-900 transition-colors">Use Cases</Link></li>
                <li><Link to="/#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
                <li><Link to="/research" className="hover:text-slate-900 transition-colors">Research</Link></li>
                <li><Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link></li>
                <li><Link to="/cookies" className="hover:text-slate-900 transition-colors">Cookies</Link></li>
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
            <a href="https://x.com/erinski_easy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://chat.whatsapp.com/Jr1BYruwnVbKxv8iwJ6aQo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a href="https://www.linkedin.com/in/erinskieasy/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Linkedin className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
