/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { IPhoneFrame } from './components/ios/IPhoneFrame';
import { TabBar } from './components/navigation/TabBar';
import { MiniPlayer } from './components/player/MiniPlayer';
import { NowPlayingModal } from './components/player/NowPlayingModal';
import { StatsForNerdsSheet } from './components/player/StatsForNerdsSheet';
import { EqualizerSheet } from './components/player/EqualizerSheet';
import { QueueSheet } from './components/player/QueueSheet';
import { AirPlaySheet } from './components/player/AirPlaySheet';
import { MoreOptionsSheet } from './components/player/MoreOptionsSheet';

import { ListenNowView } from './components/views/ListenNowView';
import { BrowseView } from './components/views/BrowseView';
import { RadioView } from './components/views/RadioView';
import { LibraryView } from './components/views/LibraryView';
import { SearchView } from './components/views/SearchView';

const MainContent: React.FC = () => {
  const { activeTab, activeSheet } = useMusic();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'listen-now':
        return <ListenNowView />;
      case 'browse':
        return <BrowseView />;
      case 'radio':
        return <RadioView />;
      case 'library':
        return <LibraryView />;
      case 'search':
        return <SearchView />;
      default:
        return <ListenNowView />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Active Tab View */}
      {renderActiveView()}

      {/* Docked Mini Player & iOS Tab Bar */}
      <div className="shrink-0 w-full flex flex-col z-20">
        <MiniPlayer />
        <TabBar />
      </div>

      {/* Full-Screen Apple Music Now Playing Modal */}
      <NowPlayingModal />

      {/* Sheets & Overlays */}
      {activeSheet === 'stats' && <StatsForNerdsSheet />}
      {activeSheet === 'equalizer' && <EqualizerSheet />}
      {activeSheet === 'queue' && <QueueSheet />}
      {activeSheet === 'airplay' && <AirPlaySheet />}
      {activeSheet === 'settings' && <MoreOptionsSheet />}
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <IPhoneFrame>
        <MainContent />
      </IPhoneFrame>
    </MusicProvider>
  );
}
