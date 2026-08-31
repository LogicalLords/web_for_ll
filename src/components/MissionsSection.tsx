import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Shield, Lock, Sparkles, ArrowRight, Layers, Eye } from 'lucide-react';
import { MISSIONS } from '../data/projects';
import { ProjectMission } from '../types';
import { soundFx } from '../utils/sound';

interface MissionsSectionProps {
  onSelectMission: (mission: ProjectMission) => void;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ onSelectMission }) => {
  const featuredMission = MISSIONS.find((m) => m.featured) || MISSIONS[0];
  const otherMissions = MISSIONS.filter((m) => !m.featured);

  return (
    <section id="missions" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            OPERATIONAL DEPLOYMENTS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            ACTIVE MISSIONS
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            Real-world technology systems deployed into active duty. From intelligent communication pipelines to campus telemetry networks.
          </p>
        </div>

        {/* Featured Mission 01: Tamilselvan Portfolio */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-sm p-6 sm:p-10 hud-panel border border-white/15 overflow-hidden group glow-cyan"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details (6 Cols) */}
              <div className="lg:col-span-6 z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-[#00D1FF]">
                    FEATURED {featuredMission.missionNumber}
                  </span>
                  <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE
                  </span>
                </div>

                <h3 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-2">
                  {featuredMission.title}
                </h3>
                <div className="text-xs font-mono text-[#00D1FF] mb-4 uppercase tracking-wider">
                  {featuredMission.codename} &bull; {featuredMission.category}
                </div>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                  {featuredMission.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredMission.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-none bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={featuredMission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="px-6 py-3 rounded-none font-mono font-bold text-xs tracking-[0.2em] bg-white text-black hover:bg-[#00D1FF] transition-colors flex items-center gap-2 cursor-pointer uppercase"
                  >
                    <span>LAUNCH LIVE SYSTEM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectMission(featuredMission);
                    }}
                    className="px-5 py-3 rounded-none font-mono font-bold text-xs tracking-[0.2em] bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center gap-2 cursor-pointer uppercase"
                  >
                    <span>BLUEPRINT</span>
                    <Eye className="w-3.5 h-3.5 text-[#00D1FF]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Showcase Frame (6 Cols) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-sm bg-black/60 border border-white/10 p-2 overflow-hidden shadow-2xl">
                  {/* Browser-like HUD frame */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black rounded-t-sm mb-2 text-xs font-mono text-white/40">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] text-[#00D1FF] truncate max-w-[200px]">
                      tamilselvank-portfolio.vercel.app
                    </span>
                    <span className="text-[9px] text-white/40 uppercase">HTTPS 256-BIT</span>
                  </div>

                  {/* Interactive preview box */}
                  <div className="relative h-64 sm:h-72 rounded-sm bg-black flex flex-col items-center justify-center text-center p-6 border border-white/5 overflow-hidden">
                    <div className="w-14 h-14 rounded-none bg-white/5 border border-[#00D1FF]/40 flex items-center justify-center mb-4 text-[#00D1FF]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="font-mono font-bold text-base text-white mb-1 uppercase tracking-wider">
                      TAMILSELVAN PORTFOLIO
                    </div>
                    <p className="text-xs text-white/50 max-w-sm mb-5 font-light">
                      Direct live deployment online on Vercel edge network.
                    </p>
                    <a
                      href={featuredMission.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono font-bold text-[11px] tracking-widest hover:bg-[#00D1FF] transition-colors cursor-pointer uppercase"
                    >
                      OPEN IN NEW TAB &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other 3 Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherMissions.map((mission, index) => {
            const isClassified = mission.status === 'CLASSIFIED';
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => {
                  soundFx.playClick();
                  onSelectMission(mission);
                }}
                className={`relative rounded-sm p-6 hud-panel hud-panel-hover border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                  isClassified
                    ? 'border-red-500/20 hover:border-red-500/60'
                    : 'border-white/10 hover:border-[#00D1FF]/60'
                }`}
              >
                <div className="hud-corner-tl" />
                <div className="hud-corner-br" />

                <div>
                  {/* Status Banner */}
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                      {mission.missionNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest border ${
                        isClassified
                          ? 'bg-red-950/40 border-red-500/30 text-red-400'
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>

                  <h4 className="font-mono text-lg font-bold text-white group-hover:text-[#00D1FF] transition-colors mb-1 uppercase tracking-tight">
                    {mission.title}
                  </h4>
                  <div className="text-[11px] font-mono text-white/40 mb-3 uppercase">
                    {mission.category}
                  </div>

                  <p className="text-xs text-white/60 font-light leading-relaxed mb-6 min-h-[48px] line-clamp-3">
                    {mission.tagline}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mission.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/60 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  {isClassified ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-red-400 tracking-wider">
                      <Lock className="w-3.5 h-3.5" />
                      <span>ACCESS RESTRICTED</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#00D1FF] uppercase tracking-wider">
                      <span>VIEW MISSION</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-white/30 uppercase">
                    LVL {mission.clearanceLevel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
