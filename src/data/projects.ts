import { ProjectMission } from '../types';

export const MISSIONS: ProjectMission[] = [
  {
    id: 'mission-01',
    missionNumber: 'MISSION 01',
    title: 'TAMILSELVAN PORTFOLIO',
    codename: 'OP: QUANTUM HORIZON',
    category: 'Elite Digital Identity & Showcase',
    status: 'ONLINE',
    statusColor: '#06b6d4',
    tagline: 'High-performance bespoke developer portfolio and modern creative showcase.',
    description: 'A cutting-edge personal showcase and interactive digital platform highlighting modern engineering craft, architectural principles, and full-stack capabilities with fluid visual feedback and dynamic projects.',
    problemStatement: 'Modern developer portfolios frequently suffer from cookie-cutter designs and lack of immersive visual hierarchy that fails to represent high-caliber architectural abilities.',
    solutionArchitecture: 'Engineered with modern frontend components, responsive micro-interactions, dark-mode optimization, and optimized CDN asset pipelines.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel Deployment'],
    liveUrl: 'https://tamilselvank-portfolio.vercel.app/',
    githubUrl: 'https://github.com/csudharsan-hub',
    featured: true,
    clearanceLevel: 1,
    metrics: [
      { label: 'Uptime', value: '99.98%' },
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Load Time', value: '<0.4s' }
    ],
    accent: 'cyan'
  },
  {
    id: 'mission-02',
    missionNumber: 'MISSION 02',
    title: 'SMART SMS',
    codename: 'OP: CELLULAR CIPHER',
    category: 'Communication Technology',
    status: 'ONLINE',
    statusColor: '#3b82f6',
    tagline: 'Intelligent SMS transmission & broadcast management engine.',
    description: 'Next-generation SMS delivery and automated notification infrastructure designed for mission-critical alerts, two-factor authentication, high-throughput campus notifications, and bulk secure dispatching.',
    problemStatement: 'Traditional SMS gateways fail under burst congestion, lack intelligent routing failovers, and introduce unpredictable latency during peak critical broadcast periods.',
    solutionArchitecture: 'Built on asynchronous message queues with priority multi-channel failover algorithms and end-to-end delivery confirmation webhooks.',
    technologies: ['React', 'Node.js', 'REST APIs', 'Cloud Gateway', 'Tailwind CSS'],
    liveUrl: 'https://smart-sms-landing-page-f41yf6vgm-logicallords-alts-projects.vercel.app/',
    clearanceLevel: 2,
    metrics: [
      { label: 'Dispatch Latency', value: '<250ms' },
      { label: 'Burst Capacity', value: '10K/min' },
      { label: 'Delivery Rate', value: '99.9%' }
    ],
    accent: 'blue'
  },
  {
    id: 'mission-03',
    missionNumber: 'MISSION 03',
    title: 'CAMPUS EVENT TRACKER',
    codename: 'OP: NEXUS CHRONOS',
    category: 'Campus Intelligence',
    status: 'ACTIVE',
    statusColor: '#10b981',
    tagline: 'Centralized real-time university event intelligence & registry matrix.',
    description: 'A comprehensive campus-wide event orchestration suite providing instant scheduling, secure student authentication, live attendance telemetry, interactive venue maps, and automated conflict resolution.',
    problemStatement: 'University organizations encounter decentralized communication silos, overlapping venue bookings, and fragmented attendance logging across campus departments.',
    solutionArchitecture: 'Full-stack client-server architecture with role-based access control (RBAC), real-time notification engine, and persistent event databases deployed on Render Cloud.',
    technologies: ['React', 'Node.js', 'Render Cloud', 'PostgreSQL', 'Express', 'JWT Auth'],
    liveUrl: 'https://campus-event-tracker-frontend.onrender.com/login',
    clearanceLevel: 2,
    metrics: [
      { label: 'Active Users', value: '2,500+' },
      { label: 'Events Tracked', value: '150+' },
      { label: 'Conflict Rate', value: '0.00%' }
    ],
    accent: 'emerald'
  },
  {
    id: 'mission-04',
    missionNumber: 'MISSION 04',
    title: 'CLASSIFIED ALLIANCE PROJECT',
    codename: 'OP: PROJECT AEGIS CORE',
    category: 'Autonomous Multi-Agent Matrix',
    status: 'CLASSIFIED',
    statusColor: '#ef4444',
    tagline: 'High-clearance autonomous intelligence network currently under synthesis.',
    description: 'A high-level classified neural network orchestration platform uniting multi-modal models, distributed edge inference, and secure decentralized telemetry for next-gen organizational warfare.',
    problemStatement: 'CLASSIFIED [LEVEL 5 CLEARANCE REQUIRED] // DECRYPT ERROR: ACCESS DENIED',
    solutionArchitecture: 'CLASSIFIED [LEVEL 5 CLEARANCE REQUIRED] // QUANTUM ENCRYPTION ACTIVE',
    technologies: ['Quantum State Models', 'Multi-Agent Swarm', 'Zero-Knowledge Cryptography', 'Edge AI'],
    clearanceLevel: 5,
    metrics: [
      { label: 'Threat Mitigation', value: '99.99%' },
      { label: 'Clearance Code', value: 'ALPHA-9' },
      { label: 'Protocol', value: 'RESTRICTED' }
    ],
    accent: 'crimson'
  }
];
