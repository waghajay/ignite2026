'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import './about.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />
      
      <section className="hero-section">
        <h1 className="hero-title">
          About <span className="highlight">IGNITE</span>
        </h1>
        <p className="hero-description">
          We are a student-run organization dedicated to fostering innovation, leadership, and
          entrepreneurial thinking. Since 2015, we've been empowering the next generation through
          dynamic workshops, competitive events, and a vibrant community.
        </p>
      </section>

      <section className="family-section">
        <div className="family-image-container">
          <Image 
            src="/images/IMG_0773.png" 
            alt="IGNITE Family" 
            width={1200}
            height={800}
            className="family-image"
            priority
          />
          <div className="family-overlay">
            <h2 className="family-title">
              Our <span className="highlight">Family</span>
            </h2>
            <p className="family-subtitle">The people who make IGNITE what it is</p>
          </div>
        </div>
      </section>

      <section className="what-is-section">
        <h2 className="section-title">
          <span className="highlight">What is</span> Ignite
        </h2>
        <p className="section-description">
          IGNITE Student Association is a dynamic student-led organization committed to
          fostering leadership, creativity, innovation, and collaboration among students. We
          serve as a platform where ideas transform into impactful actions and students grow
          beyond classrooms.
        </p>
        <p className="section-description">
          IGNITE is more than just an association — it is a community of passionate
          individuals driven by purpose, teamwork, and excellence.
        </p>
        <div className="section-divider"></div>
      </section>

      <section className="vision-section">
        <div className="vision-cards">
          <div className="vision-card">
            <div className="vision-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="26" stroke="#c9a961" strokeWidth="2.5" fill="none"/>
                <circle cx="30" cy="30" r="15" stroke="#c9a961" strokeWidth="2.5" fill="none"/>
                <circle cx="30" cy="30" r="5" fill="#c9a961"/>
                <line x1="30" y1="4" x2="30" y2="15" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="30" y1="45" x2="30" y2="56" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="4" y1="30" x2="15" y2="30" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="45" y1="30" x2="56" y2="30" stroke="#c9a961" strokeWidth="2.5"/>
              </svg>
            </div>
            <h3 className="vision-title">Vision</h3>
            <p className="vision-text">
              To be the leading platform where student innovation drives sustainable solutions for global challenges.
            </p>
          </div>
          <div className="vision-card">
            <div className="vision-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="26" stroke="#c9a961" strokeWidth="2.5" fill="none"/>
                <circle cx="30" cy="30" r="15" stroke="#c9a961" strokeWidth="2.5" fill="none"/>
                <circle cx="30" cy="30" r="5" fill="#c9a961"/>
                <line x1="30" y1="4" x2="30" y2="15" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="30" y1="45" x2="30" y2="56" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="4" y1="30" x2="15" y2="30" stroke="#c9a961" strokeWidth="2.5"/>
                <line x1="45" y1="30" x2="56" y2="30" stroke="#c9a961" strokeWidth="2.5"/>
              </svg>
            </div>
            <h3 className="vision-title">Mission</h3>
            <p className="vision-text">
              To empower students through collaborative learning, innovative projects, and leadership development.
            </p>
          </div>
          <div className="vision-card">
            <div className="vision-icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="24" stroke="#c9a961" strokeWidth="2" fill="none"/>
                <circle cx="28" cy="28" r="14" stroke="#c9a961" strokeWidth="2" fill="none"/>
                <circle cx="28" cy="28" r="5" fill="#c9a961"/>
                <line x1="28" y1="4" x2="28" y2="14" stroke="#c9a961" strokeWidth="2"/>
                <line x1="28" y1="42" x2="28" y2="52" stroke="#c9a961" strokeWidth="2"/>
                <line x1="4" y1="28" x2="14" y2="28" stroke="#c9a961" strokeWidth="2"/>
                <line x1="42" y1="28" x2="52" y2="28" stroke="#c9a961" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="vision-title">Values</h3>
            <p className="vision-text">
              Excellence, integrity, collaboration, and continuous growth in everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="inspiration-section">
        <h2 className="inspiration-title">
          Our <span className="highlight">Inspiration</span>
        </h2>
        <div className="video-grid">
          <a 
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="video-card"
          >
            <div className="video-thumbnail">
              <Image 
                src="https://img.youtube.com/vi/YOUR_VIDEO_ID_1/maxresdefault.jpg" 
                alt="Video 1"
                width={640}
                height={360}
              />
            </div>
            <div className="video-info">
              <h3 className="video-title">HOD, ESTD<br />Dr. Kavita Bhosale</h3>
            </div>
          </a>
          <a 
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="video-card"
          >
            <div className="video-thumbnail">
              <Image 
                src="https://img.youtube.com/vi/YOUR_VIDEO_ID_2/maxresdefault.jpg" 
                alt="Video 2"
                width={640}
                height={360}
              />
            </div>
            <div className="video-info">
              <h3 className="video-title">Faculty Co-ordinator<br />Dr. Dipa Dharmadhikari</h3>
            </div>
          </a>
        </div>
      </section>

      <section className="gallery-cta-section">
        <a href="/gallery" className="gallery-button">
          Gallery
        </a>
      </section>
    </div>
  )
}
