import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';

interface GlassAudioPlayerProps {
  src: string;
}

const GlassAudioPlayer: React.FC<GlassAudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize Web Audio API on first user interaction
  const initAudio = () => {
    if (!audioContextRef.current && audioRef.current) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64; // Gives us 32 distinct frequency bins for a simple look
        
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (err) {
        console.warn("Web Audio API not supported or CORS blocked visualizer:", err);
      }
    }
  };

  const drawVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const analyser = analyserRef.current;
    
    // Ensure canvas internal resolution matches its display size
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barWidth = width / bufferLength;
    const centerY = height / 2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      // Normalize value and dampen slightly to keep it within the container neatly
      const barHeight = (dataArray[i] / 255) * (height / 2) * 0.7; 
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      
      // Draw centered, rounded bars (mirrored top and bottom)
      const radius = Math.min((barWidth - 1) / 2, barHeight);
      ctx.beginPath();
      ctx.roundRect(x, centerY - barHeight, barWidth - 1.5, Math.max(barHeight * 2, 2), radius);
      ctx.fill();

      x += barWidth;
    }

    animationRef.current = requestAnimationFrame(drawVisualizer);
  };

  useEffect(() => {
    if (isPlaying) {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      drawVisualizer();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      initAudio(); // Required: Initialize context on user gesture
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (Number(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      audioRef.current.muted = newMuted;
      // If unmuting while volume is 0, bump it to 50%
      if (!newMuted && volume === 0) {
        setVolume(0.5);
        audioRef.current.volume = 0.5;
      }
    }
  };

  // Cleanup event listeners on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.volume = volume;
      audioEl.muted = isMuted;
      const handleEnded = () => setIsPlaying(false);
      audioEl.addEventListener('ended', handleEnded);
      return () => {
        audioEl.removeEventListener('ended', handleEnded);
      };
    }
  }, [volume, isMuted]);

  return (
    <div className="relative z-10 w-full max-w-2xl">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      {/* Glassmorphic Pill Container */}
      <div 
        className="flex items-center gap-2 sm:gap-3 p-2 pr-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-black shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] text-white transition-all duration-300 hover:bg-slate-900/90"
      >
        {/* Playback Controls Group */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} className="fill-current" />
            ) : (
              <Play size={18} className="fill-current ml-0.5" />
            )}
          </button>

          {/* Skip Back 10s */}
          <button
            onClick={skipBackward}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
            aria-label="Skip Back 10 seconds"
          >
            <RotateCcw size={16} />
          </button>

          {/* Skip Forward 10s */}
          <button
            onClick={skipForward}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
            aria-label="Skip Forward 10 seconds"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Progress Bar & Timeline */}
        <div className="flex-1 flex items-center gap-3 ml-2">
          
          {/* Custom iOS-inspired Slider with integrated Visualizer */}
          <div className="relative w-full h-10 flex items-center group">
            
            {/* Audio Waveform Canvas */}
            <canvas 
              ref={canvasRef} 
              className="absolute w-full h-full pointer-events-none opacity-80"
            />

            {/* Visual Background Track */}
            <div className="absolute w-full h-1 bg-white/20 rounded-full overflow-hidden">
              {/* Visual Fill Track */}
              <div 
                className="h-full bg-white rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Invisible native range input for functionality */}
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent}
              onChange={handleSeek}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />

            {/* Custom Thumb (appears on hover, just like iOS) */}
            <div 
              className="absolute h-3 w-3 bg-white rounded-full shadow-lg pointer-events-none transition-transform duration-200 scale-0 group-hover:scale-100"
              style={{ left: `calc(${progressPercent}% - 6px)` }}
            />
          </div>

          {/* Time Display */}
          <div className="text-xs font-medium tracking-wide opacity-90 w-10 text-right font-mono">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/20">
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Small Volume Slider (Hidden on extra small screens) */}
          <div className="relative w-16 h-6 items-center group hidden sm:flex">
            <div className="absolute w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute h-3 w-3 bg-white rounded-full shadow-md pointer-events-none transition-transform duration-200 scale-0 group-hover:scale-100"
              style={{ left: `calc(${isMuted ? 0 : volume * 100}% - 6px)` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlassAudioPlayer;
