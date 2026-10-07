import React, { useRef } from 'react';
import { useMusic } from '../../context/MusicContext';
import {
  Heart,
  ListMusic,
  FolderUp,
  DownloadCloud,
  Mic2,
  Disc,
  Play,
  Sparkles,
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const {
    tracks,
    playlists,
    favoriteIds,
    playTrack,
    importLocalTrack,
    setActiveTab,
  } = useMusic();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const favoriteTracks = tracks.filter((t) => favoriteIds.has(t.id));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      importLocalTrack(files[0]);
    }
  };

  const menuItems = [
    { label: 'Playlists', count: playlists.length, icon: ListMusic, action: () => {} },
    {
      label: 'Liked Songs',
      count: favoriteTracks.length,
      icon: Heart,
      action: () => {
        if (favoriteTracks.length > 0) playTrack(favoriteTracks[0], favoriteTracks);
      },
    },
    { label: 'Downloaded Offline', count: tracks.length, icon: DownloadCloud, action: () => {} },
    { label: 'Artists', count: 6, icon: Mic2, action: () => {} },
    { label: 'Albums', count: 5, icon: Disc, action: () => {} },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar pb-32">
      {/* Title & Import Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Library
          </h1>
          <p className="text-xs text-zinc-400">Your curated Hi-Res lossless collection</p>
        </div>

        {/* Local Music File Import (BitChord feature) */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.flac,.wav,.m4a,.aac"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 text-xs font-semibold transition active:scale-95 shadow-md"
            title="Import FLAC, MP3, or WAV audio files from this device"
          >
            <FolderUp className="w-3.5 h-3.5 text-pink-400" />
            <span>Import Audio</span>
          </button>
        </div>
      </div>

      {/* Library Categories Menu */}
      <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              onClick={item.action}
              className="flex items-center justify-between p-3.5 hover:bg-white/5 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#fa2d48]" />
                <span className="text-sm font-semibold text-white">{item.label}</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{item.count}</span>
            </div>
          );
        })}
      </div>

      {/* Liked Songs Quick Shelf */}
      {favoriteTracks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-[#fa2d48] text-[#fa2d48]" />
              <h2 className="text-base font-bold text-white tracking-tight">Favorite Tracks</h2>
            </div>
            <button
              onClick={() => playTrack(favoriteTracks[0], favoriteTracks)}
              className="text-xs text-[#fa2d48] font-semibold hover:underline"
            >
              Play All
            </button>
          </div>

          <div className="space-y-2">
            {favoriteTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track, favoriteTracks)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={track.artwork}
                    alt={track.title}
                    className="w-10 h-10 rounded-lg object-cover shadow-sm shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition truncate">
                      {track.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-pink-300">
                    {track.codec}
                  </span>
                  <button
                    className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#fa2d48] text-zinc-400 group-hover:text-white flex items-center justify-center transition"
                    aria-label="Play favorite"
                  >
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Added Section */}
      <div>
        <h2 className="text-base font-bold text-white tracking-tight mb-3">Recently Added</h2>
        <div className="grid grid-cols-2 gap-3">
          {tracks.slice(0, 4).map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, tracks)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition group"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden mb-2 relative">
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-1.5 left-1.5 px-1 py-0.2 rounded bg-black/60 text-[8px] font-bold text-pink-300">
                  {track.badge}
                </div>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{track.title}</h4>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">{track.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
