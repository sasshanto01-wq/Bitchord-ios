import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Cast, Headphones, Speaker, Tv, Laptop, Check, X } from 'lucide-react';

export const AirPlaySheet: React.FC = () => {
  const { selectedAirPlayDevice, setSelectedAirPlayDevice, setActiveSheet } = useMusic();

  const devices = [
    {
      id: 'airpods',
      name: 'AirPods Pro (2nd gen)',
      type: 'Headphones',
      subtext: 'Spatial Audio with Dynamic Head Tracking',
      icon: Headphones,
      battery: '94%',
    },
    {
      id: 'iphone',
      name: 'iPhone 16 Pro (Built-in Speakers)',
      type: 'Local Speaker',
      subtext: 'Lossless Stereo CoreDSP Hardware',
      icon: Speaker,
      battery: '85%',
    },
    {
      id: 'appletv',
      name: 'Apple TV 4K (Living Room)',
      type: 'AirPlay 2 Receiver',
      subtext: 'Dolby Atmos 7.1.4 Surround',
      icon: Tv,
    },
    {
      id: 'homepod',
      name: 'HomePod mini (Studio Desk)',
      type: 'AirPlay 2 Speaker',
      subtext: 'Computational Audio Lossless',
      icon: Speaker,
    },
    {
      id: 'studiodisplay',
      name: 'Studio Display (USB-C Audio)',
      type: 'DAC External Output',
      subtext: '24-bit / 96kHz High Impedance Support',
      icon: Laptop,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-zinc-900/95 border-t border-white/15 rounded-t-3xl p-6 text-white max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cast className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold tracking-tight">AirPlay & Bluetooth Output</h3>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Devices List */}
        <div className="mt-4 space-y-2.5">
          {devices.map((device) => {
            const isSelected = selectedAirPlayDevice === device.name;
            const Icon = device.icon;

            return (
              <div
                key={device.id}
                onClick={() => setSelectedAirPlayDevice(device.name)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-pink-500/15 border-pink-500/40 text-white'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-pink-500 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{device.name}</p>
                      {device.battery && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-zinc-300 font-mono">
                          {device.battery}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">{device.subtext}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
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
