import { useDeviceCapability } from '../lib/device';
import { ROSTER } from '../data/roster';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import DossierCard from './DossierCard';

export default function TeamInitiative() {
  const cap = useDeviceCapability();

  return (
    <section id="initiative" className="relative scroll-mt-14 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader index="02" kicker="The Initiative" title="Dossier Roster" accent="text-avengers">
          Six agents on file. Select a dossier to declassify — every member ships under a real
          GitHub handle. Cards tilt toward your cursor and flip to reveal the mission details.
        </SectionHeader>

        <div className="grid content-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROSTER.map((member, i) => (
            <Reveal key={member.id} delay={(i % 3) * 0.08}>
              <DossierCard member={member} cap={cap} />
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[9px] uppercase tracking-[0.4em] text-muted">
          Holograms rendered from original primitive geometry // no copyrighted assets
        </p>
      </div>
    </section>
  );
}