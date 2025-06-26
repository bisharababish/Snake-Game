import React from 'react';
import Navigation from './components/Navigation';
import HeroSlideshow from './components/HeroSlideshow';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import ResearchSection from './components/ResearchSection';
import EventsSection from './components/EventsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSlideshow />
      <AboutSection />
      <ProgramsSection />
      <ResearchSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;