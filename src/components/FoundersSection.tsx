import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Shield, Zap, Sparkles, UserCheck, ArrowRight, Activity } from 'lucide-react';
import { FOUNDERS } from '../data/founders';
import { Founder } from '../types';
import { soundFx } from '../utils/sound';

interface FoundersSectionProps {
  onSelectFounder: (founder: Founder) => void;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({ onSelectFounder }) => {
  return (
    <section id="founders" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Sci-fi Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            THE SIX SPECIALISTS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            FOUNDERS & HERO ROSTER
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            Six distinct minds uniting deep technological domains. Explore individual dossiers, combat metrics, and project intelligence.
          </p>
        </div>

        {/* 6 Founders Interactive Dossier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOUNDERS.map((founder, index) => (
            <FounderCard
              key={founder.id}
              founder={founder}
              index={index}
              onOpen={() => {
                soundFx.playClick();
                onSelectFounder(founder);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FounderCardProps {
  founder: Founder;
  index: number;
  onOpen: () => void;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, index, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => soundFx.playHover()}
      className="relative rounded-sm p-6 hud-panel hud-panel-hover border border-white/10 transition-all duration-200 group flex flex-col justify-between overflow-hidden"
    >
      {/* Sci-fi HUD corners */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Ambient background glow on hover */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: founder.accentHex }}
      />

      <div>
        {/* Card Header: Node Index & Archetype */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            HERO NODE // 0{index + 1}
          </span>
          <span
            className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border"
            style={{
              backgroundColor: `${founder.accentHex}15`,
              color: founder.accentHex,
              borderColor: `${founder.accentHex}35`,
            }}
          >
            {founder.archetype.split('&')[0]}
          </span>
        </div>

        {/* Hero Codename & Founder Name */}
        <h3 className="font-mono text-xl sm:text-2xl font-black text-white group-hover:text-[#00D1FF] transition-colors mb-1 uppercase tracking-tight">
          {founder.heroCodename}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs text-white/90 font-bold uppercase">
            {founder.name}
          </span>
          <span className="text-[11px] text-white/40 font-mono">
            (@{founder.github})
          </span>
        </div>

        {/* Role & Specialisation */}
        <p className="text-xs text-white/60 font-light mb-5 min-h-[36px] line-clamp-2 leading-relaxed">
          {founder.specialisation}
        </p>

        {/* Power Metrics Mini-Gauge */}
        <div className="bg-black/50 p-3 rounded-sm border border-white/5 mb-5 font-mono">
          <div className="flex items-center justify-between text-[10px] mb-2 text-white/40 uppercase">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00D1FF]" />
              TECH SYNERGY
            </span>
            <span className="font-bold text-white">
              {Math.round(
                (founder.stats.architecture +
                  founder.stats.intelligence +
                  founder.stats.energyProjection) /
                  3
              )}%
            </span>
          </div>

          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.round(
                  (founder.stats.architecture +
                    founder.stats.intelligence +
                    founder.stats.energyProjection) /
                    3
                )}%`,
                backgroundColor: founder.accentHex,
              }}
            />
          </div>

          <div className="mt-2 text-[9px] text-white/40 flex justify-between uppercase tracking-wider">
            <span>ARCH: {founder.stats.architecture}%</span>
            <span>INTEL: {founder.stats.intelligence}%</span>
            <span>SPEED: {founder.stats.speed}%</span>
          </div>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {founder.techMatrix.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/60 uppercase"
            >
              {tech}
            </span>
          ))}
          {founder.techMatrix.length > 4 && (
            <span className="px-2 py-0.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/40">
              +{founder.techMatrix.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
        <a
          href={founder.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            soundFx.playClick();
          }}
          className="p-2.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
          title={`View ${founder.name}'s GitHub`}
        >
          <Github className="w-4 h-4" />
        </a>

        <button
          onClick={onOpen}
          className="flex-1 py-2.5 px-4 rounded-none bg-white text-black hover:bg-[#00D1FF] font-mono font-bold text-[11px] tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <span>VIEW DOSSIER</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
