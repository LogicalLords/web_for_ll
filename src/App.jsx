import Nav from './components/Nav';
import Hero3D from './components/Hero3D';
import About from './components/About';
import TeamInitiative from './components/TeamInitiative';
import MissionFiles from './components/MissionFiles';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-ink">
      <Nav />
      <main>
        <Hero3D />
        <About />
        <TeamInitiative />
        <MissionFiles />
      </main>
      <Footer />
    </div>
  );
}