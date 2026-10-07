import React, { useEffect, useRef } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Sparkles, Languages } from 'lucide-react';

export const LyricsView: React.FC = () => {
  const { currentTrack, currentTime, seek } = useMusic();
  const activeLyricRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Find active line index
  const activeIndex = currentTrack.lyrics.reduce((acc, lyric, index) => {
    if (currentTime >= lyric.time) {
      return index;
    }
    return acc;
  }, 0);

  // Auto-scroll active lyric into center smoothly
  useEffect(() => {
    if (activeLyricRef.current && containerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto px-6 py-12 flex flex-col space-y-7 no-scrollbar select-none"
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-zinc-400 text-xs">
        <div className="flex items-center gap-1.5 text-pink-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apple Time-Synced Lyrics</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-400">
          <Languages className="w-3.5 h-3.5" />
          <span>Vocal Synced</span>
        </div>
      </div>

      {currentTrack.lyrics.map((lyric, idx) => {
        const isActive = idx === activeIndex;
        const isPast = idx < activeIndex;

        return (
          <div
            key={idx}
            ref={isActive ? activeLyricRef : null}
            onClick={() => seek(lyric.time)}
            className={`cursor-pointer transition-all duration-300 transform origin-left group py-2 ${
              isActive
                ? 'scale-105 opacity-100 font-bold'
                : isPast
                ? 'opacity-40 hover:opacity-75 font-semibold'
                : 'opacity-35 hover:opacity-65 font-semibold'
            }`}
          >
            <p
              className={`text-2xl sm:text-3xl tracking-tight transition-all duration-300 leading-snug ${
                isActive
                  ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]'
                  : 'text-zinc-400 group-hover:text-zinc-200'
              }`}
            >
              {lyric.text}
            </p>

            {lyric.translation && (
              <p
                className={`text-sm tracking-normal mt-1 transition-opacity ${
                  isActive ? 'text-pink-300 opacity-90' : 'text-zinc-500 opacity-60'
                }`}
              >
                {lyric.translation}
              </p>
            )}
          </div>
        );
      })}

      <div className="pt-12 text-center text-xs text-zinc-500">
        <p>Lyrics provided by BitChord Lyric Engine</p>
        <p className="mt-1">Tap any lyric line to jump</p>
      </div>
    </div>
  );
};
