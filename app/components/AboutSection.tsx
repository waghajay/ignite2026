'use client'

import Image from 'next/image'
import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Title */}
        <h2 className="about-title">
          About <span className="title-highlight">IGNITE</span>
        </h2>

        {/* Description */}
        <p className="about-description">
          IGNITE Student Association is a student-run organization dedicated to fostering
          innovation, leadership, and entrepreneurial thinking. We empower the next generation
          through dynamic workshops, competitive events, and a vibrant community that sparks
          real change.
        </p>

        {/* Cards Container */}
        <div className="cards-container">
          {/* Vision Card */}
          <div className="info-card">
            <div className="card-icon">
              <Image
                src="/images/vision.png"
                alt="Vision Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="card-title">Vision</h3>
            <p className="card-description">
              To be the leading platform where student innovation drives sustainable solutions for global challenges.
            </p>
          </div>

          {/* Mission Card */}
          <div className="info-card">
            <div className="card-icon">
              <Image
                src="/images/vision.png"
                alt="Mission Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="card-title">Mission</h3>
            <p className="card-description">
              Empower students through events, mentorship, and hands-on projects.
            </p>
          </div>

          {/* Community Card */}
          <div className="info-card">
            <div className="card-icon">
              <Image
                src="/images/vision.png"
                alt="Community Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="card-title">Community</h3>
            <p className="card-description">
              A diverse network of passionate students driving real-world impact
            </p>
          </div>
        </div>

        {/* Read More Button */}
        <div className="button-wrapper">
          <button className="read-more-btn">Read More</button>
        </div>
      </div>
    </section>
  )
}
