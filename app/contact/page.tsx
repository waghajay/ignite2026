'use client'

import Header from '@/components/Header'
import './contact.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* 3D Background Elements */}
      <div className="contact-background">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* Navigation - Shared Header */}
      <Header />

      {/* Main Content */}
      <div className="contact-content">
        {/* Title */}
        <h1 className="contact-title">
          <span className="title-yellow">Get In</span>{' '}
          <span className="title-white">Touch</span>
        </h1>

        <p className="contact-subtitle">
          Have questions or want to collaborate? We'd love to hear from you!
        </p>

        {/* Contact Information Cards */}
        <div className="contact-cards">
          {/* Email Card */}
          <div className="contact-card">
            <div className="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="card-title">Email Us</h3>
            <a href="mailto:ignitestudentassociation@gmail.com" className="card-link">
              ignitestudentassociation@gmail.com
            </a>
          </div>

          {/* Write to Us Button */}
          <div className="contact-card">
            <div className="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="card-title">Write to Us</h3>
            <a href="/#contact" className="contact-button">
              Send Message
            </a>
          </div>
        </div>

        {/* Contact Persons */}
        <div className="contact-persons">
          <h2 className="persons-title">
            <span className="title-white">Contact </span>
            <span className="title-yellow">Persons</span>
          </h2>

          <div className="persons-grid">
            {/* President */}
            <div className="person-card">
              <div className="person-header">
                <div className="person-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="person-info">
                  <h3 className="person-name">Mr. Harsh Bhamare</h3>
                  <p className="person-role">President IGNITE SA</p>
                </div>
              </div>
              <div className="person-contact">
                <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:7387883221" className="person-phone">7387883221</a>
              </div>
            </div>

            {/* Vice President */}
            <div className="person-card">
              <div className="person-header">
                <div className="person-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="person-info">
                  <h3 className="person-name">Ms. Rasika Mahulkar</h3>
                  <p className="person-role">Vice-President IGNITE SA</p>
                </div>
              </div>
              <div className="person-contact">
                <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:1423141" className="person-phone">7218753440</a>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="location-section">
          <h2 className="location-title">
            <span className="title-white">Visit </span>
            <span className="title-yellow">Us</span>
          </h2>
          <div className="location-card">
            <div className="location-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="location-text">
              Maharashtra Institute of Technology<br />
              Chhatrapati Sambhajinagar, Maharashtra -431010
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
