import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function SlideToStart() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setIsUnlocked(false);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    // If dragged far enough to the right
    if (info.offset.x > 100) {
      setIsUnlocked(true);
      // Simulate action
      setTimeout(() => {
        window.location.href = "https://repo-intellidraw.vercel.app/";
        // Reset state so it's reset if the user hits back button on mobile
        setTimeout(() => {
          setIsUnlocked(false);
        }, 600);
      }, 400);
    }
  };

  return (
    <div className="relative w-[160px] sm:w-[180px] h-10 rounded-full bg-slate-900 flex items-center overflow-hidden shadow-inner">
      <motion.p 
        animate={{ opacity: isUnlocked ? 0 : 1 }}
        className="absolute w-full text-center text-xs font-semibold tracking-wide text-slate-300 pointer-events-none pl-8"
      >
        {isUnlocked ? "Let's Go!" : "Slide to start"}
      </motion.p>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: isUnlocked ? 120 : 120 }} // Adjusted for typical mobile sizes
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: isUnlocked ? 120 : 0 }} // w-[160] - w-8 (32px) - margins = ~120
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-8 h-8 ml-1 bg-white rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing z-10"
      >
        <ArrowRight className="w-4 h-4 text-slate-900" />
      </motion.div>
    </div>
  );
}
