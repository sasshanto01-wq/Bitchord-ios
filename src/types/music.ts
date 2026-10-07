export interface LyricLine {
  time: number; // in seconds
  text: string;
  translation?: string;
}

export type LosslessBadge = 'Hi-Res Lossless' | 'Lossless' | 'Apple Digital Master' | 'Dolby Atmos';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  artwork: string;
  audioUrl: string;
  genre: string;
  year: number;
  badge: LosslessBadge;
  codec: 'ALAC' | 'FLAC' | 'Opus' | 'AAC';
  sampleRate: string;
  bitDepth: string;
  bitrate: string;
  vibrantColors: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
  };
  lyrics: LyricLine[];
  isFavorite?: boolean;
  isDownloaded?: boolean;
  source: 'BitChord Hi-Res' | 'YouTube Music' | 'Local Import';
  plays?: number;
}

export interface Playlist {
  id: string;
  title: string;
  curator: string;
  coverImage: string;
  description: string;
  tracks: string[]; // track ids
}

export interface EqualizerSettings {
  enabled: boolean;
  preset: string;
  bands: {
    low: number;      // 60Hz (-12 to +12 dB)
    lowMid: number;   // 250Hz
    mid: number;      // 1kHz
    highMid: number;  // 4kHz
    high: number;     // 12kHz
  };
  bassBoost: number;  // 0 to 100%
  spatialAudio: boolean;
  loudnessNormalize: boolean;
}

export interface PlayerStats {
  codec: string;
  bitDepth: string;
  sampleRate: string;
  bitrate: string;
  bufferHealth: number; // percentage (0 - 100)
  droppedFrames: number;
  outputDevice: string;
  latencyMs: number;
  peakDb: number;
  sourceEngine: string;
}

export interface SleepTimerState {
  active: boolean;
  remainingSeconds: number;
  mode: '15m' | '30m' | '45m' | '60m' | 'end_of_track' | 'custom' | 'off';
}
