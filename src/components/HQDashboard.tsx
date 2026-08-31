import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Activity, Radio, Cpu, Globe, Server, AlertCircle, Clock, Zap } from 'lucide-react';
import { HolographicGlobe } from './3d/HolographicGlobe';
import { FOUNDERS } from '../data/founders';
import { soundFx } from '../utils/sound';

export const HQDashboard: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([
    'HQ-CORE: Initialized global telemetry bridge.',
    'NODE-01 (CSudharsan): AI neural architecture verified.',
    'NODE-02 (Varunankm): Defensive perimeter secured.',
    'NODE-03 (Vijay0414): Cloud throughput stable at 100%.',
    'NODE-04 (Vickyvic07): Frontend latency at 0.4ms.',
    'NODE-05 (Varunraj-2005): Event tracking pipeline active.',
    'NODE-06 (Tamil0219): Arc thermal output optimal.',
    'ALLIANCE MATRIX: 6/6 heroes locked in synchronization.'
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hq" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            OPERATIONAL COMMAND HUB
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            THE HQ CONTROL ROOM
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            Real-time organizational telemetry, hero readiness monitors, defense infrastructure, and global system status.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="relative rounded-sm p-6 sm:p-8 hud-panel border border-white/15 shadow-2xl">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-bold uppercase tracking-widest">
                ALLIANCE CENTRAL COMMAND MATRIX
              </span>
            </div>

            <div className="flex items-center gap-4 text-white/40">
              <span className="flex items-center gap-1.5 uppercase">
                <Clock className="w-3.5 h-3.5 text-[#00D1FF]" />
                {timeStr || 'SYNCHRONIZING...'}
              </span>
              <span className="text-[#00D1FF] hidden sm:inline uppercase">SECTOR: 06-ALPHA</span>
            </div>
          </div>

          {/* Core Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 font-mono">
            {[
              { label: 'SYSTEM STATUS', val: 'ONLINE', col: 'text-emerald-400' },
              { label: 'ACTIVE HEROES', val: '06', col: 'text-white' },
              { label: 'ACTIVE MISSIONS', val: '03', col: 'text-[#00D1FF]' },
              { label: 'TECH STACK', val: '20+', col: 'text-white' },
              { label: 'OPEN SOURCE', val: 'ACTIVE', col: 'text-emerald-400' },
              { label: 'HQ STATUS', val: 'OPERATIONAL', col: 'text-[#00D1FF]' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-none bg-black/50 border border-white/10 text-center flex flex-col justify-center"
              >
                <div className={`font-mono font-black text-base sm:text-lg tracking-wider ${stat.col}`}>
                  {stat.val}
                </div>
                <div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 3-Column Tactical Command Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: 6 Heroes Readiness Status (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-none bg-black/40 border border-white/10 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs">
                <span className="text-white/70 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00D1FF]" />
                  HERO READINESS
                </span>
                <span className="text-emerald-400 text-[10px] uppercase">6/6 ONLINE</span>
              </div>

              <div className="space-y-2">
                {FOUNDERS.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2 rounded-none bg-black/60 border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: f.accentHex }}
                      />
                      <div>
                        <div className="font-bold text-white text-[11px] uppercase tracking-tight">
                          {f.heroCodename}
                        </div>
                        <div className="text-[9px] text-white/40">
                          {f.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] px-1.5 py-0.5 border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 uppercase tracking-wider">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: 3D Holographic Globe & Radar Grid (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-none bg-black/40 border border-white/10 flex flex-col items-center justify-between relative overflow-hidden font-mono">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-2 text-xs">
                <span className="text-white/70 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#00D1FF]" />
                  GLOBAL TELEMETRY
                </span>
                <span className="text-[#00D1FF] text-[10px] uppercase">RADAR ACTIVE</span>
              </div>

              {/* 3D Holographic Globe Component */}
              <div className="w-full h-56 flex items-center justify-center relative">
                <HolographicGlobe />
                <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-ping pointer-events-none opacity-20" />
              </div>

              <div className="w-full grid grid-cols-2 gap-2 text-center text-[10px] pt-2 border-t border-white/10">
                <div className="p-2 rounded-none bg-black/60 border border-white/5">
                  <div className="text-white/40 uppercase">STABILITY</div>
                  <div className="text-[#00D1FF] font-bold">99.98%</div>
                </div>
                <div className="p-2 rounded-none bg-black/60 border border-white/5">
                  <div className="text-white/40 uppercase">LATENCY</div>
                  <div className="text-emerald-400 font-bold">&lt;12ms</div>
                </div>
              </div>
            </div>

            {/* Right: Real-time Command Terminal Log (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-none bg-black/40 border border-white/10 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <span className="text-white/70 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00D1FF]" />
                  COMMAND CONSOLE
                </span>
                <span className="text-white/40 text-[9px] uppercase tracking-widest">LIVE STREAM</span>
              </div>

              <div className="space-y-1.5 bg-black p-3 rounded-none border border-white/5 h-64 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="text-[10px] leading-tight text-white/50">
                    <span className="text-[#00D1FF]">&gt;</span> {log}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-white/40 uppercase tracking-widest">
                <span>ENCRYPT: AES-256</span>
                <span className="text-emerald-400">SYNCHRONIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
