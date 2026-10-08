import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Track, Playlist, EqualizerSettings, PlayerStats, SleepTimerState } from '../types/music';
import { INITIAL_TRACKS, CURATED_PLAYLISTS } from '../data/musicCatalog';
import { audioEngine } from '../services/audioEngine';

interface MusicContextType {
  // Navigation & Viewport
  activeTab: 'listen-now' | 'browse' | 'radio' | 'library' | 'search';
  setActiveTab: (tab: 'listen-now' | 'browse' | 'radio' | 'library' | 'search') => void;
  isNowPlayingOpen: boolean;
  setIsNowPlayingOpen: (open: boolean) => void;
  activeSheet: 'none' | 'lyrics' | 'queue' | 'stats' | 'equalizer' | 'airplay' | 'settings';
  setActiveSheet: (sheet: 'none' | 'lyrics' | 'queue' | 'stats' | 'equalizer' | 'airplay' | 'settings') => void;
  viewMode: 'iphone' | 'fullscreen';
  setViewMode: (mode: 'iphone' | 'fullscreen') => void;
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;

  // Playback
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  shuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  automix: boolean;
  skipSilence: boolean;
  crossfade: number;

  // Queue
  queue: Track[];
  history: Track[];

  // Library
  tracks: Track[];
  playlists: Playlist[];
  favoriteIds: Set<string>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // DSP & EQ
  equalizer: EqualizerSettings;
  setEqualizer: React.Dispatch<React.SetStateAction<EqualizerSettings>>;
  stats: PlayerStats;
  sleepTimer: SleepTimerState;
  selectedAirPlayDevice: string;
  setSelectedAirPlayDevice: (device: string) => void;

  // Controls
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  setVolume: (val: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleAutomix: () => void;
  toggleSkipSilence: () => void;
  setCrossfade: (seconds: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleFavorite: (trackId: string) => void;
  setSleepTimerMode: (mode: SleepTimerState['mode']) => void;
  importLocalTrack: (file: File) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  applyEqPreset: (presetName: string) => void;
}

const DEFAULT_EQ: EqualizerSettings = {
  enabled: true,
  preset: 'BitChord Dynamic',
  bands: {
    low: 3.5,
    lowMid: 1.2,
    mid: -0.5,
    highMid: 2.0,
    high: 4.0,
  },
  bassBoost: 45,
  spatialAudio: true,
  loudnessNormalize: true,
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'listen-now' | 'browse' | 'radio' | 'library' | 'search'>('listen-now');
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'none' | 'lyrics' | 'queue' | 'stats' | 'equalizer' | 'airplay' | 'settings'>('none');
  const [viewMode, setViewMode] = useState<'iphone' | 'fullscreen'>('iphone');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [playlists] = useState<Playlist[]>(CURATED_PLAYLISTS);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['track-1', 'track-4']));
  const [currentTrack, setCurrentTrack] = useState<Track>(INITIAL_TRACKS[0]);
  const [queue, setQueue] = useState<Track[]>(INITIAL_TRACKS.slice(1));
  const [history, setHistory] = useState<Track[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(INITIAL_TRACKS[0].duration);
  const [volume, setVolumeState] = useState(0.85);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1.0);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [automix, setAutomix] = useState(true);
  const [skipSilence, setSkipSilence] = useState(false);
  const [crossfade, setCrossfadeState] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  const [equalizer, setEqualizer] = useState<EqualizerSettings>(DEFAULT_EQ);
  const [selectedAirPlayDevice, setSelectedAirPlayDevice] = useState('AirPods Pro (2nd gen)');
  const [sleepTimer, setSleepTimer] = useState<SleepTimerState>({
    active: false,
    remainingSeconds: 0,
    mode: 'off',
  });

  const [stats, setStats] = useState<PlayerStats>(audioEngine.getStats(INITIAL_TRACKS[0].codec));

  // Timer ref for playback ticker
  const playbackTickRef = useRef<number | null>(null);

