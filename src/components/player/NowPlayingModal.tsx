import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import {
  ChevronDown,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume1,
  Volume2,
  Quote,
  Cast,
  ListMusic,
  Sliders,
  Cpu,
  MoreHorizontal,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LyricsView } from './LyricsView';

export const NowPlayingModal: React.FC = () => {
  const {
    isNowPlayingOpen,
    setIsNowPlayingOpen,
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    shuffle,
    toggleShuffle,
    repeatMode,
    cycleRepeat,
    favoriteIds,
    toggleFavorite,
    setActiveSheet,
    playbackSpeed,
  } = useMusic();

  const [showLyrics, setShowLyrics] = useState(false);

  if (!isNowPlayingOpen) return null;

  const isFavorite = favoriteIds.has(currentTrack.id);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, duration - currentTime);
  const formatRemaining = (secs: number) => {
    return `-${formatTime(secs)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white overflow-hidden animate-in fade-in slide-in-from-bottom duration-300">
      {/* Dynamic Background Glow using track colors */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl scale-125 transition-all duration-1000 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${currentTrack.vibrantColors.primary} 0%, ${currentTrack.vibrantColors.secondary} 45%, #000000 85%)`,
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl -z-10 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="pt-safe px-5 py-3 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={() => setIsNowPlayingOpen(false)}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition"
          aria-label="Collapse now playing"
        >
          <ChevronDown className="w-5 h-5 text-zinc-200" />
        </button>

        <div className="flex flex-col items-center max-w-[200px] truncate">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            Playing From
          </span>
          <span className="text-xs font-semibold text-zinc-200 truncate">
            {currentTrack.album}
          </span>
        </div>

        <button
          onClick={() => setActiveSheet('settings')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5 text-zinc-200" />
        </button>
      </div>

      {/* Main Content: Artwork OR Lyrics */}
      <div className="flex-1 flex flex-col justify-center px-6 overflow-hidden relative">
        {showLyrics ? (
          <LyricsView />
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto my-auto py-2">
            {/* Interactive Scaling Album Art (Apple Music iOS physics) */}
            <div
              className={`relative aspect-square w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10 transition-transform duration-500 ease-out ${
                isPlaying ? 'scale-100' : 'scale-[0.88]'
              }`}
            >
              <img
                src={currentTrack.artwork}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Player Controls Section */}
      <div className="px-6 pb-safe pt-2 flex flex-col gap-3 shrink-0 max-w-md mx-auto w-full z-10">
        {/* Track Info & Lossless Badge */}
        <div className="flex items-center justify-between">
          <div className="flex-1 truncate pr-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
              {currentTrack.title}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-zinc-300 font-medium truncate">
                {currentTrack.artist}
              </span>
              <button
                onClick={() => setActiveSheet('stats')}
                className="shrink-0 flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-pink-300 border border-white/10 tracking-wider uppercase transition"
                title="Tap to view Hi-Res Stats for Nerds"
              >
                <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                <span>{currentTrack.badge}</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center transition shrink-0"
            aria-label="Favorite track"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-[#fa2d48] text-[#fa2d48]' : 'text-zinc-300'
              }`}
            />
          </button>
        </div>

        {/* Apple iOS Scrubber Slider */}
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full h-1.5 accent-white cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatRemaining(remainingSeconds)}</span>
          </div>
        </div>

        {/* Playback Controls (Shuffle, Prev, Big Play/Pause, Next, Repeat) */}
        <div className="flex items-center justify-between px-2 py-1">
          <button
            onClick={toggleShuffle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 ${
              shuffle ? 'text-pink-400 bg-pink-500/20' : 'text-zinc-400 hover:text-white'
            }`}
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={prevTrack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-200 hover:text-white active:scale-90 transition"
            aria-label="Previous track"
          >
            <SkipBack className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-200 hover:text-white active:scale-90 transition"
            aria-label="Next track"
          >
            <SkipForward className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={cycleRepeat}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 ${
              repeatMode !== 'off'
                ? 'text-pink-400 bg-pink-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
            aria-label="Repeat mode"
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Volume Slider with Apple Speaker glyphs */}
        <div className="flex items-center gap-3 px-3 py-1">
          <Volume1 className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 accent-white cursor-pointer"
          />
          <Volume2 className="w-4 h-4 text-zinc-400 shrink-0" />
        </div>

        {/* Signature Apple Music iOS Action Toolbar */}
        <div className="flex items-center justify-around py-2 border-t border-white/10 text-zinc-400">
          {/* Synced Lyrics toggle */}
          <button
            onClick={() => setShowLyrics((prev) => !prev)}
            className={`p-2 rounded-xl transition flex flex-col items-center gap-0.5 ${
              showLyrics ? 'text-pink-400 bg-pink-500/20' : 'hover:text-white'
            }`}
            title="Apple Synced Lyrics"
          >
            <Quote className="w-5 h-5" />
            <span className="text-[9px] font-semibold">Lyrics</span>
          </button>

          {/* AirPlay Output Selector */}
          <button
            onClick={() => setActiveSheet('airplay')}
            className="p-2 rounded-xl hover:text-white transition flex flex-col items-center gap-0.5"
            title="AirPlay Audio Devices"
          >
            <Cast className="w-5 h-5" />
            <span className="text-[9px] font-semibold">AirPlay</span>
          </button>

          {/* Up Next Queue */}
          <button
            onClick={() => setActiveSheet('queue')}
            className="p-2 rounded-xl hover:text-white transition flex flex-col items-center gap-0.5"
            title="Playing Next Queue"
          >
            <ListMusic className="w-5 h-5" />
            <span className="text-[9px] font-semibold">Queue</span>
          </button>

          {/* Equalizer & Audio FX */}
          <button
            onClick={() => setActiveSheet('equalizer')}
            className="p-2 rounded-xl hover:text-white transition flex flex-col items-center gap-0.5"
            title="5-Band System Equalizer"
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[9px] font-semibold">EQ / FX</span>
          </button>

          {/* Stats for Nerds (BitChord iconic) */}
          <button
            onClick={() => setActiveSheet('stats')}
            className="p-2 rounded-xl hover:text-white transition flex flex-col items-center gap-0.5 text-pink-300"
            title="Stats for Nerds"
          >
            <Cpu className="w-5 h-5 text-pink-400" />
            <span className="text-[9px] font-semibold">Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
};
