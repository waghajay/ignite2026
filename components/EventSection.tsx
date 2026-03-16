'use client'

import Image from 'next/image'
import './EventSection.css'

export default function EventSection() {
  const events = [
    {
      id: 1,
      title: 'Debate Competition',
      description: 'Unleash your inner orator! Debate on thought-provoking topics and showcase your argumentation skills.',
      date: '30 Feb 2025',
      location: 'Online',
      image: '/images/event.png'
    },
    {
      id: 2,
      title: 'Debate Competition',
      description: 'Unleash your inner orator! Debate on thought-provoking topics and showcase your argumentation skills.',
      date: '30 Feb 2025',
      location: 'Online',
      image: '/images/event.png'
    },
    {
      id: 3,
      title: 'Debate Competition',
      description: 'Unleash your inner orator! Debate on thought-provoking topics and showcase your argumentation skills.',
      date: '30 Feb 2025',
      location: 'Online',
      image: '/images/event.png'
    }
  ]

  return (
    <section className="event-section">
      <div className="event-container">
        {/* Title */}
        <h2 className="event-title">
          <span className="title-highlight">Upcoming</span> Events
        </h2>

        {/* Description */}
        <p className="event-description">
          Ignite SA is a student community that boasts the most brilliant minds from our college. Comprising individuals
          from diverse fields, including tech area, all members possess exceptional skills in their respective domains and
          work in unison to make Ignite SA an exceptional entity. Our main objective is to create a space that nurtures
          self-improvement and development for our students, and we proudly declare ourselves as a community that is
          created, run, and dedicated to the students.
        </p>

        {/* Event Cards */}
        <div className="event-cards-container">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="event-image"
                />
              </div>
              
              <div className="event-content">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="event-detail-item">
                    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="event-detail-item">
                    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <a href={`/events/${event.id}/register`} className="register-btn">Register Now</a>
                <a href="/event-details" className="more-details-btn">
                  More Details
                  <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
