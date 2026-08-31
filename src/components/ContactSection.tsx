import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Send, CheckCircle2, Shield, Sparkles, Terminal, Mail, MessageSquare } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    codename: '',
    email: '',
    sector: 'Partnership / Project Alliance',
    transmission: '',
  });
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codename || !formData.email || !formData.transmission) return;

    soundFx.playPowerUp();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsTransmitted(true);
    }, 900);
  };

  const handleReset = () => {
    soundFx.playClick();
    setIsTransmitted(false);
    setFormData({
      codename: '',
      email: '',
      sector: 'Partnership / Project Alliance',
      transmission: '',
    });
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-white/10 px-3 py-1 text-[9px] font-mono tracking-[0.3em] uppercase text-[#00D1FF] mb-4 bg-white/[0.02]">
            SECURE TRANSMISSION CONDUIT
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-3">
            THE MISSION CONTINUES
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light">
            Ready to initiate a new technological directive with The Alliance? Transmit your signal directly to our core headquarters.
          </p>
        </div>

        {/* Transmission Interface Card */}
        <div className="max-w-3xl mx-auto relative rounded-sm p-6 sm:p-10 hud-panel border border-white/15 shadow-2xl">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {isTransmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-4 font-mono"
            >
              <div className="w-16 h-16 rounded-none bg-emerald-950/40 border border-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 uppercase tracking-tight">
                TRANSMISSION RECEIVED & ENCRYPTED
              </h3>
              <p className="text-xs text-[#00D1FF] mb-6 max-w-md mx-auto uppercase tracking-wider">
                Signal routed to Alliance Sector 06. The team will establish contact via secure channels shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-none bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#00D1FF] transition-colors cursor-pointer"
              >
                SEND ANOTHER TRANSMISSION &rarr;
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                <span className="text-white/40 flex items-center gap-1.5 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-[#00D1FF]" />
                  ENCRYPTED TRANSMISSION PROTOCOL // TLS-256
                </span>
                <span className="text-[#00D1FF] uppercase tracking-wider">READY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-white/50 font-bold uppercase tracking-widest mb-2">
                    IDENTIFIER / CODENAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commander Alex"
                    value={formData.codename}
                    onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 focus:border-[#00D1FF] focus:outline-none text-white text-xs font-mono placeholder:text-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/50 font-bold uppercase tracking-widest mb-2">
                    COMMUNICATION FREQUENCY (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. commander@alliance.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 focus:border-[#00D1FF] focus:outline-none text-white text-xs font-mono placeholder:text-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/50 font-bold uppercase tracking-widest mb-2">
                  DIRECTIVE SECTOR
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 focus:border-[#00D1FF] focus:outline-none text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  <option className="bg-black text-white">Partnership / Project Alliance</option>
                  <option className="bg-black text-white">Enterprise AI & Architecture Consultation</option>
                  <option className="bg-black text-white">Full-Stack Engineering Mission</option>
                  <option className="bg-black text-white">Security & Infrastructure Hardening</option>
                  <option className="bg-black text-white">General Inquiries & Recruitment</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/50 font-bold uppercase tracking-widest mb-2">
                  TACTICAL TRANSMISSION DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe project parameters, technology requirements, or partnership proposal..."
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 focus:border-[#00D1FF] focus:outline-none text-white text-xs font-mono placeholder:text-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full py-4 px-6 rounded-none font-mono font-bold text-xs tracking-[0.2em] bg-white text-black hover:bg-[#00D1FF] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase"
              >
                {isSending ? (
                  <span>TRANSMITTING SIGNAL...</span>
                ) : (
                  <>
                    <span>DISPATCH SECURE TRANSMISSION</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
