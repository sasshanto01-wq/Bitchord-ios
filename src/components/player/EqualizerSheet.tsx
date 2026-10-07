import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Sliders, Volume2, Waves, X, Check } from 'lucide-react';

export const EqualizerSheet: React.FC = () => {
  const { equalizer, setEqualizer, applyEqPreset, setActiveSheet } = useMusic();

  const presets = [
    'BitChord Dynamic',
    'Bass Booster',
    'Vocal Booster',
    'Electronic',
    'Acoustic',
    'Hip-Hop',
    'Pop',
    'Flat',
  ];

  const handleBandChange = (band: keyof typeof equalizer.bands, val: number) => {
    setEqualizer((prev) => ({
      ...prev,
      bands: {
        ...prev.bands,
        [band]: val,
      },
      preset: 'Custom',
    }));
  };

  const handleBassBoost = (val: number) => {
    setEqualizer((prev) => ({
      ...prev,
      bassBoost: val,
    }));
  };

  const toggleSpatial = () => {
    setEqualizer((prev) => ({
      ...prev,
      spatialAudio: !prev.spatialAudio,
    }));
  };

  const toggleEqEnabled = () => {
    setEqualizer((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-zinc-900/95 border-t border-white/15 rounded-t-3xl p-6 text-white max-h-[88vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold tracking-tight">System Equalizer & Audio FX</h3>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master EQ toggle */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${equalizer.enabled ? 'bg-pink-500/20 text-pink-400' : 'bg-zinc-800 text-zinc-500'}`}>
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Equalizer Processing</p>
              <p className="text-xs text-zinc-400">Hardware 5-band biquad DSP</p>
            </div>
          </div>
          <button
            onClick={toggleEqEnabled}
            className={`w-12 h-6.5 rounded-full transition-colors relative flex items-center px-0.5 ${
              equalizer.enabled ? 'bg-pink-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`w-5.5 h-5.5 rounded-full bg-white transition-transform ${
                equalizer.enabled ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Presets Horizontal Scroll */}
        <div className="mt-4">
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
            Acoustic Presets
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {presets.map((preset) => {
              const isSelected = equalizer.preset === preset;
              return (
                <button
                  key={preset}
                  onClick={() => applyEqPreset(preset)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Band Vertical EQ Sliders */}
        <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-white/10">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-4 px-2">
            <span>+12 dB</span>
            <span>0 dB (Flat)</span>
            <span>-12 dB</span>
          </div>

          <div className="flex items-center justify-between gap-3 h-44 px-3">
            {[
              { label: '60 Hz', key: 'low', value: equalizer.bands.low },
              { label: '250 Hz', key: 'lowMid', value: equalizer.bands.lowMid },
              { label: '1 kHz', key: 'mid', value: equalizer.bands.mid },
              { label: '4 kHz', key: 'highMid', value: equalizer.bands.highMid },
              { label: '12 kHz', key: 'high', value: equalizer.bands.high },
            ].map((band) => (
              <div key={band.key} className="flex flex-col items-center h-full justify-between flex-1">
                <span className="text-[10px] text-zinc-400 font-mono font-medium">
                  {band.value > 0 ? `+${band.value.toFixed(1)}` : band.value.toFixed(1)}
                </span>
                <div className="relative flex items-center justify-center h-28 w-8">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    disabled={!equalizer.enabled}
                    value={band.value}
                    onChange={(e) => handleBandChange(band.key as any, parseFloat(e.target.value))}
                    className="w-28 -rotate-90 origin-center accent-pink-500"
                  />
                </div>
                <span className="text-[10px] text-zinc-300 font-semibold">{band.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bass Boost & Spatial Audio */}
        <div className="mt-4 space-y-3">
          {/* Bass Boost */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-zinc-200 font-medium">
                <Volume2 className="w-4 h-4 text-pink-400" />
                Sub-Bass Resonance Boost
              </span>
              <span className="font-mono text-pink-300 font-bold">{equalizer.bassBoost}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={equalizer.bassBoost}
              onChange={(e) => handleBassBoost(parseInt(e.target.value, 10))}
              className="w-full h-2 accent-pink-500"
            />
          </div>

          {/* Spatial Audio */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${equalizer.spatialAudio ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}>
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Spatial Audio (Binaural Expansion)</p>
                <p className="text-xs text-zinc-400">Dolby Atmos binaural stereo widening</p>
              </div>
            </div>
            <button
              onClick={toggleSpatial}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                equalizer.spatialAudio ? 'bg-cyan-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full bg-white transition-transform ${
                  equalizer.spatialAudio ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={() => setActiveSheet('none')}
          className="mt-5 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.99] text-sm font-semibold transition text-center"
        >
          Apply & Done
        </button>
      </div>
    </div>
  );
};
