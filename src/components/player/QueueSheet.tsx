import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { ListMusic, Trash2, Play, Sparkles, X, Shuffle } from 'lucide-react';

export const QueueSheet: React.FC = () => {
  const {
    currentTrack,
    queue,
    removeFromQueue,
    playTrack,
    automix,
    toggleAutomix,
    shuffle,
    toggleShuffle,
    setActiveSheet,
  } = useMusic();

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-zinc-900/95 border-t border-white/15 rounded-t-3xl p-6 text-white max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold tracking-tight">Playing Next & Queue</h3>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Automix & Shuffle Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-transparent border border-pink-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <div>
              <p className="text-xs font-semibold text-white">Automix DJ Transition</p>
              <p className="text-[10px] text-zinc-400">Beat-matching & seamless 4s crossfade</p>
            </div>
          </div>
          <button
            onClick={toggleAutomix}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              automix
                ? 'bg-pink-500 text-white'
                : 'bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            {automix ? 'Active' : 'Off'}
          </button>
        </div>

        {/* Currently Playing Card */}
        <div className="mt-4">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Now Playing
          </span>
          <div className="mt-1 p-2.5 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
            <img
              src={currentTrack.artwork}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {currentTrack.codec}
            </span>
          </div>
        </div>

        {/* Up Next List */}
        <div className="mt-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Up Next ({queue.length})
            </span>
            <button
              onClick={toggleShuffle}
              className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full transition ${
                shuffle ? 'bg-pink-500/20 text-pink-300' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              <span>Shuffle</span>
            </button>
          </div>

          {queue.length === 0 ? (
            <div className="py-10 text-center text-zinc-500 text-xs">
              No tracks in queue. Add songs from your library or discovery.
            </div>
          ) : (
            <div className="space-y-1.5">
              {queue.map((track, idx) => (
                <div
                  key={`${track.id}-${idx}`}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition"
                >
                  <div
                    onClick={() => playTrack(track, queue)}
                    className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={track.artwork}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 truncate">
                      <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition truncate">
                        {track.title}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => playTrack(track, queue)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 opacity-0 group-hover:opacity-100 transition"
                      title="Play now"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => removeFromQueue(idx)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-zinc-500 transition"
                      title="Remove from queue"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveSheet('none')}
          className="mt-5 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.99] text-sm font-semibold transition text-center shrink-0"
        >
          Done
        </button>
      </div>
    </div>
  );
};
