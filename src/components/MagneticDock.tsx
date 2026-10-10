"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Terminal,
  Globe,
  Activity,
  Music,
  Shield,
  Settings,
  Folder,
  Volume2,
  VolumeX,
  Code2,
  Check,
  Copy,
  Sparkles,
  Maximize2,
  Play,
  Pause,
  Sliders,
  Flame,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface DockApp {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

const APPS: DockApp[] = [
  { id: "terminal", name: "Terminal.sh", icon: Terminal, color: "from-emerald-500 to-green-600" },
  { id: "browser", name: "Cyber Browser", icon: Globe, color: "from-blue-500 to-cyan-500" },
  { id: "analytics", name: "Telemetry Engine", icon: Activity, color: "from-amber-500 to-orange-600", badge: "LIVE" },
  { id: "music", name: "Orbital Synthesizer", icon: Music, color: "from-pink-500 to-purple-600" },
  { id: "vault", name: "Aegis Vault", icon: Shield, color: "from-indigo-500 to-violet-600" },
  { id: "storage", name: "Quantum Files", icon: Folder, color: "from-teal-500 to-emerald-600" },
  { id: "settings", name: "System Config", icon: Settings, color: "from-slate-500 to-slate-700" },
];

export const MagneticDock: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeApp, setActiveApp] = useState<string>("terminal");
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);

  // Dynamic Island States
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Dock Physics Tuning
  const [baseSize, setBaseSize] = useState(52);
  const [maxMagnification, setMaxMagnification] = useState(82);

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    sound.enabled = audioEnabled;
  }, [audioEnabled]);

  const handleAppClick = (app: DockApp) => {
    sound.playLaunch();
    setActiveApp(app.id);
    setBouncingApp(app.id);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
      });
    } catch {}

    setTimeout(() => {
      setBouncingApp(null);
    }, 1200);
  };

  const toggleIsland = () => {
    sound.playIsland();
    setIslandExpanded(!islandExpanded);
  };

  const componentCode = `// macOS Magnetic Dock & Dynamic Island
// Stack: Next.js 15, Framer Motion, Web Audio API, Tailwind CSS v4
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function MagneticDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div 
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-slate-700/50"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <DockIcon key={i} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}`;

  const handleCopyCode = async () => {
    sound.playHover(0.5);
    try {
      await navigator.clipboard.writeText(componentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold font-mono tracking-wider text-slate-100 uppercase">
                Dynamic Island & Magnetic Dock
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                UI-04
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Magnification Curve Physics, Spring Haptics & Expandable Dynamic Island Pill
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={() => {
              setAudioEnabled(!audioEnabled);
              sound.playHover(0.1);
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
              audioEnabled
                ? "bg-blue-950/60 border-blue-500/40 text-blue-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{audioEnabled ? "HAPTICS ON" : "MUTED"}</span>
          </button>

          <button
            onClick={() => {
              sound.playLaunch();
              setShowCodeModal(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-blue-950/50 transition-all cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>Copy Component Code</span>
          </button>
        </div>
      </div>

      {/* Dynamic Island Pill Area */}
      <div className="w-full flex justify-center py-4">
        <motion.div
          layout
          onClick={toggleIsland}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className={`bg-black border border-slate-800/80 rounded-full cursor-pointer shadow-2xl flex items-center justify-between text-xs font-mono text-slate-200 select-none overflow-hidden ${
            islandExpanded ? "px-6 py-4 w-[380px] rounded-3xl" : "px-4 py-2 w-[220px]"
          }`}
        >
          {islandExpanded ? (
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-slate-100">STREAK ANCHOR</span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold">ACTIVE FLAME</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Autonomous Git Dispatch</span>
                <span className="text-blue-400">100% PUSHED</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-full" />
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold">FLAMEGUARD</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
                <Music className="w-3 h-3 text-pink-400 animate-bounce" />
                <span>Audio Engine</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Main Workspace Stage */}
      <div className="w-full p-8 rounded-3xl bg-slate-950/70 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center min-h-[280px] relative">
        <div className="text-center space-y-1 mb-8">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">ACTIVE FOREGROUND APP</p>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center justify-center space-x-2">
            <span>{APPS.find((a) => a.id === activeApp)?.name}</span>
          </h2>
        </div>

        {/* The macOS Magnetic Dock */}
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-3 px-5 py-3 rounded-3xl bg-slate-900/60 border border-slate-700/40 backdrop-blur-2xl shadow-2xl shadow-black/80"
        >
          {APPS.map((app) => (
            <DockIcon
              key={app.id}
              app={app}
              mouseX={mouseX}
              isActive={activeApp === app.id}
              isBouncing={bouncingApp === app.id}
              baseSize={baseSize}
              maxSize={maxMagnification}
              onClick={() => handleAppClick(app)}
            />
          ))}
        </motion.div>
      </div>

      {/* Hardware Tuning Sliders */}
      <div className="w-full p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">BASE ICON DIAMETER</span>
            <span className="text-blue-400 font-bold">{baseSize} PX</span>
          </div>
          <input
            type="range"
            min="40"
            max="64"
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">MAX MAGNIFICATION PEAK</span>
            <span className="text-indigo-400 font-bold">{maxMagnification} PX</span>
          </div>
          <input
            type="range"
            min="68"
            max="110"
            value={maxMagnification}
            onChange={(e) => setMaxMagnification(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Code Drawer */}
      <AnimatePresence>
        {showCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">MagneticDock.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold transition cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                  <button
                    onClick={() => setShowCodeModal(false)}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto bg-slate-950 text-slate-300 font-mono text-xs leading-relaxed">
                <pre>{componentCode}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DockIconProps {
  app: DockApp;
  mouseX: any;
  isActive: boolean;
  isBouncing: boolean;
  baseSize: number;
  maxSize: number;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  app,
  mouseX,
  isActive,
  isBouncing,
  baseSize,
  maxSize,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [baseSize, maxSize, baseSize]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 14 });

  const Icon = app.icon;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        animate={isBouncing ? { y: [0, -28, 0, -14, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onClick={onClick}
        onMouseEnter={() => sound.playHover(0.4)}
        className={`relative rounded-2xl bg-gradient-to-tr ${app.color} p-2 flex items-center justify-center text-white shadow-lg cursor-pointer transition-shadow hover:shadow-cyan-500/20 active:scale-95`}
      >
        <Icon className="w-1/2 h-1/2" />
        {app.badge && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold bg-red-500 text-white shadow">
            {app.badge}
          </span>
        )}
      </motion.div>

      {/* Active Dot Indicator */}
      <div
        className={`w-1 h-1 rounded-full mt-1.5 transition-colors ${
          isActive ? "bg-slate-200 shadow-sm" : "bg-transparent"
        }`}
      />
    </div>
  );
};
