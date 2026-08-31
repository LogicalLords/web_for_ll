import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Zap, Network, ArrowRight, Cpu, Layers } from 'lucide-react';
import { FOUNDERS } from '../data/founders';
import { Founder } from '../types';
import { soundFx } from '../utils/sound';

interface AllianceNetworkProps {
  onSelectFounder: (founder: Founder) => void;
}

export const AllianceNetwork: React.FC<AllianceNetworkProps> = ({ onSelectFounder }) => {
  const [activeFounder, setActiveFounder] = useState<Founder>(FOUNDERS[0]);

  const handleNodeClick = (founder: Founder) => {
    soundFx.playClick();
    setActiveFounder(founder);
  };

  return (
    <section id="alliance" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Sci-fi backdrop effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            ORGANIZATION ARCHITECTURE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            THE ALLIANCE
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            “Different abilities. Different perspectives. One mission.”
          </p>
        </div>

        {/* Cinematic Interactive Network Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive Energy Topology Grid (7 Cols) */}
          <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-sm hud-panel border border-white/10">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[11px] font-mono">
              <span className="text-white/40 uppercase tracking-wider">NETWORK TOPOLOGY // HEX-CORE LINK</span>
              <span className="text-[#00D1FF] uppercase tracking-wider">NODES CONNECTED: 6/6</span>
            </div>

            {/* Network Nodes Representation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
              {FOUNDERS.map((founder) => {
                const isSelected = activeFounder.id === founder.id;
                return (
                  <button
                    key={founder.id}
                    onClick={() => handleNodeClick(founder)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`relative text-left p-4 rounded-sm border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-white/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                        : 'bg-[#0a0a0a]/60 border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Node Accent Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{
                          backgroundColor: founder.accentHex,
                          boxShadow: `0 0 10px ${founder.accentHex}`,
                        }}
                      />
                      <span className="text-[9px] font-mono text-white/40 group-hover:text-white/60">
                        NODE 0{FOUNDERS.indexOf(founder) + 1}
                      </span>
                    </div>

                    <div className="font-mono font-bold text-xs sm:text-sm text-white group-hover:text-[#00D1FF] transition-colors tracking-wide">
                      {founder.heroCodename}
                    </div>
                    <div className="text-[11px] font-mono text-white/50 mt-1">
                      {founder.name}
                    </div>
                    <div className="text-[10px] font-mono text-white/30 line-clamp-1 mt-1 uppercase">
                      {founder.role}
                    </div>

                    {/* Active Glow Accent Bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-node-indicator"
                        className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#00D1FF] shadow-[0_0_8px_#00D1FF]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Central Synthesis Summary */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-white/40">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00D1FF]" />
                <span className="uppercase tracking-wider">UNIFIED ARCHITECTURE PROTOCOL</span>
              </div>
              <div className="text-[#00D1FF] uppercase tracking-wider">ENERGY HARMONY: 100%</div>
            </div>
          </div>

          {/* Right: Active Selected Founder Dossier Preview (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeFounder.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-sm hud-panel border border-white/10 relative overflow-hidden"
            >
              {/* Background gradient overlay */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-15 pointer-events-none"
                style={{ backgroundColor: activeFounder.accentHex }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase border"
                  style={{
                    backgroundColor: `${activeFounder.accentHex}15`,
                    color: activeFounder.accentHex,
                    borderColor: `${activeFounder.accentHex}40`,
                  }}
                >
                  {activeFounder.archetype}
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ID: #{activeFounder.id.toUpperCase()}
                </span>
              </div>

              <h3 className="font-mono text-2xl font-black text-white mb-1 uppercase tracking-tight">
                {activeFounder.heroCodename}
              </h3>
              <p className="text-xs font-mono text-[#00D1FF] mb-4 uppercase tracking-wider">
                {activeFounder.name} &bull; {activeFounder.role}
              </p>

              <blockquote className="text-xs italic text-white/70 border-l-2 border-[#00D1FF] pl-3 py-1 mb-6 bg-white/[0.02]">
                "{activeFounder.quote}"
              </blockquote>

              <div className="space-y-3 mb-6 text-xs">
                <div className="font-mono text-white/40 font-bold uppercase tracking-widest text-[10px]">
                  Signature Disciplines:
                </div>
                <div className="grid grid-cols-1 gap-2 font-mono text-[11px]">
                  {activeFounder.abilities.map((ability, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white/80 bg-black/40 px-3 py-2 border border-white/5"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" />
                      <span>{ability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onSelectFounder(activeFounder);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full py-3 px-4 rounded-none font-mono font-bold text-[11px] tracking-[0.2em] bg-white text-black hover:bg-[#00D1FF] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                <span>OPEN FULL HERO DOSSIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
