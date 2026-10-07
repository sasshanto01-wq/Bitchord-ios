import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Search as SearchIcon, X, Play, Plus, Sparkles } from 'lucide-react';

export const SearchView: React.FC = () => {
  const { tracks, playTrack, searchQuery, setSearchQuery, addToQueue } = useMusic();

  const filteredTracks = tracks.filter((t) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(query) ||
      t.artist.toLowerCase().includes(query) ||
      t.album.toLowerCase().includes(query) ||
      t.genre.toLowerCase().includes(query) ||
      t.lyrics.some((l) => l.text.toLowerCase().includes(query))
    );
  });

  const genres = [
    { name: 'Synthwave', color: 'from-pink-600 to-rose-700' },
    { name: 'Spatial Audio', color: 'from-blue-600 to-indigo-700' },
    { name: 'Classical Hi-Res', color: 'from-teal-600 to-emerald-700' },
    { name: 'R&B / Soul', color: 'from-amber-600 to-orange-700' },
    { name: 'Cyberpunk', color: 'from-purple-600 to-violet-800' },
    { name: 'Lo-Fi Chill', color: 'from-stone-600 to-stone-800' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 no-scrollbar pb-32">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Search
        </h1>
        <p className="text-xs text-zinc-400">Search songs, artists, lyrics, or Hi-Res masters</p>
      </div>

      {/* iOS Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Artists, Songs, Lyrics, and more"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#fa2d48]/50 focus:bg-white/15 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white text-xs"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Quick genre filter pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {genres.map((g) => (
          <button
            key={g.name}
            onClick={() => setSearchQuery(g.name)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 whitespace-nowrap transition active:scale-95"
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Results or Categories */}
      {searchQuery ? (
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
            <span>{filteredTracks.length} Results for &quot;{searchQuery}&quot;</span>
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
              Lossless Engine
            </span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              No matching tracks found in the local or streaming catalog.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition group"
                >
                  <div
                    onClick={() => playTrack(track, filteredTracks)}
                    className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={track.artwork}
                      alt={track.title}
                      className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition truncate">
                        {track.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                        <span className="truncate">{track.artist}</span>
                        <span>•</span>
                        <span className="text-[9px] font-bold text-pink-300">{track.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addToQueue(track)}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition"
                      title="Add to queue"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => playTrack(track, filteredTracks)}
                      className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#fa2d48] flex items-center justify-center text-zinc-300 group-hover:text-white transition"
                      title="Play"
                    >
                      <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-base font-bold text-white tracking-tight mb-3">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {genres.map((g) => (
              <div
                key={g.name}
                onClick={() => setSearchQuery(g.name)}
                className={`h-24 rounded-2xl p-3.5 bg-gradient-to-br ${g.color} flex flex-col justify-between cursor-pointer shadow-md hover:brightness-110 active:scale-95 transition`}
              >
                <span className="text-sm font-bold text-white leading-snug">{g.name}</span>
                <span className="text-[10px] text-white/80 font-medium">Explore &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
