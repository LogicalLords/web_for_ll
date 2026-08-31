import React, { useState, useEffect } from 'react';
import { Shield, Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getIsMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'alliance', label: 'THE ALLIANCE' },
    { id: 'founders', label: 'FOUNDERS' },
    { id: 'missions', label: 'PROJECTS' },
    { id: 'armoury', label: 'TECHNOLOGY' },
    { id: 'hq', label: 'HQ' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleToggleSound = () => {
    const isUnmuted = soundFx.toggleMute();
    setIsAudioMuted(!isUnmuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
          : 'py-5 sm:py-6 bg-black/40 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Organization Emblem */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 border-2 border-[#00D1FF] rotate-45 flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,209,255,0.4)]">
            <div className="w-3.5 h-3.5 bg-[#00D1FF] group-hover:bg-white transition-colors" />
          </div>
          <div>
            <span className="font-mono text-sm tracking-[0.3em] font-semibold text-white group-hover:text-[#00D1FF] transition-colors">
              THE ALLIANCE
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] tracking-[0.2em] font-mono uppercase">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#00D1FF] shadow-[0_0_8px_#00D1FF]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Channel Telemetry & Status Indicator & Sound Toggle */}
        <div className="flex items-center gap-3.5">
          {/* Status badge */}
          <div className="hidden sm:block text-right">
            <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center justify-end gap-1.5">
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
              SECURE CHANNEL v2.4
            </div>
          </div>

          <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center bg-white/[0.02]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => soundFx.playHover()}
            title={isAudioMuted ? 'Enable HQ Audio Effects' : 'Mute HQ Audio'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              !isAudioMuted
                ? 'bg-[#00D1FF]/10 border-[#00D1FF] text-[#00D1FF]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'
            }`}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span className="hidden xl:inline">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <span className="hidden xl:inline">SFX: OFF</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-sm bg-white/5 border border-white/10 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505]/95 border-b border-white/10 backdrop-blur-2xl px-6 py-5 mt-2 transition-all">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-sm text-xs font-mono tracking-wider ${
                  activeSection === item.id
                    ? 'text-white bg-white/10 border border-[#00D1FF]'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#00D1FF]" />
              HQ STATUS: OPERATIONAL
            </span>
            <span className="text-[#00D1FF]">6 HEROES</span>
          </div>
        </div>
      )}
    </header>
  );
};