  // Sync EQ with audioEngine
  useEffect(() => {
    audioEngine.applyEqualizer(equalizer);
    audioEngine.setSpatialAudio(equalizer.spatialAudio);
  }, [equalizer]);

  // Regular stats polling & time tracking
  useEffect(() => {
    if (!isPlaying) {
      if (playbackTickRef.current) clearInterval(playbackTickRef.current);
      return;
    }

    playbackTickRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = prev + 1 * playbackSpeed;
        if (nextTime >= duration) {
          handleTrackEnded();
          return 0;
        }
        return nextTime;
      });

      // Update nerd stats live
      setStats(audioEngine.getStats(currentTrack.codec));

      // Handle Sleep Timer
      setSleepTimer((prev) => {
        if (!prev.active || prev.remainingSeconds <= 0) return prev;
        const remaining = prev.remainingSeconds - 1;
        if (remaining <= 0) {
          audioEngine.pause();
          setIsPlaying(false);
          return { active: false, remainingSeconds: 0, mode: 'off' };
        }
        return { ...prev, remainingSeconds: remaining };
      });
    }, 1000);

    return () => {
      if (playbackTickRef.current) clearInterval(playbackTickRef.current);
    };
  }, [isPlaying, duration, playbackSpeed, currentTrack]);

  const handleTrackEnded = () => {
    if (sleepTimer.active && sleepTimer.mode === 'end_of_track') {
      audioEngine.pause();
      setIsPlaying(false);
      setSleepTimer({ active: false, remainingSeconds: 0, mode: 'off' });
      return;
    }

    if (repeatMode === 'one') {
      setCurrentTime(0);
      audioEngine.seek(0);
      audioEngine.play();
    } else {
      nextTrack();
    }
  };

  const playTrack = (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    setDuration(track.duration);
    setCurrentTime(0);
    audioEngine.loadTrack(track.audioUrl, track.genre);
    audioEngine.play();
    setIsPlaying(true);

    if (newQueue) {
      setQueue(newQueue.filter((t) => t.id !== track.id));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play();
      setIsPlaying(true);
    }
  };

  const seek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    audioEngine.seek(clamped);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    audioEngine.setVolume(clamped);
  };

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    audioEngine.setPlaybackRate(speed);
  };

  const toggleShuffle = () => setShuffle((prev) => !prev);

  const cycleRepeat = () => {
    setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  const toggleAutomix = () => setAutomix((prev) => !prev);
  const toggleSkipSilence = () => setSkipSilence((prev) => !prev);
  const setCrossfade = (seconds: number) => setCrossfadeState(seconds);

  const nextTrack = () => {
    if (queue.length === 0) {
      if (repeatMode === 'all') {
        const resetQueue = [...history, currentTrack];
        const next = resetQueue[0];
        setHistory([]);
        setQueue(resetQueue.slice(1));
        playTrack(next);
      } else {
        setIsPlaying(false);
        audioEngine.pause();
      }
      return;
    }

    let next: Track;
    let newQueue: Track[];

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      next = queue[randomIndex];
      newQueue = queue.filter((_, idx) => idx !== randomIndex);
    } else {
      next = queue[0];
      newQueue = queue.slice(1);
    }

    setHistory((prev) => [currentTrack, ...prev]);
    setQueue(newQueue);
    playTrack(next);
  };

  const prevTrack = () => {
    if (currentTime > 4) {
      seek(0);
      return;
    }

    if (history.length > 0) {
      const prev = history[0];
      setHistory((h) => h.slice(1));
      setQueue((q) => [currentTrack, ...q]);
      playTrack(prev);
    } else {
      seek(0);
    }
  };

  const toggleFavorite = (trackId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      return next;
    });
  };

  const setSleepTimerMode = (mode: SleepTimerState['mode']) => {
    let seconds = 0;
    if (mode === '15m') seconds = 15 * 60;
    else if (mode === '30m') seconds = 30 * 60;
    else if (mode === '45m') seconds = 45 * 60;
    else if (mode === '60m') seconds = 60 * 60;
    else if (mode === 'end_of_track') seconds = Math.max(0, duration - currentTime);
    else seconds = 0;

    setSleepTimer({
      active: mode !== 'off',
      remainingSeconds: seconds,
      mode,
    });
  };

  const importLocalTrack = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '');
    const newTrack: Track = {
      id: `local-${Date.now()}`,
      title: fileName,
      artist: 'Imported Local Artist',
      album: 'Local Lossless Storage',
      duration: 180,
      artwork: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=80',
      audioUrl: objectUrl,
      genre: 'Local Audio',
      year: 2026,
      badge: 'Hi-Res Lossless',
      codec: file.name.endsWith('.flac') ? 'FLAC' : 'ALAC',
      sampleRate: '96.0 kHz',
      bitDepth: '24-bit',
      bitrate: '3120 kbps',
      plays: 1,
      source: 'Local Import',
      vibrantColors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        bgGradient: 'from-blue-900/50 via-purple-950/60 to-black',
      },
      lyrics: [
        { time: 0, text: `♪ Now playing imported local file: ${fileName} ♪` },
        { time: 10, text: 'Hi-Res CoreDSP hardware acceleration enabled' },
        { time: 30, text: 'Direct lossless playback stream from device' },
      ],
    };

    setTracks((prev) => [newTrack, ...prev]);
    playTrack(newTrack);
  };

  const addToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track]);
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const applyEqPreset = (presetName: string) => {
    const presets: Record<string, Partial<EqualizerSettings['bands']>> = {
      'BitChord Dynamic': { low: 3.5, lowMid: 1.2, mid: -0.5, highMid: 2.0, high: 4.0 },
      Acoustic: { low: 4.0, lowMid: 2.5, mid: 0.0, highMid: 3.0, high: 3.5 },
      'Bass Booster': { low: 7.0, lowMid: 4.0, mid: 0.0, highMid: -1.0, high: -1.5 },
      Electronic: { low: 5.0, lowMid: 2.0, mid: -1.0, highMid: 2.5, high: 5.0 },
      'Hip-Hop': { low: 6.5, lowMid: 3.0, mid: 0.0, highMid: 1.5, high: 3.0 },
      Pop: { low: -1.0, lowMid: 2.0, mid: 4.0, highMid: 2.5, high: -0.5 },
      'Vocal Booster': { low: -2.0, lowMid: 0.5, mid: 4.5, highMid: 3.5, high: 1.0 },
      Flat: { low: 0, lowMid: 0, mid: 0, highMid: 0, high: 0 },
    };

    const bands = presets[presetName] || presets['Flat'];
    setEqualizer((prev) => ({
      ...prev,
      preset: presetName,
      bands: {
        low: bands.low ?? 0,
        lowMid: bands.lowMid ?? 0,
        mid: bands.mid ?? 0,
        highMid: bands.highMid ?? 0,
        high: bands.high ?? 0,
      },
    }));
  };

  return (
    <MusicContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isNowPlayingOpen,
        setIsNowPlayingOpen,
        activeSheet,
        setActiveSheet,
        viewMode,
        setViewMode,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playbackSpeed,
        shuffle,
        repeatMode,
        automix,
        skipSilence,
        crossfade,
        queue,
        history,
        tracks,
        playlists,
        favoriteIds,
        searchQuery,
        setSearchQuery,
        equalizer,
        setEqualizer,
        stats,
        sleepTimer,
        selectedAirPlayDevice,
        setSelectedAirPlayDevice,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        setPlaybackSpeed,
        toggleShuffle,
        cycleRepeat,
        toggleAutomix,
        toggleSkipSilence,
        setCrossfade,
        nextTrack,
        prevTrack,
        toggleFavorite,
        setSleepTimerMode,
        importLocalTrack,
        addToQueue,
        removeFromQueue,
        applyEqPreset,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
