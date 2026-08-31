import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crosshair, Zap, Cpu, Flame, Box, Shield, Server, Layers, Terminal, Sparkles } from 'lucide-react';
import { ARMOURY_TECH } from '../data/technologies';
import { TechnologyItem } from '../types';
import { soundFx } from '../utils/sound';

export const ArmourySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedWeapon, setSelectedWeapon] = useState<TechnologyItem>(ARMOURY_TECH[0]);

  const categories = ['ALL', 'AI & ML', 'Web Systems', 'Backend & Cloud', 'DevOps & Security'];

  const filteredTech =
    activeCategory === 'ALL'
      ? ARMOURY_TECH
      : ARMOURY_TECH.filter((item) => item.category === activeCategory);

  const handleSelectWeapon = (item: TechnologyItem) => {
    soundFx.playClick();
    setSelectedWeapon(item);
  };

  return (
    <section id="armoury" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            ARSENAL & CAPABILITIES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            THE ARMOURY
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            Technologies forged into high-precision weaponry. Explore our tactical stack across artificial intelligence, modern web frameworks, distributed backends, and cloud infrastructure.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-1.5 rounded-none text-[11px] font-mono font-bold tracking-widest uppercase transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Armoury Grid & Weapon Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTech.map((item, index) => {
              const isSelected = selectedWeapon.name === item.name;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => handleSelectWeapon(item)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-4 rounded-sm border transition-all cursor-pointer relative group flex flex-col justify-between hud-panel ${
                    isSelected
                      ? 'border-[#00D1FF] glow-cyan bg-black/80'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-1.5">
                      <span className="text-[9px] font-mono text-[#00D1FF] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-white/60">
                        PWR {item.powerLevel}%
                      </span>
                    </div>

                    <div className="font-mono font-bold text-sm text-white group-hover:text-[#00D1FF] transition-colors mb-0.5 uppercase tracking-tight">
                      {item.name}
                    </div>

                    <div className="text-[10px] font-mono text-white/40 mb-2 flex items-center gap-1 uppercase">
                      <Crosshair className="w-3 h-3 text-[#00D1FF]" />
                      <span>{item.weaponCodename}</span>
                    </div>

                    <p className="text-[11px] text-white/50 line-clamp-2 mb-3 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full h-1 bg-white/5 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${item.powerLevel}%`,
                        backgroundColor: item.accent,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Weapon Blueprint Inspector (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 sm:p-7 rounded-sm hud-panel border border-white/15 relative overflow-hidden">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
                <span className="text-white/40 uppercase tracking-wider">WEAPON SPECIFICATION</span>
                <span className="text-[#00D1FF] uppercase tracking-wider">TACTICAL</span>
              </div>

              <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#00D1FF]">
                <Cpu className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                {selectedWeapon.category}
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-black text-white mb-1 uppercase tracking-tight">
                {selectedWeapon.name}
              </h3>
              <div className="text-xs font-mono text-[#00D1FF] font-bold mb-4 uppercase tracking-wider">
                CODENAME: {selectedWeapon.weaponCodename}
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
                {selectedWeapon.description}
              </p>

              {/* Power Level Stat */}
              <div className="bg-black/50 p-4 rounded-none border border-white/10 mb-6 font-mono">
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-white/40 uppercase tracking-wider">ENERGY OUTPUT</span>
                  <span className="text-[#00D1FF] font-bold">{selectedWeapon.powerLevel}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${selectedWeapon.powerLevel}%`,
                      backgroundColor: selectedWeapon.accent,
                    }}
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-white/40 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>INTEGRATED IN ALLIANCE STACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
