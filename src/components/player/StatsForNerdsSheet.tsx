import React, { useEffect, useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Activity, Cpu, CheckCircle2, Zap, X } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

export const StatsForNerdsSheet: React.FC = () => {
  const { stats, currentTrack, setActiveSheet } = useMusic();
  const [visualData, setVisualData] = useState<number[]>(new Array(16).fill(10));

  useEffect(() => {
    const interval = setInterval(() => {
      const raw = audioEngine.getVisualizerData();
      if (raw && raw.length > 0) {
        // Sample down to 16 bars
        const step = Math.floor(raw.length / 16);
        const sampled: number[] = [];
        for (let i = 0; i < 16; i++) {
          sampled.push(raw[i * step] || 0);
        }
        setVisualData(sampled);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-zinc-900/95 border-t border-white/15 rounded-t-3xl p-6 text-white max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Handle & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold tracking-tight">BitChord Stats for Nerds</h3>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Audio Visualizer Canvas/Bars */}
        <div className="my-5 p-4 rounded-2xl bg-black/60 border border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-pink-300">
              <Activity className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              Real-time FFT Frequency Spectrum
            </span>
            <span className="font-mono text-zinc-500">20Hz - 22kHz</span>
          </div>
          <div className="flex items-end justify-between h-16 gap-1 pt-2 px-1">
            {visualData.map((val, idx) => {
              const heightPercent = Math.max(8, (val / 255) * 100);
              return (
                <div key={idx} className="flex-1 bg-zinc-800 rounded-t-sm h-full flex items-end">
                  <div
                    className="w-full rounded-t-sm transition-all duration-75 bg-gradient-to-t from-pink-600 via-rose-500 to-amber-300"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Audio Codec</span>
            <span className="text-white font-mono font-bold text-sm flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {currentTrack.codec} Lossless
            </span>
            <span className="text-[10px] text-zinc-400">Apple Lossless CoreAudio decoder</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Sample Rate</span>
            <span className="text-white font-mono font-bold text-sm text-pink-300">
              {currentTrack.sampleRate}
            </span>
            <span className="text-[10px] text-zinc-400">AudioContext hardware clock</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Bit Depth</span>
            <span className="text-white font-mono font-bold text-sm text-cyan-300">
              {currentTrack.bitDepth}
            </span>
            <span className="text-[10px] text-zinc-400">144 dB dynamic headroom</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Lossless Bitrate</span>
            <span className="text-white font-mono font-bold text-sm text-amber-300">
              {currentTrack.bitrate}
            </span>
            <span className="text-[10px] text-zinc-400">Variable compression ratio</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Buffer Health</span>
            <span className="text-white font-mono font-bold text-sm text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {stats.bufferHealth}% (Optimal)
            </span>
            <span className="text-[10px] text-zinc-400">Ahead of playback cursor</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">Base Latency</span>
            <span className="text-white font-mono font-bold text-sm text-purple-300">
              {stats.latencyMs} ms
            </span>
            <span className="text-[10px] text-zinc-400">Low-latency buffer chunk</span>
          </div>
        </div>

        {/* Detailed Stream Info */}
        <div className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Audio Routing Engine:</span>
            <span className="font-mono text-zinc-200">{stats.sourceEngine}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Audio Output Device:</span>
            <span className="font-mono text-zinc-200">{stats.outputDevice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Peak Signal Amplitude:</span>
            <span className="font-mono text-pink-400">{stats.peakDb} dBFS</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">DSP Filter Nodes:</span>
            <span className="font-mono text-zinc-200">5-Band EQ, BassBoost, SpatialPanner</span>
          </div>
        </div>

        <button
          onClick={() => setActiveSheet('none')}
          className="mt-5 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.99] text-sm font-semibold transition text-center"
        >
          Done
        </button>
      </div>
    </div>
  );
};
