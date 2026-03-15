// IGNITE Website - Next.js Implementation
import HeroSection from '@/components/HeroSection'
import EventSection from '@/components/EventSection'
import AboutSection from '@/components/AboutSection'
import Team from '@/components/Team'
import FacultySection from '@/components/FacultySection'
import SnapshotsSection from '@/components/SnapshotsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EventSection />
      <AboutSection />
      <Team />
      <FacultySection />
      <SnapshotsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
