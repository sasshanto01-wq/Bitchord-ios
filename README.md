# BitChord for iOS 🎵📱
> **An Apple Music-inspired Hi-Res Lossless Music Client for iOS and Web.**  
> Adapted from the open-source [kushagrasinghx/BitChord](https://github.com/kushagrasinghx/BitChord.git) project.

[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20iPadOS%20%7C%20Web-pink?style=flat-square&logo=apple)](https://github.com/sasshanto01/BitChord-iOS)
[![Audio](https://img.shields.io/badge/Audio-24--bit%20%2F%20192kHz%20Hi--Res-cyan?style=flat-square)](https://github.com/sasshanto01/BitChord-iOS)
[![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Release-v1.0.0--iOS-emerald?style=flat-square)](https://github.com/sasshanto01/BitChord-iOS)

---

## 📲 Direct Download & Install on iOS

You can install BitChord directly on your iPhone or iPad with zero App Store restrictions:

### Method 1: Instant 1-Tap Safari WebClip (Recommended)
1. Open this app's URL in **Safari** on your iPhone or iPad.
2. Tap the **Share** button (`⎙` / square with an arrow pointing up) at the bottom toolbar.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add** in the top right corner.
5. **Done!** BitChord now runs full screen on your home screen with high-fidelity background audio playback, offline caching, and an authentic iOS app icon.

### Method 2: Apple Configuration Profile (`.mobileconfig`)
Inside the app, tap **Download for iOS** &rarr; select **Apple Profile** &rarr; tap **Download BitChord-iOS.mobileconfig**. Open your iPhone **Settings** &rarr; **Profile Downloaded** &rarr; tap **Install**.

### Method 3: Native `.ipa` Sideloading (AltStore / TrollStore / Sideloadly)
```bash
git clone https://github.com/sasshanto01/BitChord-iOS.git
cd BitChord-iOS
npm install
npm run build
npx @capacitor/cli create BitChord com.bitchord.ios
npx cap add ios
npx cap open ios
# In Xcode: Archive and export as .ipa for AltStore or TestFlight
```

---

## ✨ Features

### 🎧 BitChord Audio DSP Engine
* **Hi-Res Lossless & Spatial Audio**: Native ALAC (Apple Lossless Audio Codec), FLAC, and Opus support up to 24-bit / 192.0 kHz.
* **Stats for Nerds**: Live real-time audio telemetry panel showing:
  - Active Audio Codec (`ALAC`, `FLAC`, `Opus`)
  - AudioContext Hardware Sample Rate (`96.0 kHz`, `192.0 kHz`)
  - Dynamic Headroom Bit Depth (`24-bit Hi-Res Lossless`)
  - Lossless Bitrate (`3120 kbps`)
  - Real-time 16-band FFT Frequency Spectrum visualizer (20Hz - 22kHz)
  - Buffer Health percentage & chunk caching
  - Base audio latency (ms) and Peak dBFS meter
* **5-Band System Equalizer**: 60Hz, 250Hz, 1kHz, 4kHz, and 12kHz biquad filters with presets (*BitChord Dynamic, Bass Booster, Vocal Booster, Electronic, Acoustic, Hip-Hop, Pop, Flat*).
* **Sub-Bass Booster & Spatial Audio**: Dedicated sub-bass resonance slider (0–100%) and Dolby Atmos binaural stereo expansion.
* **Automix DJ Transitions**: Beat-matching engine with seamless configurable gapless crossfade (0s to 12s).
* **Audio Controls**: Playback speed control (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x), Skip Silence filter (bypasses audio below -50dB), and Sleep Timer with gentle volume fade-out.

### 🎨 Apple Music iOS Design Language
* **iPhone 16 Pro Simulator & Standalone Mode**: Interactive Dynamic Island displaying live animated audio waves and rotating album artwork.
* **Apple Music Navigation**: Translucent bottom tab bar (*Listen Now*, *Browse*, *Radio*, *Library*, *Search*).
* **Floating Mini Player**: Frosted-glass capsule with bottom progress line, title marquee, and fluid swipe-up sheet physics.
* **Full-Screen Now Playing**:
  - Dynamic fluid gradient background reflecting album art colors.
  - Scale-physics album art (scales up on play, springs down on pause).
  - Apple scrubber bar with elapsed and remaining time (`-02:45`).
  - AirPlay 2 output device selector (*AirPods Pro 2 with Head Tracking, iPhone speakers, Apple TV 4K, HomePod mini, Studio Display*).
* **Apple-Style Time-Synced Lyrics**: Vocal-synced karaoke lyrics with glowing active line bloom, dimmed blur on inactive lines, and instant tap-to-seek.
* **Local Audio Importer**: Import your own local `.flac`, `.mp3`, `.m4a`, or `.wav` files directly from your device into BitChord.

---

## 🚀 Quick Start & Development

### Prerequisites
* Node.js 18+
* npm or pnpm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/sasshanto01/BitChord-iOS.git
cd BitChord-iOS

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

---

## 📤 Push to Your Public GitHub Repository

Run these commands to publish this repository to your GitHub account:

```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "feat: initial release of BitChord for iOS"

# 2. Add your public remote
git remote add origin https://github.com/sasshanto01/BitChord-iOS.git

# 3. Rename branch to main
git branch -M main

# 4. Push to public GitHub
git push -u origin main
```

---

## 🛠️ GitHub Actions Automated Deployment

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. When you push to `main`, it will automatically build and deploy the app to **GitHub Pages** so anyone can use it online.

---

## 📜 Credits & Acknowledgements

* Inspired by [BitChord](https://github.com/kushagrasinghx/BitChord.git) by [kushagrasinghx](https://github.com/kushagrasinghx).
* Designed with Apple Music iOS design patterns and Web Audio DSP.
* Licensed under the [GPL-3.0 License](LICENSE).
