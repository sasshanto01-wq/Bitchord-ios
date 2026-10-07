import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Play, TrendingUp, Radio, Disc } from 'lucide-react';

export const BrowseView: React.FC = () => {
  const { tracks, playTrack } = useMusic();

  const moods = [
    { title: 'Chill & Cozy', color: 'from-amber-600 to-orange-700', genre: 'Lo-Fi Chill' },
    { title: 'Spatial Audio', color: 'from-blue-600 to-indigo-800', genre: 'Synthwave' },
    { title: 'Midnight Drive', color: 'from-purple-700 to-pink-800', genre: 'Cyberpunk' },
    { title: 'Deep Focus', color: 'from-emerald-700 to-teal-800', genre: 'Classical Hi-Res' },
    { title: 'R&B Warmth', color: 'from-rose-600 to-red-800', genre: 'R&B / Soul' },
    { title: 'Club Automix', color: 'from-fuchsia-600 to-violet-800', genre: 'Melodic Techno' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar pb-32">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Browse
        </h1>
        <p className="text-xs text-zinc-400">Discover new lossless releases and global charts</p>
      </div>

      {/* Hero New Release Banner */}
      <div
        onClick={() => playTrack(tracks[2], tracks)}
        className="relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/10 group active:scale-[0.98] transition"
      >
        <div className="aspect-[16/9] w-full">
          <img
            src={tracks[2].artwork}
            alt={tracks[2].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-[10px] font-bold text-pink-400 tracking-wider uppercase">
            New Apple Digital Master
          </span>
          <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
            {tracks[2].title}
          </h3>
          <p className="text-xs text-zinc-300">{tracks[2].artist}</p>
        </div>
      </div>

      {/* Global Charts: Top Tracks */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp className="w-4 h-4 text-pink-400" />
          <h2 className="text-base font-bold text-white tracking-tight">Top 100 Global Charts</h2>
        </div>

        <div className="space-y-1.5">
          {tracks.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, tracks)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition group"
            >
              {/* Ranking Number */}
              <span className="w-5 text-center font-bold text-sm text-zinc-500 group-hover:text-white">
                {idx + 1}
              </span>

              <img
                src={track.artwork}
                alt={track.title}
                className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0"
              />

              <div className="flex-1 truncate">
                <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition truncate">
                  {track.title}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                  <span className="truncate">{track.artist}</span>
                  <span>•</span>
                  <span className="text-[9px] font-bold text-pink-300">{track.codec}</span>
                </div>
              </div>

              <span className="text-[11px] text-zinc-500 font-mono pr-1">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Mood & Genre */}
      <div>
        <h2 className="text-base font-bold text-white tracking-tight mb-3">
          Moods & Activities
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {moods.map((m) => {
            const matchingTrack = tracks.find((t) => t.genre === m.genre) || tracks[0];
            return (
              <div
                key={m.title}
                onClick={() => playTrack(matchingTrack, tracks)}
                className={`relative h-20 rounded-2xl p-3 bg-gradient-to-br ${m.color} flex flex-col justify-between cursor-pointer shadow-md hover:brightness-110 active:scale-95 transition overflow-hidden`}
              >
                <span className="text-xs font-bold text-white drop-shadow-sm">{m.title}</span>
                <span className="text-[9px] text-white/80 font-medium">{m.genre}</span>
                <Disc className="absolute -bottom-2 -right-2 w-12 h-12 text-white/10" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
