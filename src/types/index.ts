export type HeroAccentColor = 'cyan' | 'blue' | 'purple' | 'amber' | 'crimson' | 'emerald';

export interface FounderPowerStats {
  architecture: number;
  intelligence: number;
  speed: number;
  durability: number;
  combat: number;
  energyProjection: number;
}

export interface Founder {
  id: string;
  name: string;
  github: string;
  heroCodename: string;
  archetype: string;
  role: string;
  specialisation: string;
  abilities: string[];
  signatureWeapon: string;
  lore: string;
  quote: string;
  accent: HeroAccentColor;
  accentHex: string;
  secondaryHex: string;
  stats: FounderPowerStats;
  profileUrl: string;
  portfolioUrl?: string;
  fallbackAvatar: string;
  highlights: string[];
  techMatrix: string[];
}

export interface ProjectMission {
  id: string;
  missionNumber: string;
  title: string;
  codename: string;
  category: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED' | 'CLASSIFIED';
  statusColor: string;
  tagline: string;
  description: string;
  problemStatement?: string;
  solutionArchitecture?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  clearanceLevel: number;
  metrics?: { label: string; value: string }[];
  accent: HeroAccentColor;
}

export interface TechnologyItem {
  name: string;
  category: 'AI & ML' | 'Web Systems' | 'Backend & Cloud' | 'DevOps & Security';
  weaponCodename: string;
  powerLevel: number;
  description: string;
  accent: string;
  iconName: string;
}

export interface SystemTelemetry {
  reactorOutput: number;
  systemStatus: string;
  activeHeroes: number;
  activeMissions: number;
  threatLevel: string;
  gridStability: number;
  coreTemperature: number;
}
