'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import './event-details.css'

const eventData: { [key: string]: any } = {
  'debugging-fix-win': {
    title: 'Debugging: Fix and Win',
    subtitle: 'Think Fast • Code Smart • Solve the Bug. A thrilling coding challenge where participants must identify and correct errors in given programs within a limited time.',
    date: 'March 28, 2026',
    time: '9:00 AM',
    venue: 'Computer Lab',
    type: 'offline',
    description: 'A thrilling coding challenge where participants must identify and correct errors in given programs within a limited time. Test your logic, programming knowledge, and debugging skills. Find the errors, fix the logic, and win the challenge.',
    rules: [
      'Participants will be given buggy code snippets to debug',
      'Time limit of 60 minutes for the entire challenge',
      'Programming languages: C, C++, Java, Python',
      'No external resources or internet allowed',
      'Fastest and most accurate debugger wins',
      'Individual participation only',
      'Bring your own laptop with required compilers'
    ]
  },
  'promptx': {
    title: 'PromptX',
    subtitle: 'Imagine • Prompt • Create. An exciting AI creativity challenge where participants use the power of prompts to generate innovative visuals and prototypes.',
    date: 'March 29, 2026',
    time: '10:00 AM',
    venue: 'AI Lab',
    type: 'offline',
    description: 'An AI-based creative competition with two levels. In the first level, participants convert a given image into a detailed AI prompt. In the second level, they use prompt engineering to generate a prototype based on a given theme.',
    rules: [
      'Level 1: Convert given image to detailed AI prompt',
      'Level 2: Create prototype using prompt engineering',
      'Time limit: 45 minutes per level',
      'Creativity and accuracy will be judged',
      'AI tools will be provided',
      'Individual participation',
      'Basic knowledge of AI prompting preferred'
    ]
  },
  'clashiq': {
    title: 'ClashIQ',
    subtitle: 'Think Fast • Answer Smart • Clash for the Crown. The ultimate quiz challenge testing knowledge, logic, and quick thinking.',
    date: 'March 30, 2026',
    time: '11:00 AM',
    venue: 'Main Auditorium',
    type: 'offline',
    description: 'A thrilling quiz competition where participants compete to test their knowledge, logic, and quick thinking across multiple domains including general knowledge, technology, and current affairs.',
    rules: [
      'Individual participation',
      'Multiple rounds: Prelims, Semi-finals, Finals',
      'Topics: General Knowledge, Technology, Current Affairs',
      'Rapid fire round in finals',
      'No electronic devices allowed',
      'Accuracy + Speed = Victory',
      'Highest scorer wins the competition'
    ]
  },
  'yuva-manthan': {
    title: 'Yuva Manthan',
    subtitle: 'Think Deep • Speak Bold • Challenge Ideas. The voice of young minds in powerful debate competition.',
    date: 'March 31, 2026',
    time: '2:00 PM',
    venue: 'Seminar Hall',
    type: 'offline',
    description: 'A powerful debate competition where young minds present their opinions on important topics and defend their perspectives with logic and confidence.',
    rules: [
      'Topics will be given before the debate begins',
      'Speaking time: 2-3 minutes per participant',
      'Both solo and group debates included',
      'Respect others opinions - no offensive language',
      'Judged on content, confidence, clarity, presentation',
      'Most logical and impactful speaker wins',
      'Aggressive behavior leads to disqualification'
    ]
  },
  'red-zone-challenge': {
    title: 'Red Zone Challenge',
    subtitle: 'Strength • Strategy • Survival. Battle of Survival where teams test power, coordination, and intelligence.',
    date: 'April 1, 2026',
    time: '3:00 PM',
    venue: 'Sports Ground',
    type: 'offline',
    description: 'A high-energy team challenge where participants test their power, coordination, and intelligence through exciting survival games including Tug of War, Three-Leg Race, and Dumb Charades.',
    rules: [
      'Team-based event (4-6 members per team)',
      'Games: Tug of War, Three-Leg Race, Dumb Charades',
      'Test your Strength, Speed & Smartness',
      'All team members must participate',
      'Safety gear will be provided',
      'Only the strongest team survives',
      'Fair play and sportsmanship required'
    ]
  },
  'inspira': {
    title: 'Inspira',
    subtitle: 'Think Bold • Present Smart • Win Big. Where ideas compete and creativity meets innovation.',
    date: 'April 2, 2026',
    time: '1:00 PM',
    venue: 'Innovation Hub',
    type: 'offline',
    description: 'A dynamic platform where participants present innovative ideas and solutions to real-world problems. Showcase your creativity, confidence, and critical thinking in front of judges and audience.',
    rules: [
      'Individual or team participation (max 3 members)',
      'Presentation time: 5-7 minutes',
      'Focus on real-world problem solutions',
      'PowerPoint presentations allowed',
      'Q&A session after each presentation',
      'Judged on innovation, feasibility, presentation',
      'Best idea takes the crown'
    ]
  },
  'cinecraft': {
    title: 'CineCraft',
    subtitle: 'Create • Edit • Inspire. Transform raw clips into engaging and impactful videos using editing skills.',
    date: 'April 3, 2026',
    time: '10:00 AM',
    venue: 'Media Lab',
    type: 'offline',
    description: 'A creative video editing competition where participants transform raw clips into engaging and impactful videos using their editing skills and imagination.',
    rules: [
      'Individual participation',
      'Raw clips will be provided',
      'Time limit: 3 hours',
      'Editing software will be available',
      'Focus on creativity and storytelling',
      'Video length: 2-3 minutes maximum',
      'Most creative and impactful video wins'
    ]
  },
  'e-sports': {
    title: 'E Sports',
    subtitle: 'Battle • Survive • Dominate. Gaming competition in BGMI and Free Fire testing strategy and teamwork.',
    date: 'April 4, 2026',
    time: '4:00 PM',
    venue: 'Gaming Arena',
    type: 'online',
    description: 'An exciting gaming competition where players compete in BGMI and Free Fire to prove their strategy, teamwork, and survival skills.',
    rules: [
      'Squad-based battles (4 players per team)',
      'Games: BGMI and Free Fire',
      'Multiple rounds: Qualifiers, Semi-finals, Finals',
      'Strategy + Skill = Victory',
      'Own devices required',
      'Stable internet connection mandatory',
      'Last team standing wins'
    ]
  }
}

