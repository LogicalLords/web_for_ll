import React from 'react';
import { Shield, Github, Radio, Sparkles, Terminal, ChevronUp } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-12 overflow-hidden text-white/50 font-sans text-xs">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Archetype Summary (5 Cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#00D1FF]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-mono font-black text-sm tracking-[0.25em] text-white uppercase">
                THE ALLIANCE
              </span>
            </div>

            <p className="text-xs text-white/80 font-mono uppercase tracking-wider mb-2">
              “Six minds. One mission.”
            </p>
            <p className="text-xs text-white/40 leading-relaxed max-w-sm mb-6 font-light">
              A technology collective founded by six developers building intelligent systems, immersive digital experiences, and unbreakable cloud infrastructure.
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-none bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                ONLINE
              </span>
              <span className="text-[10px] font-mono text-white/30 tracking-widest">
                SECTOR 06 // 13.0827° N, 80.2707° E
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="md:col-span-3">
            <h4 className="font-mono font-bold text-xs text-white uppercase tracking-widest mb-4">
              COMMAND SECTORS
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { id: 'hero', label: '01 // HOME' },
                { id: 'alliance', label: '02 // THE ALLIANCE' },
                { id: 'founders', label: '03 // SIX HEROES' },
                { id: 'missions', label: '04 // ACTIVE MISSIONS' },
                { id: 'armoury', label: '05 // THE ARMOURY' },
                { id: 'hq', label: '06 // COMMAND HQ' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onNavigate(item.id);
                    }}
                    className="text-white/40 hover:text-[#00D1FF] transition-colors cursor-pointer tracking-wider"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Founder GitHub Links (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="font-mono font-bold text-xs text-white uppercase tracking-widest mb-4">
              FOUNDER PROFILES
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { name: 'CSudharsan', handle: 'csudharsan-hub' },
                { name: 'Varunankm', handle: 'varunankm' },
                { name: 'Vijay0414', handle: 'vijay0414' },
                { name: 'Vickyvic07', handle: 'vickyvic07' },
                { name: 'Varunraj-2005', handle: 'varunraj-2005' },
                { name: 'Tamil0219', handle: 'Tamil0219' },
              ].map((founder) => (
                <a
                  key={founder.handle}
                  href={`https://github.com/${founder.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-none bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 text-white/50 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="truncate text-[11px]">{founder.name}</span>
                  <Github className="w-3 h-3 text-white/40 shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-white/40">
          <div>
            &copy; {new Date().getFullYear()} THE ALLIANCE. ALL RIGHTS RESERVED. // SIX HEROES. ONE ALLIANCE.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-1.5 text-[#00D1FF] hover:text-white transition-colors cursor-pointer bg-white/[0.03] px-3 py-1.5 rounded-none border border-white/10 uppercase tracking-widest"
          >
            <span>RETURN TO TOP</span>
            <ChevronUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
