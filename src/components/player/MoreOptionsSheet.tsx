import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Gauge, Moon, VolumeX, Shuffle, X, Download, Radio, Check } from 'lucide-react';

export const MoreOptionsSheet: React.FC = () => {
  const {
    playbackSpeed,
    setPlaybackSpeed,
    skipSilence,
    toggleSkipSilence,
    crossfade,
    setCrossfade,
    sleepTimer,
    setSleepTimerMode,
    currentTrack,
    setActiveSheet,
  } = useMusic();

  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const timerOptions = [
    { label: 'Off', mode: 'off' },
    { label: '15 min', mode: '15m' },
    { label: '30 min', mode: '30m' },
    { label: '45 min', mode: '45m' },
    { label: '1 hour', mode: '60m' },
    { label: 'End of Track', mode: 'end_of_track' },
  ] as const;

  const formatTimerCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-zinc-900/95 border-t border-white/15 rounded-t-3xl p-6 text-white max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold tracking-tight">Audio & Playback Settings</h3>
          <button
            onClick={() => setActiveSheet('none')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Playback Speed */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-pink-400" />
              Playback Speed Control
            </span>
            <span className="font-mono text-pink-300 text-xs font-bold">{playbackSpeed}x</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`py-2 rounded-xl text-xs font-semibold transition ${
                  playbackSpeed === s
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Timer */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              <Moon className="w-4 h-4 text-purple-400" />
              Sleep Timer
            </span>
            {sleepTimer.active && (
              <span className="font-mono text-emerald-400 text-xs font-bold animate-pulse">
                {formatTimerCountdown(sleepTimer.remainingSeconds)} remaining
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timerOptions.map((opt) => {
              const isSelected = sleepTimer.mode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  onClick={() => setSleepTimerMode(opt.mode)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium transition text-center truncate ${
                    isSelected
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skip Silence */}
        <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${skipSilence ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
              <VolumeX className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Skip Audio Silence</p>
              <p className="text-xs text-zinc-400">Automatically bypass dead air below -50dB</p>
            </div>
          </div>
          <button
            onClick={toggleSkipSilence}
            className={`w-12 h-6.5 rounded-full transition-colors relative flex items-center px-0.5 ${
              skipSilence ? 'bg-amber-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`w-5.5 h-5.5 rounded-full bg-white transition-transform ${
                skipSilence ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Crossfade Duration */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-zinc-200 font-medium">
              <Shuffle className="w-4 h-4 text-pink-400" />
              Gapless Crossfade Length
            </span>
            <span className="font-mono text-pink-300 font-bold">{crossfade}s</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={crossfade}
            onChange={(e) => setCrossfade(parseInt(e.target.value, 10))}
            className="w-full h-2 accent-pink-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>0s (Gapless)</span>
            <span>6s (Smooth)</span>
            <span>12s (Club Mix)</span>
          </div>
        </div>

        {/* Scrobbling & Integrations */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Last.fm & Discord Rich Presence</p>
              <p className="text-zinc-400 text-[11px]">Synced scrobbling enabled for this session</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            Connected
          </span>
        </div>

        {/* Direct Download & Install for iOS */}
        <div
          onClick={() => {
            setActiveSheet('none');
            // Open download modal
            window.dispatchEvent(new CustomEvent('open-bitchord-download'));
          }}
          className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent border border-pink-500/30 flex items-center justify-between text-xs cursor-pointer hover:bg-pink-500/30 active:scale-[0.98] transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Direct Download & Install on iOS</p>
              <p className="text-pink-300 text-[11px]">1-Tap Safari WebClip, Apple Profile, or GitHub</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white">
            Get iOS App
          </span>
        </div>

        <button
          onClick={() => setActiveSheet('none')}
          className="mt-6 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.99] text-sm font-semibold transition text-center"
        >
          Done
        </button>
      </div>
    </div>
  );
};