export default function EventDetails() {
  const params = useParams()
  const eventId = params?.eventId as string
  const event = eventData[eventId]

  if (!event) {
    return (
      <div className="event-details-page">
        <div className="error-message">
          <h1>Event Not Found</h1>
          <Link href="/events" className="back-button">← Back to Events</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="event-details-page">
      <div className="back-link">
        <Link href="/events" className="back-button">
          ← Back to Events
        </Link>
      </div>

      <div className="event-header-section">
        <div className="event-info-left">
          <div className="event-badge">{event.type}</div>
          <h1 className="event-main-title">
            {event.title.split(' ').map((word: string, index: number) => 
              index === event.title.split(' ').length - 1 ? 
              <span key={index} className="highlight">{word}</span> : 
              word + ' '
            )}
          </h1>
          <p className="event-subtitle">
            {event.subtitle}
          </p>

          <div className="event-meta-grid">
            <div className="meta-card">
              <div className="meta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#F3BD51" strokeWidth="2"/>
                  <line x1="3" y1="9" x2="21" y2="9" stroke="#F3BD51" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                </svg>
              </div>
              <div className="meta-label">{event.date}</div>
            </div>

            <div className="meta-card">
              <div className="meta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="#F3BD51" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="meta-label">{event.time}</div>
            </div>

            <div className="meta-card">
              <div className="meta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#F3BD51" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="#F3BD51" strokeWidth="2"/>
                </svg>
              </div>
              <div className="meta-label">{event.venue}</div>
            </div>

            <div className="meta-card">
              <div className="meta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#F3BD51" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="#F3BD51" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#F3BD51" strokeWidth="2"/>
                  <path d="M16 3.13a4 4 0 010 7.75" stroke="#F3BD51" strokeWidth="2"/>
                </svg>
              </div>
              <div className="meta-label">{event.type === 'offline' ? 'In-Person' : 'Online'}</div>
            </div>
          </div>
        </div>

        <div className="event-right-section">
          <div className="event-poster">
            <img src="/images/IMG_0773.png" alt="Event Poster" />
          </div>

          <Link href={`/events/${eventId}/register`} className="register-button-sidebar">
            Register Now
          </Link>
        </div>
      </div>

      <section className="about-event-section">
        <h2 className="section-heading">
          About <span className="highlight">The Event</span>
        </h2>
        <p className="event-description">
          {event.description}
        </p>
      </section>

      <div className="rules-coordinators-section">
        <section className="rules-section">
          <h2 className="section-heading">
            Rules & <span className="highlight">Guidelines</span>
          </h2>
          <ul className="rules-list">
            {event.rules.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <div className="download-rulebook-container">
            <a href={`/rulebooks/${eventId}-rules.pdf`} download className="download-rulebook-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Download Rulebook
            </a>
          </div>
        </section>

        <section className="coordinators-section">
          <h2 className="section-heading">
            Event <span className="highlight">Co-ordinators</span>
          </h2>
          <div className="coordinators-grid">
            <div className="coordinator-card">
              <h3 className="coordinator-name">Saurav Ambhore</h3>
              <a href="tel:7666679366" className="coordinator-contact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                7666679366
              </a>
            </div>
            <div className="coordinator-card">
              <h3 className="coordinator-name">Saurav Ambhore</h3>
              <a href="tel:7666679366" className="coordinator-contact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                7666679366
              </a>
            </div>
          </div>
        </section>
      </div>

      <section className="cta-section">
        <div className="cta-box">
          <h3 className="cta-title">Ready to Join?</h3>
          <p className="cta-subtitle">Secure your spot now — limited seats available!</p>
          <Link href={`/events/${eventId}/register`} className="register-button">
            Register Now
          </Link>
        </div>
      </section>

    </div>
  )
}