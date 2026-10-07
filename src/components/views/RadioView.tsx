import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { RADIO_STATIONS } from '../../data/musicCatalog';
import { Radio as RadioIcon, Play, Users, Wifi } from 'lucide-react';

export const RadioView: React.FC = () => {
  const { playTrack, tracks } = useMusic();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar pb-32">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Radio
        </h1>
        <p className="text-xs text-zinc-400">Live 24/7 lossless broadcasts from global studios</p>
      </div>

      {/* Hero Radio Station */}
      <div
        onClick={() => playTrack(tracks[0], tracks)}
        className="group relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/10 active:scale-[0.98] transition"
      >
        <div className="aspect-[16/9] w-full">
          <img
            src={RADIO_STATIONS[0].artwork}
            alt={RADIO_STATIONS[0].name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Live Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Live Broadcast</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">
              {RADIO_STATIONS[0].name}
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">{RADIO_STATIONS[0].tagline}</p>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Users className="w-3 h-3" />
                {RADIO_STATIONS[0].listeners}
              </span>
              <span>•</span>
              <span>Hosted by {RADIO_STATIONS[0].host}</span>
            </div>
          </div>

          <button
            className="w-11 h-11 rounded-full bg-[#fa2d48] text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition"
            aria-label="Tune into BitChord 1"
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Featured Stations Shelf */}
      <div>
        <h2 className="text-base font-bold text-white tracking-tight mb-3">
          Curated Radio Streams
        </h2>

        <div className="space-y-3">
          {RADIO_STATIONS.map((station, idx) => (
            <div
              key={station.id}
              onClick={() => playTrack(tracks[idx % tracks.length], tracks)}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-md">
                  <img
                    src={station.artwork}
                    alt={station.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/70 text-[8px] font-mono text-pink-300">
                    LIVE
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition">
                    {station.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{station.tagline}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{station.listeners}</p>
                </div>
              </div>

              <button
                className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#fa2d48] text-zinc-300 group-hover:text-white flex items-center justify-center transition"
                aria-label="Tune in"
              >
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
