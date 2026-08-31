import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AllianceNetwork } from './components/AllianceNetwork';
import { FoundersSection } from './components/FoundersSection';
import { FounderDossierModal } from './components/FounderDossierModal';
import { MissionsSection } from './components/MissionsSection';
import { MissionModal } from './components/MissionModal';
import { ArmourySection } from './components/ArmourySection';
import { HQDashboard } from './components/HQDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Founder, ProjectMission } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [selectedMission, setSelectedMission] = useState<ProjectMission | null>(null);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'alliance', 'founders', 'missions', 'armoury', 'hq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00D1FF]/20 selection:text-[#00D1FF]">
      {/* Cinematic Reactor Loading Experience */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Futuristic Desktop Custom Cursor */}
          <CustomCursor />

          {/* Floating HUD Navbar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />

          {/* Main Content Sections */}
          <main>
            {/* 1. Hero Section & Interactive 3D Reactor */}
            <Hero
              onEnterHQ={() => scrollToSection('alliance')}
              onMeetFounders={() => scrollToSection('founders')}
              onSelectFounder={(founder) => setSelectedFounder(founder)}
            />

            {/* 2. The Alliance Organization Network */}
            <AllianceNetwork
              onSelectFounder={(founder) => setSelectedFounder(founder)}
            />

            {/* 3. The 6 Founders Superhero Roster */}
            <FoundersSection
              onSelectFounder={(founder) => setSelectedFounder(founder)}
            />

            {/* 4. Active Missions / Projects */}
            <MissionsSection
              onSelectMission={(mission) => setSelectedMission(mission)}
            />

            {/* 5. The Armoury / Technology Weapons */}
            <ArmourySection />

            {/* 6. HQ Control Room Dashboard & 3D Globe */}
            <HQDashboard />

            {/* 7. Transmission / Contact Terminal */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer onNavigate={scrollToSection} />

          {/* Full-Screen Superhero Founder Dossier Modal */}
          <FounderDossierModal
            founder={selectedFounder}
            onClose={() => setSelectedFounder(null)}
          />

          {/* Tactical Mission Blueprint Modal */}
          <MissionModal
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        </>
      )}
    </div>
  );
}
