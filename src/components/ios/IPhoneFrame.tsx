import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Smartphone, Maximize2, Music } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  const { viewMode, setViewMode, isPlaying, currentTrack, setIsNowPlayingOpen } = useMusic();
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or 24-hour style
      const formatted = `${hours % 12 || 12}:${minutes}`;
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (viewMode === 'fullscreen') {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col relative select-none">
        {/* Floating toggle for view mode */}
        <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setViewMode('iphone')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-xs text-zinc-300 hover:text-white transition shadow-lg"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-400" />
            <span>iPhone Frame Mode</span>
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center select-none">
      {/* Top Controls bar outside the iPhone */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>BitChord for iOS</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300 font-medium">iPhone 16 Pro Simulator</span>
        </div>

        <button
          onClick={() => setViewMode('fullscreen')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-zinc-200 transition"
          title="Switch to Fullscreen / Mobile Responsive view"
        >
          <Maximize2 className="w-3 h-3 text-pink-400" />
          <span>Full Screen</span>
        </button>
      </div>

      {/* iPhone 16 Pro Frame */}
      <div className="relative w-full max-w-[400px] h-[844px] rounded-[54px] bg-black p-[11px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15),0_0_40px_rgba(244,63,94,0.1)] border-[4px] border-zinc-800 flex flex-col overflow-hidden">
        
        {/* Dynamic Island & Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 pt-3 px-7 flex items-center justify-between text-white pointer-events-auto">
          {/* Status bar time */}
          <span className="text-xs font-semibold tracking-tight w-12">{time}</span>

          {/* Dynamic Island */}
          <div
            onClick={() => setIsNowPlayingOpen(true)}
            className={`group cursor-pointer transition-all duration-300 ease-out bg-black rounded-full border border-white/10 shadow-md flex items-center justify-between px-3 ${
              isPlaying ? 'w-[190px] h-[34px]' : 'w-[124px] h-[30px]'
            }`}
          >
            {isPlaying ? (
              <>
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    className="w-5 h-5 rounded-full object-cover animate-spin [animation-duration:8s]"
                  />
                  <span className="text-[10px] font-medium text-pink-400 truncate max-w-[80px]">
                    {currentTrack.title}
                  </span>
                </div>
                {/* Mini audio wave */}
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2.5px] bg-pink-500 rounded-full animate-bounce [animation-duration:0.6s] h-3" />
                  <span className="w-[2.5px] bg-pink-400 rounded-full animate-bounce [animation-duration:0.8s] h-2" />
                  <span className="w-[2.5px] bg-pink-500 rounded-full animate-bounce [animation-duration:0.5s] h-3.5" />
                </div>
              </>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 text-zinc-500">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <Music className="w-2.5 h-2.5 text-zinc-500" />
              </div>
            )}
          </div>

          {/* Status bar icons: Cellular, Wi-Fi, Battery */}
          <div className="flex items-center gap-1.5 w-12 justify-end text-zinc-300">
            <span className="flex items-end gap-[1.5px] h-2.5">
              <span className="w-[2px] h-1 bg-white rounded-xs" />
              <span className="w-[2px] h-1.5 bg-white rounded-xs" />
              <span className="w-[2px] h-2 bg-white rounded-xs" />
              <span className="w-[2px] h-2.5 bg-white rounded-xs" />
            </span>
            <Wifi className="w-3 h-3 text-white" />
            <div className="flex items-center">
              <div className="w-5 h-2.5 rounded-[4px] border border-white/80 p-[1px] flex items-center">
                <div className="h-full bg-white rounded-[2px] w-[85%]" />
              </div>
              <div className="w-[1.5px] h-1 bg-white/80 rounded-r-xs" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-zinc-950 flex flex-col pt-10">
          {children}

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/40 rounded-full z-50 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
