import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Play, Sparkles, Zap, Flame, Compass } from 'lucide-react';
import { Track } from '../../types/music';

export const ListenNowView: React.FC = () => {
  const { tracks, playTrack, currentTrack, isPlaying, playlists, setActiveTab } = useMusic();

  const heroTrack = tracks[0];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar pb-32">
      {/* iOS Apple Music Large Title */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Listen Now
          </h1>
          <p className="text-xs text-zinc-400">Curated for your Hi-Res soundscape</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BitChord 2026</span>
        </div>
      </div>

      {/* Featured Lossless Hero Card */}
      <div
        onClick={() => playTrack(heroTrack, tracks)}
        className="group relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 transition-all active:scale-[0.98]"
      >
        <div className="aspect-[16/10] w-full overflow-hidden relative">
          <img
            src={heroTrack.artwork}
            alt={heroTrack.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4.5 flex items-end justify-between">
          <div className="max-w-[75%]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-pink-400 block mb-1">
              Featured • {heroTrack.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
              {heroTrack.title}
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">{heroTrack.artist}</p>
          </div>

          <button
            className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition"
            aria-label="Play featured track"
          >
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Heavy Rotation Horizontal Shelf */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Heavy Rotation</h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="text-xs text-[#fa2d48] font-semibold hover:underline"
          >
            See All
          </button>
        </div>

        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
          {tracks.slice(1, 5).map((track) => {
            const isCurrent = currentTrack.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, tracks)}
                className="group shrink-0 w-36 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-white/5 mb-2">
                  <img
                    src={track.artwork}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[8px] font-bold text-zinc-200">
                    {track.codec}
                  </div>
                  {isCurrent && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex items-end gap-1 h-4">
                        <span className="w-1 bg-pink-400 rounded-full animate-bounce h-4" />
                        <span className="w-1 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s] h-3" />
                        <span className="w-1 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s] h-5" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-white truncate">{track.title}</p>
                <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spatial Audio & Lossless Showcase */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Spatial Audio & Hi-Res
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold text-zinc-500">24-Bit / 96kHz</span>
        </div>

        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, tracks)}
              className="flex items-center justify-between p-2 rounded-2xl hover:bg-white/5 cursor-pointer transition active:scale-[0.99] group border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-md"
                />
                <div className="truncate">
                  <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition truncate">
                    {track.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-zinc-400 truncate">{track.artist}</span>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-white/10 text-pink-300 font-bold uppercase">
                      {track.badge}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-pink-500 text-zinc-400 group-hover:text-white flex items-center justify-center transition shrink-0"
                aria-label="Play track"
              >
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Editorial Playlists */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white tracking-tight">Curated Playlists</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                const first = tracks.find((t) => t.id === pl.tracks[0]) || tracks[0];
                playTrack(first, tracks);
              }}
              className="group cursor-pointer rounded-2xl p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 transition active:scale-95"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden mb-2 shadow-md">
                <img
                  src={pl.coverImage}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-xs font-bold text-white truncate">{pl.title}</h4>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">{pl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
