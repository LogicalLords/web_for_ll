import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, ChevronDown, Terminal, Cpu, Zap, ArrowUpRight, Radio, Lock } from 'lucide-react';
import { ReactorCanvas } from './3d/ReactorCanvas';
import { Founder } from '../types';
import { soundFx } from '../utils/sound';

interface HeroProps {
  onEnterHQ: () => void;
  onMeetFounders: () => void;
  onSelectFounder: (founder: Founder) => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterHQ, onMeetFounders, onSelectFounder }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#050505] text-white"
    >
      {/* Subtle Scanlines & Atmosphere */}
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Dashed Reactor Rings */}
      <div className="reactor-ring w-[900px] h-[900px] opacity-15 hidden md:block" />
      <div className="reactor-ring w-[650px] h-[650px] opacity-30" />
      <div className="reactor-ring w-[420px] h-[420px] opacity-50" />

      {/* Top Telemetry Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 mb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-4 rounded-sm bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono">
          <div className="flex items-center gap-3 text-[#00D1FF]">
            <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
            <span className="tracking-widest uppercase font-semibold">SECURITY CLEARANCE: LEVEL 8</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white/40">
            <span>SECTOR: 06 // GLOBAL COMMAND</span>
            <span>CORE PROTOCOL: ZERO-LATENCY</span>
            <span className="text-emerald-400">STATUS: COMBINED FORCE</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container with Side HUDs */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Side HUD Widget (3 Cols on large screens) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          <div className="hud-panel p-4 rounded-sm border border-white/10 relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase mb-3 flex items-center justify-between">
              <span>Active Missions</span>
              <span className="text-[#00D1FF]">04</span>
            </div>
            <div className="space-y-3 font-mono text-[11px]">
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>SMART SMS v4.0</span>
                  <span className="text-[#00D1FF]">94%</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-[#00D1FF] h-1 w-[94%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>CAMPUS TRACKER</span>
                  <span className="text-[#00D1FF]">88%</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-[#00D1FF] h-1 w-[88%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-white/40 mb-1">
                  <span>PROJECT AEGIS</span>
                  <span className="text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> LVL 6
                  </span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-amber-400/40 h-1 w-[35%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="hud-panel p-4 rounded-sm border border-white/10 text-[10px] font-mono text-white/40 leading-relaxed">
            <div className="text-[#00D1FF] font-bold uppercase tracking-wider mb-1">HQ DIRECTIVE</div>
            <div>Multi-disciplinary technology engineering group architecting next-generation autonomous frameworks.</div>
          </div>
        </div>

        {/* Center Hero Banner & Reactor (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-white/10 px-4 py-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-white/70 mb-5 bg-white/[0.03] backdrop-blur-sm"
          >
            SIX INDIVIDUAL HEROES. ONE TECHNOLOGY ALLIANCE.
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none italic uppercase mb-1">
              SIX MINDS.
            </h1>
            <h1 className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none italic uppercase text-stroke-cyan text-transparent text-glow-cyan">
              ONE ALLIANCE.
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto text-sm sm:text-base leading-relaxed tracking-wide font-light mb-8"
          >
            We build intelligent systems, immersive digital experiences, and technology designed to solve real-world problems. Six specialist disciplines fused into one unstoppable technological collective.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            {/* Enter HQ Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onEnterHQ();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="bg-white text-black px-8 py-3.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#00D1FF] hover:text-black transition-colors rounded-none sm:rounded-sm cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2"
            >
              <span>ENTER THE HQ</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Meet Founders Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onMeetFounders();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="border border-white/20 px-8 py-3.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-white/5 hover:border-white/40 text-white transition-colors rounded-none sm:rounded-sm cursor-pointer flex items-center gap-2"
            >
              <span>MEET THE FOUNDERS</span>
              <Shield className="w-4 h-4 text-[#00D1FF]" />
            </button>
          </motion.div>

          {/* Interactive 3D Reactor Embed */}
          <div className="relative w-full h-[280px] sm:h-[320px] max-w-md mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden pointer-events-none">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />
              <div className="absolute top-2 left-3 text-[9px] font-mono text-white/40 uppercase">
                REACTOR MATRIX // ARC-6 CORE
              </div>
              <div className="absolute bottom-2 right-3 text-[9px] font-mono text-[#00D1FF] uppercase">
                ALL 6 ARCHETYPES SYNCED
              </div>
            </div>
            <ReactorCanvas onSelectFounder={onSelectFounder} />
          </div>
        </div>

        {/* Right Side Telemetry HUD (3 Cols on large screens) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          <div className="hud-panel p-4 rounded-sm border border-white/10 relative">
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase mb-3 flex items-center justify-between">
              <span>System Telemetry</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">UPTIME</span>
                <span className="text-white">99.98%</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">LOAD</span>
                <span className="text-emerald-400">OPTIMAL</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">LATENCY</span>
                <span className="text-[#00D1FF]">12ms</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">DEFENSE GRID</span>
                <span className="text-white">ACTIVE (6/6)</span>
              </div>
            </div>
          </div>

          <div className="hud-panel p-4 rounded-sm border border-white/10 font-mono text-[10px]">
            <div className="text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00D1FF]" />
              <span>LIVE LOG STREAM</span>
            </div>
            <div className="space-y-1 text-white/60">
              <p className="text-emerald-400">&gt; Arc reactor locked at 100%</p>
              <p>&gt; Neural handshake stabilized</p>
              <p>&gt; Encrypted stream active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full px-4 text-center mt-4 relative z-20">
        <button
          onClick={onEnterHQ}
          className="inline-flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest text-white/40 hover:text-[#00D1FF] transition-colors cursor-pointer uppercase"
        >
          <span>EXPLORE ALLIANCE HQ</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#00D1FF]" />
        </button>
      </div>
    </section>
  );
};
