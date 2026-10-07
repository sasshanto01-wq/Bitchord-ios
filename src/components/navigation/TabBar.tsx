import React from 'react';
import { PlayCircle, Compass, Radio, Library, Search } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

export const TabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();

  const tabs = [
    { id: 'listen-now', label: 'Listen Now', icon: PlayCircle },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'radio', label: 'Radio', icon: Radio },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'search', label: 'Search', icon: Search },
  ] as const;

  return (
    <nav className="relative z-30 w-full ios-glass-dark border-t border-white/10 px-3 pt-2 pb-5 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 transition-transform active:scale-90"
          >
            <div className="relative">
              <Icon
                className={`w-6 h-6 transition-colors duration-200 ${
                  isActive ? 'text-[#fa2d48]' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#fa2d48]" />
              )}
            </div>
            <span
              className={`text-[10px] tracking-tight transition-colors duration-200 font-medium ${
                isActive ? 'text-[#fa2d48]' : 'text-zinc-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
