import React, { useState } from 'react';
import {
  Download,
  Share,
  PlusSquare,
  Smartphone,
  Github,
  Copy,
  Check,
  X,
  FileCode,
  ShieldCheck,
  ExternalLink,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { downloadMobileConfig } from '../../utils/iosWebClip';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'safari' | 'mobileconfig' | 'github' | 'ipa'>('safari');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bitchord-ios.app';
  const githubRepoUrl = 'https://github.com/sasshanto01/BitChord-iOS';
  const cloneCmd = `git clone ${githubRepoUrl}.git`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadProfile = () => {
    downloadMobileConfig(currentUrl, 'BitChord');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 text-white max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Direct Download & Install for iOS</h3>
              <p className="text-xs text-zinc-400">Install BitChord directly on iPhone or iPad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Tabs */}
        <div className="flex p-1 bg-black/40 rounded-xl mt-4 border border-white/5 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('safari')}
            className={`flex-1 py-2 rounded-lg transition text-center ${
              activeTab === 'safari' ? 'bg-[#fa2d48] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Safari PWA
          </button>
          <button
            onClick={() => setActiveTab('mobileconfig')}
            className={`flex-1 py-2 rounded-lg transition text-center ${
              activeTab === 'mobileconfig' ? 'bg-[#fa2d48] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Apple Profile
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 rounded-lg transition text-center ${
              activeTab === 'github' ? 'bg-[#fa2d48] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            GitHub Repo
          </button>
          <button
            onClick={() => setActiveTab('ipa')}
            className={`flex-1 py-2 rounded-lg transition text-center ${
              activeTab === 'ipa' ? 'bg-[#fa2d48] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Native IPA
          </button>
        </div>

        {/* Tab 1: Safari Instant PWA Installation */}
        {activeTab === 'safari' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border border-pink-500/20">
              <span className="flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended: 1-Tap Home Screen Web Clip
              </span>
              <p className="text-xs text-zinc-300">
                Install BitChord on your iPhone in 5 seconds without needing an App Store account or sideloading! Runs in true fullscreen standalone mode.
              </p>
            </div>

            {/* Visual Steps for iOS Safari */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Open in Safari</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Open this app link in Safari on your iPhone or iPad.
                  </p>
                  <button
                    onClick={() => copyToClipboard(currentUrl, setCopiedLink)}
                    className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-zinc-200 font-medium transition active:scale-95"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-pink-400" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy App Link'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <span>Tap the Safari Share button</span>
                    <Share className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    At the bottom of Safari, tap the square icon with the arrow pointing up.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <span>Select &quot;Add to Home Screen&quot;</span>
                    <PlusSquare className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Scroll down and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong> in the top-right corner.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full standalone iOS support with offline audio caching and background audio playback.</span>
            </div>
          </div>
        )}

        {/* Tab 2: Apple MobileConfig Profile */}
        {activeTab === 'mobileconfig' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block">
                Apple WebClip Profile Installer (.mobileconfig)
              </span>
              <p className="text-xs text-zinc-300">
                Download a signed Apple Configuration Profile that pins BitChord directly to your iPhone Home Screen with fullscreen mode enabled.
              </p>
            </div>

            <button
              onClick={handleDownloadProfile}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-[0.98] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Direct Download BitChord-iOS.mobileconfig</span>
            </button>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs text-zinc-300">
              <p className="font-semibold text-white">How to activate on iPhone:</p>
              <ol className="list-decimal pl-4 space-y-1 text-zinc-400 text-[11px]">
                <li>Tap the button above to download the profile.</li>
                <li>When prompted by iOS, tap <strong>Allow</strong>.</li>
                <li>Go to iPhone <strong>Settings &rarr; Profile Downloaded</strong>.</li>
                <li>Tap <strong>Install</strong> in the upper right.</li>
                <li>BitChord will immediately appear on your home screen!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub Public Repository */}
        {activeTab === 'github' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Github className="w-4 h-4" />
                <span>Public GitHub Repository</span>
              </div>
              <p className="text-xs text-zinc-300">
                The repository is configured for public release with complete documentation, source files, and GitHub Actions workflow for automatic deployment.
              </p>
            </div>

            {/* Git Clone Command */}
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Clone with Git
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-200">
                <span className="truncate pr-2">{cloneCmd}</span>
                <button
                  onClick={() => copyToClipboard(cloneCmd, setCopiedClone)}
                  className="shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 transition"
                  title="Copy command"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-pink-400" />}
                </button>
              </div>
            </div>

            {/* Push Instructions */}
            <div className="p-3.5 rounded-xl bg-white/5 text-xs text-zinc-300 space-y-2 font-mono">
              <p className="text-[11px] font-bold text-pink-300 uppercase font-sans">
                To publish to your public GitHub:
              </p>
              <div className="text-[11px] text-zinc-400 space-y-1 bg-black/40 p-2.5 rounded-lg">
                <p>git remote add origin {githubRepoUrl}.git</p>
                <p>git branch -M main</p>
                <p>git push -u origin main</p>
              </div>
            </div>

            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <span>Create Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        )}

        {/* Tab 4: Native IPA / Sideloading */}
        {activeTab === 'ipa' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block">
                Native iOS .IPA Packaging (Capacitor / Xcode)
              </span>
              <p className="text-xs text-zinc-300">
                You can easily compile BitChord into a native iOS app archive (.ipa) to sideload with AltStore, SideStore, TrollStore, or Sideloadly.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs font-mono space-y-2">
              <span className="text-[11px] font-bold text-pink-300 font-sans block">
                1-Step Native iOS Build Commands:
              </span>
              <div className="bg-black/60 p-3 rounded-xl text-zinc-300 space-y-1 text-[11px]">
                <p>npm run build</p>
                <p>npx @capacitor/cli create BitChord com.bitchord.ios</p>
                <p>npx cap add ios</p>
                <p>npx cap open ios</p>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans mt-2">
                In Xcode: Select your Apple Developer account &rarr; Product &rarr; Archive &rarr; Export IPA!
              </p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.99] text-sm font-semibold transition text-center shrink-0"
        >
          Done
        </button>
      </div>
    </div>
  );
};
