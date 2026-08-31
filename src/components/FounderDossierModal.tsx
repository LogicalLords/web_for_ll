import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Shield, Zap, Sparkles, Code2, Star, GitFork, BookOpen } from 'lucide-react';
import { Founder } from '../types';
import { fetchGitHubUser, fetchGitHubRepos, GitHubUserData, GitHubRepoData } from '../utils/github';
import { soundFx } from '../utils/sound';

interface FounderDossierModalProps {
  founder: Founder | null;
  onClose: () => void;
}

export const FounderDossierModal: React.FC<FounderDossierModalProps> = ({ founder, onClose }) => {
  const [githubUser, setGithubUser] = useState<GitHubUserData | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepoData[]>([]);
  const [loadingGit, setLoadingGit] = useState<boolean>(true);

  useEffect(() => {
    if (!founder) return;

    soundFx.playPowerUp();
    setLoadingGit(true);

    let isMounted = true;
    Promise.all([
      fetchGitHubUser(founder.github),
      fetchGitHubRepos(founder.github),
    ]).then(([userData, repoData]) => {
      if (isMounted) {
        setGithubUser(userData);
        setGithubRepos(repoData);
        setLoadingGit(false);
      }
    });

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [founder, onClose]);

  if (!founder) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        {/* Backdrop dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Dossier Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/15 rounded-sm p-6 sm:p-8 z-10 shadow-2xl text-white font-sans"
        >
          {/* Sci-fi HUD Corners */}
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: founder.accentHex }}
              />
              <span className="font-mono text-xs text-[#00D1FF] tracking-widest uppercase">
                CONFIDENTIAL // ALLIANCE HERO DOSSIER #{founder.id.toUpperCase()}
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

          {/* Hero Profile Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* Avatar & Hero Identity */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative w-36 h-36 rounded-none p-0.5 border border-white/20 mb-4 overflow-hidden bg-black">
                <img
                  src={githubUser?.avatar_url || founder.fallbackAvatar}
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div
                className="inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border mb-2"
                style={{
                  backgroundColor: `${founder.accentHex}15`,
                  color: founder.accentHex,
                  borderColor: `${founder.accentHex}40`,
                }}
              >
                {founder.archetype}
              </div>

              <h2 className="font-mono text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {founder.heroCodename}
              </h2>
              <div className="font-mono text-xs text-[#00D1FF] mb-1 uppercase tracking-wider">
                {founder.name} (@{founder.github})
              </div>
              <div className="text-xs text-white/50 mb-4 font-mono uppercase">
                {founder.role}
              </div>

              {/* GitHub Link & Portfolio Button */}
              <div className="flex flex-wrap gap-2 w-full">
                <a
                  href={founder.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 py-2 px-3 rounded-none bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-white"
                >
                  <Github className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>GITHUB</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </a>

                {founder.portfolioUrl && (
                  <a
                    href={founder.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex-1 py-2 px-3 rounded-none bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[#00D1FF] text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PORTFOLIO</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Power Statistics Gauge Breakdown */}
            <div className="md:col-span-7 bg-black/50 p-5 rounded-none border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                <span className="text-xs font-mono text-white/50 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00D1FF]" />
                  COMBAT & INTEL METRICS
                </span>
                <span className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-wider">CLASS: S-TIER</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                {[
                  { label: 'System Architecture', val: founder.stats.architecture },
                  { label: 'Intelligence & Logic', val: founder.stats.intelligence },
                  { label: 'Speed & Agility', val: founder.stats.speed },
                  { label: 'Durability & Defense', val: founder.stats.durability },
                  { label: 'Combat & Problem Solving', val: founder.stats.combat },
                  { label: 'Energy Projection & Output', val: founder.stats.energyProjection },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1 text-white/70">
                      <span className="text-[11px] uppercase">{stat.label}</span>
                      <span className="text-[#00D1FF] font-bold">{stat.val}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                      <div
                        className="h-full transition-all duration-700"
                        style={{
                          width: `${stat.val}%`,
                          backgroundColor: founder.accentHex,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Signature Weapon Banner */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 uppercase tracking-wider">SIGNATURE WEAPON:</span>
                <span className="text-white font-bold" style={{ color: founder.accentHex }}>
                  {founder.signatureWeapon}
                </span>
              </div>
            </div>
          </div>

          {/* Lore & Background */}
          <div className="mb-6 p-4 rounded-none bg-black/40 border border-white/10">
            <h4 className="text-xs font-mono text-[#00D1FF] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00D1FF]" />
              ARCHETYPE BACKGROUND & MISSION LORE
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-3">
              {founder.lore}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white/50">
              {founder.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Public Live Data & Repositories */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-white/60 font-bold uppercase tracking-widest flex items-center gap-2">
                <Github className="w-4 h-4 text-[#00D1FF]" />
                PUBLIC GITHUB INTELLIGENCE
              </h4>
              {githubUser && (
                <span className="text-xs font-mono text-white/40">
                  {githubUser.public_repos} Repos &bull; {githubUser.followers} Followers
                </span>
              )}
            </div>

            {loadingGit ? (
              <div className="p-6 text-center text-xs font-mono text-white/40 animate-pulse">
                RETRIEVING GITHUB DATA MATRIX...
              </div>
            ) : githubRepos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {githubRepos.slice(0, 3).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-none bg-black/60 border border-white/10 hover:border-[#00D1FF]/60 transition-all text-xs group"
                  >
                    <div className="font-mono font-bold text-white group-hover:text-[#00D1FF] truncate mb-1">
                      {repo.name}
                    </div>
                    <p className="text-[11px] text-white/50 line-clamp-2 h-8 mb-2 font-light">
                      {repo.description || 'Public repository under active development.'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>{repo.language || 'Code'}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-400" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork className="w-3 h-3" /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-none bg-black/40 border border-white/10 text-xs font-mono text-white/40 flex items-center justify-between">
                <span>View latest open-source activities on GitHub.</span>
                <a
                  href={founder.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00D1FF] hover:underline uppercase"
                >
                  Visit Profile &rarr;
                </a>
              </div>
            )}
          </div>

          {/* Tech Matrix Arsenal */}
          <div>
            <h4 className="text-xs font-mono text-white/50 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#00D1FF]" />
              SPECIALIZED TECH ARSENAL
            </h4>
            <div className="flex flex-wrap gap-2">
              {founder.techMatrix.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-none bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
