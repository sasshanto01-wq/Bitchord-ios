import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

export const MiniPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, setIsNowPlayingOpen, currentTime, duration } = useMusic();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative px-3 pb-2 z-20">
      <div
        onClick={() => setIsNowPlayingOpen(true)}
        className="group relative flex items-center justify-between p-2 rounded-2xl ios-glass bg-zinc-900/80 border border-white/10 shadow-xl cursor-pointer hover:bg-zinc-800/80 transition-all select-none overflow-hidden"
      >
        {/* Progress indicator bar on the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Left: Artwork and Track Meta */}
        <div className="flex items-center gap-3 overflow-hidden pr-2">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 shadow-md">
            <img
              src={currentTrack.artwork}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              </div>
            )}
          </div>

          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white truncate tracking-tight">
                {currentTrack.title}
              </span>
              <span className="shrink-0 text-[8px] font-bold px-1 py-0.5 rounded bg-white/10 text-pink-300 uppercase tracking-wider">
                {currentTrack.codec}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 truncate">
              {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
