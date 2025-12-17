import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AccentureCard } from '@/components/AccentureCard';
import { Preloader } from '@/components/Preloader';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { setupGlobalClickSound } from '@/hooks/useClickSound';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Setup global click sound for buttons, links, cards
  useEffect(() => {
    const cleanup = setupGlobalClickSound();
    return cleanup;
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <Helmet>
        <title>Ritik Raj — Full-stack Developer & Software Engineer</title>
        <meta 
          name="description" 
          content="Full-stack developer from IIIT Guwahati specializing in React, Node.js, and AI/ML solutions. Building scalable, impactful software that drives business value." 
        />
        <meta name="keywords" content="Full-stack Developer, Software Engineer, React, Node.js, IIIT Guwahati, AI ML, Web Developer" />
        <link rel="canonical" href="https://ritikraj.dev" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ritik Raj — Full-stack Developer" />
        <meta property="og:description" content="Building scalable solutions with modern technologies. IIIT Guwahati graduate crafting impactful software." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ritik Raj",
            "jobTitle": "Full-stack Developer",
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Indian Institute of Information Technology, Guwahati"
            },
            "email": "ritikraj.contact@gmail.com",
            "url": "https://ritikraj.dev",
            "sameAs": [
              "https://github.com/RitikRaj108",
              "https://linkedin.com/in/ritik-raj-311236258"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <main className="space-y-8 px-4 md:px-6 lg:px-8 pb-8">
          <AccentureCard className="section-wrapper">
            <HeroSection />
          </AccentureCard>
          <AccentureCard className="section-wrapper">
            <AboutSection />
          </AccentureCard>
          <AccentureCard className="section-wrapper">
            <ProjectsSection />
          </AccentureCard>
          <AccentureCard className="section-wrapper">
            <ExperienceSection />
          </AccentureCard>
          <AccentureCard className="section-wrapper">
            <ContactSection />
          </AccentureCard>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
