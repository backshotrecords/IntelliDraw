import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Hexagon, FileText, DollarSign } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const menuItems = [
    { id: 'features', label: 'Features', icon: Network, node: '01' },
    { id: 'use-cases', label: 'Use Cases', icon: Hexagon, node: '02' },
    { id: 'docs', label: 'Docs', icon: FileText, node: '03' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, node: '04' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-6 md:hidden origin-top z-50 pointer-events-auto"
        >
          {/* Header/Title for the menu to make it look like an inspector panel */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></div>
            <span className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase">System_Navigation</span>
          </div>

          <div className="relative pl-6">
            {/* The main vertical connecting trunk */}
            <div className="absolute left-[11px] top-6 bottom-8 w-[2px] bg-slate-200 rounded-full"></div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                    className="relative block group"
                  >
                    {/* The node dot on the trunk */}
                    <div className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-slate-800 transition-colors z-10"></div>
                    
                    {/* Horizontal connector branch */}
                    <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-slate-200 group-hover:bg-slate-800 transition-colors"></div>

                    {/* The Card */}
                    <div className="bg-slate-50 border border-slate-100 group-hover:border-slate-300 group-hover:bg-white rounded-2xl p-4 transition-all flex items-center gap-4 shadow-sm group-hover:shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-slate-900 transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                          Node_{item.node}
                        </div>
                        <div className="font-bold text-slate-900">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
