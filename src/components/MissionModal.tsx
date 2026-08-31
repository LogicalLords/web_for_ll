import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ShieldAlert, Cpu, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { ProjectMission } from '../types';
import { soundFx } from '../utils/sound';

interface MissionModalProps {
  mission: ProjectMission | null;
  onClose: () => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  useEffect(() => {
    if (!mission) return;

    if (mission.status === 'CLASSIFIED') {
      soundFx.playAccessDenied();
    } else {
      soundFx.playPowerUp();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mission, onClose]);

  if (!mission) return null;

  const isClassified = mission.status === 'CLASSIFIED';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border rounded-sm p-6 sm:p-8 z-10 shadow-2xl text-white font-sans ${
            isClassified ? 'border-red-500/50' : 'border-white/15'
          }`}
        >
          {/* HUD Corner Clips */}
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full animate-ping ${
                  isClassified ? 'bg-red-500' : 'bg-[#00D1FF]'
                }`}
              />
              <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                TACTICAL MISSION DIRECTIVE // {mission.missionNumber}
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-none bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Classified Lockout Display */}
          {isClassified ? (
            <div className="text-center py-10 px-4 font-mono">
              <div className="w-16 h-16 mx-auto rounded-none bg-red-950/40 border border-red-500/60 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-red-400 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-red-400 mb-2 uppercase tracking-tight">
                ACCESS LEVEL INSUFFICIENT
              </h3>
              <p className="text-xs text-white/50 max-w-md mx-auto mb-6 uppercase tracking-wider">
                CLEARANCE LEVEL 5 REQUIRED. THIS ALLIANCE ASSET IS PROTECTED BY QUANTUM DECRYPTION PROTOCOLS.
              </p>
              <div className="p-3 bg-red-950/20 border border-red-500/20 max-w-md mx-auto text-[11px] text-red-400 uppercase tracking-widest">
                STATUS: ACTIVE RESEARCH & SYNERGY // RESERVED FOR NEXT ALLIANCE BREAKTHROUGH
              </div>
            </div>
          ) : (
            <div>
              {/* Mission Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-[#00D1FF]">
                    {mission.category}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                    STATUS: {mission.status}
                  </span>
                </div>

                <h2 className="font-mono text-2xl sm:text-3xl font-black text-white mb-1 uppercase tracking-tight">
                  {mission.title}
                </h2>
                <div className="text-xs font-mono text-[#00D1FF] mb-3 uppercase tracking-wider">
                  CODENAME: {mission.codename}
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {mission.description}
                </p>
              </div>

              {/* Problem & Solution Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {mission.problemStatement && (
                  <div className="p-4 rounded-none bg-black/50 border border-white/10 text-xs">
                    <div className="font-mono font-bold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      PROBLEM PARAMETERS
                    </div>
                    <p className="text-white/70 leading-relaxed font-light">
                      {mission.problemStatement}
                    </p>
                  </div>
                )}

                {mission.solutionArchitecture && (
                  <div className="p-4 rounded-none bg-black/50 border border-white/10 text-xs">
                    <div className="font-mono font-bold text-[#00D1FF] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ALLIANCE ARCHITECTURE
                    </div>
                    <p className="text-white/70 leading-relaxed font-light">
                      {mission.solutionArchitecture}
                    </p>
                  </div>
                )}
              </div>

              {/* Mission Telemetry Metrics */}
              {mission.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-none bg-black/40 border border-white/10 font-mono">
                  {mission.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="font-bold text-base sm:text-lg text-[#00D1FF]">
                        {metric.value}
                      </div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Used */}
              <div className="mb-8">
                <div className="text-xs font-mono text-white/50 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00D1FF]" />
                  TACTICAL TECH STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {mission.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-none bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Links Action Bar */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {mission.liveUrl && (
                  <a
                    href={mission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex-1 py-3 px-5 rounded-none font-mono font-bold text-xs tracking-[0.2em] bg-white text-black hover:bg-[#00D1FF] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <span>LAUNCH LIVE SYSTEM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {mission.githubUrl && (
                  <a
                    href={mission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="py-3 px-5 rounded-none font-mono font-bold text-xs tracking-[0.15em] bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <Github className="w-4 h-4 text-[#00D1FF]" />
                    <span>SOURCE PROTOCOL</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
