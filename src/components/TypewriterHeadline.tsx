import React, { useState, useEffect } from 'react';

// ========================================
// Add or modify your phrases here!
// ========================================
const PHRASES = [
  "Natural Language to Production-Ready Diagrams",
  "An app for Over-Thinkers",
  "An app for Planning Committees"
];

export default function TypewriterHeadline() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'Typing' | 'Deleting'>('Typing');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = PHRASES[phraseIndex];

    if (phase === 'Typing') {
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 60); // Speed of typing each character
      } else {
        timeout = setTimeout(() => setPhase('Deleting'), 2500); // How long it stays fully typed before deleting
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, 30); // Speed of deleting each character
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setPhase('Typing');
        }, 400); // Pause before typing the next phrase
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIndex]);

  return (
    <div className="animate-fade-in-up delay-100 mb-6 flex flex-col justify-center items-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[260px] w-full">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 leading-[1.1] max-w-4xl mx-auto">
        {text}
        <span 
          className="inline-block w-[4px] md:w-[6px] bg-blue-600 ml-2 animate-cursor-blink align-middle"
          style={{ 
            height: '0.85em', 
            marginBottom: '0.05em'
          }} 
        />
      </h1>
    </div>
  );
}
