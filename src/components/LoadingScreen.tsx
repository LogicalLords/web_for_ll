import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Cpu, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>('IGNITING CORE REACTOR');
  const [nodesLocked, setNodesLocked] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }

        // Update narrative stages
        if (next < 25) {
          setStage('IGNITING ARC CORE MATRIX...');
          setNodesLocked(1);
        } else if (next < 50) {
          setStage('CALIBRATING ORBITAL ENERGY RINGS...');
          setNodesLocked(3);
        } else if (next < 75) {
          setStage('LOCKING 6 HERO TELEMETRY SIGNATURES...');
          setNodesLocked(5);
        } else if (next < 95) {
          setStage('SYNCHRONIZING ALLIANCE DEFENSE GRID...');
          setNodesLocked(6);
        } else {
          setStage('ALLIANCE SYSTEM FULLY ONLINE');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    soundFx.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none overflow-hidden"
      >
        {/* Background Grid & Scanlines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />

        {/* Reactor Animation Core Container */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-8">
          {/* Outer Ring 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-white/20"
          />

          {/* Outer Ring 2 with ticks */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-white/10 border-t-[#00D1FF] border-r-transparent"
          />

          {/* Concentric Ring 3 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-10 rounded-full border border-white/10 border-b-[#00D1FF]"
          />

          {/* 6 Hero Energy Points orbiting on perimeter */}
          {[0, 60, 120, 180, 240, 300].map((deg, index) => (
            <motion.div
              key={deg}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: nodesLocked > index ? 1 : 0.4,
                opacity: nodesLocked > index ? 1 : 0.2,
              }}
              transition={{ duration: 0.3 }}
              style={{
                transform: `rotate(${deg}deg) translate(120px) rotate(-${deg}deg)`,
              }}
              className="absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full bg-[#00D1FF] flex items-center justify-center shadow-[0_0_10px_#00D1FF]"
            >
              <span className="w-1 h-1 rounded-full bg-white" />
            </motion.div>
          ))}

          {/* Core Emblem Reactor */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-28 h-28 rounded-full bg-black border border-[#00D1FF]/60 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <Shield className="w-8 h-8 text-[#00D1FF] mb-1" />
            <span className="text-[9px] font-mono font-black tracking-[0.25em] text-white">
              ALLIANCE
            </span>
          </motion.div>
        </div>

        {/* Text & Telemetry Status */}
        <div className="text-center px-4 max-w-md w-full font-mono">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-lg sm:text-xl font-black tracking-[0.3em] text-white uppercase">
              THE ALLIANCE
            </h2>
          </div>

          <p className="text-[11px] text-[#00D1FF] mb-5 tracking-widest h-5 uppercase">
            {stage}
          </p>

          {/* Progress Bar Container */}
          <div className="relative w-full h-1.5 rounded-none bg-black border border-white/10 overflow-hidden mb-3">
            <motion.div
              className="h-full bg-[#00D1FF]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/40 tracking-wider uppercase">
            <span>NODES: {nodesLocked}/6 LOCKED</span>
            <span className="text-white font-bold">{progress}% READY</span>
          </div>
        </div>

        {/* Skip button for instant entry */}
        <button
          onClick={handleSkip}
          className="mt-8 px-4 py-1.5 rounded-none border border-white/15 hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-mono text-white/60 hover:text-white transition-all cursor-pointer uppercase tracking-widest"
        >
          BYPASS INITIALIZATION &rarr;
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
