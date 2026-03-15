'use client'

import React from 'react'
import Link from 'next/link'
import './events.css'

const events = [
  {
    id: 'debugging-fix-win',
    title: 'Debugging: Fix and Win',
    description: 'A thrilling coding challenge where participants must identify and correct errors in given programs within a limited time. Test your logic, programming knowledge, and debugging skills.',
    date: 'March 28, 2026',
    time: '9:00 AM',
    type: 'offline'
  },
  {
    id: 'promptx',
    title: 'PromptX',
    description: 'An AI-based creative competition with two levels. Convert images into detailed AI prompts and use prompt engineering to generate prototypes based on given themes.',
    date: 'March 29, 2026',
    time: '10:00 AM',
    type: 'offline'
  },
  {
    id: 'clashiq',
    title: 'ClashIQ',
    description: 'The ultimate quiz challenge where participants compete to test their knowledge, logic, and quick thinking across multiple domains including general knowledge, technology, and current affairs.',
    date: 'March 30, 2026',
    time: '11:00 AM',
    type: 'offline'
  },
  {
    id: 'yuva-manthan',
    title: 'Yuva Manthan',
    description: 'A powerful debate competition where young minds present their opinions on important topics and defend their perspectives with logic and confidence.',
    date: 'March 31, 2026',
    time: '2:00 PM',
    type: 'offline'
  },
  {
    id: 'red-zone-challenge',
    title: 'Red Zone Challenge',
    description: 'Battle of Survival - A high-energy team challenge where participants test their power, coordination, and intelligence through exciting survival games including Tug of War, Three-Leg Race, and Dumb Charades.',
    date: 'April 1, 2026',
    time: '3:00 PM',
    type: 'offline'
  },
  {
    id: 'inspira',
    title: 'Inspira',
    description: 'Where Ideas Compete - A dynamic platform where participants present innovative ideas and solutions to real-world problems. Showcase your creativity, confidence, and critical thinking.',
    date: 'April 2, 2026',
    time: '1:00 PM',
    type: 'offline'
  },
  {
    id: 'cinecraft',
    title: 'CineCraft',
    description: 'Create, Edit, Inspire - A creative video editing competition where participants transform raw clips into engaging and impactful videos using their editing skills and imagination.',
    date: 'April 3, 2026',
    time: '10:00 AM',
    type: 'offline'
  },
  {
    id: 'e-sports',
    title: 'E Sports',
    description: 'Battle, Survive, Dominate - An exciting gaming competition where players compete in BGMI and Free Fire to prove their strategy, teamwork, and survival skills.',
    date: 'April 4, 2026',
    time: '4:00 PM',
    type: 'online'
  }
]

export default function Events() {
  return (
    <div className="event-page">
      <section className="event-hero-section">
        <h1 className="event-page-title">
          Our <span className="highlight">Events</span>
        </h1>
        <p className="event-page-description">
          Discover exciting opportunities to learn, compete, and grow with IGNITE
        </p>
      </section>

      <section className="events-grid-section">
        <div className="events-container">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-image">
                <img src="/images/IMG_0773.png" alt={event.title} />
                <div className="event-badge-overlay">{event.type}</div>
              </div>
              <div className="event-card-content">
                <h3 className="event-card-title">
                  {event.title.split(' ').map((word, index) => 
                    index === event.title.split(' ').length - 1 ? 
                    <span key={index} className="highlight">{word}</span> : 
                    word + ' '
                  )}
                </h3>
                <p className="event-card-description">
                  {event.description}
                </p>
                <div className="event-card-meta">
                  <div className="event-meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#F3BD51" strokeWidth="2"/>
                      <line x1="3" y1="9" x2="21" y2="9" stroke="#F3BD51" strokeWidth="2"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="event-meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="#F3BD51" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="event-card-actions">
                  <Link href={`/events/${event.id}/register`} className="btn-register">
                    Register Now
                  </Link>
                  <Link href={`/events/${event.id}`} className="btn-details">
                    Show Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}