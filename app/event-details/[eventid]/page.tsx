'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import './event-details.css'

export default function EventDetailsPage() {
  const params = useParams()
  const eventId = params.eventid
  
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (eventId) {
      fetchEventDetails()
    }
  }, [eventId])

  const fetchEventDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://ignitecore-three.vercel.app/api/v1/events/${eventId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch event details')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setEvent(result.data)
      } else {
        throw new Error(result.message || 'Failed to fetch event details')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching event details:', err)
    } finally {
      setLoading(false)
    }
  }

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Format time function
  const formatTime = (timeString) => {
    if (!timeString) return 'TBA'
    return timeString
  }

  if (loading) {
    return (
      <div className="event-details-page">
        <Header />
        <div className="loading-state">
          <p>Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="event-details-page">
        <Header />
        <div className="error-state">
          <h1>Event Not Found</h1>
          <p>Error: {error || 'Event not found'}</p>
          <Link href="/" className="retry-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="event-details-page">
        <div className="back-link">
          <Link href="/" className="back-button">
            ← Back to Events
          </Link>
        </div>

        <div className="event-header-section">
          <div className="event-info-left">
            <div className="event-badge">{event.mode || 'Offline'}</div>
            <h1 className="event-main-title">
              {event.title.split(' ').map((word, index, array) => {
                if (index === array.length - 1) {
                  return <span key={index} className="highlight">{word}</span>
                }
                return word + ' '
              })}
            </h1>
            <p className="event-subtitle">
              {event.content}
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
                <div className="meta-label">{formatDate(event.eventdate)}</div>
              </div>

              <div className="meta-card">
                <div className="meta-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#F3BD51" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="meta-label">{formatTime(event.eventtime)}</div>
              </div>

              <div className="meta-card">
                <div className="meta-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#F3BD51"/>
                  </svg>
                </div>
                <div className="meta-label">{event.eventvenue || 'TBD'}</div>
              </div>

              <div className="meta-card">
                <div className="meta-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#F3BD51" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="meta-label">{event.totalRegCount || 0} Registered</div>
              </div>
            </div>
          </div>

          <div className="event-right-section">
            <div className="event-poster">
              {!imageError ? (
                <Image 
                  src={event.eventimage || '/images/event.png'}
                  alt={event.title}
                  width={450}
                  height={600}
                  onError={() => setImageError(true)}
                  unoptimized
                  className="event-poster-image"
                />
              ) : (
                <img
                  src="/images/event.png"
                  alt={event.title}
                  className="event-poster-image"
                />
              )}
            </div>

            {event.amount > 0 && (
              <div className="price-tag register-button">
                <span className="price-label">Registration Fee:</span>
                <span className="price-amount">₹{event.amount}</span>
              </div>
            )}

            <Link href={`/register?event=${event._id}`} className="register-button-sidebar">
              Register Now
            </Link>
          </div>
        </div>

        <section className="about-event-section">
          <h2 className="section-heading">
            About The <span className="highlight">Event</span>
          </h2>
          <p className="event-description">
            {event.content}
          </p>
        </section>

        <div className="rules-coordinators-section">
          <section className="rules-section">
            <h2 className="section-heading">
              <span className="highlight">Rules</span> & <span className="highlight">Guidelines</span>
            </h2>
            {event.rules && event.rules.length > 0 ? (
              <ul className="rules-list">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            ) : (
              <p className="no-content">No specific rules provided for this event.</p>
            )}
          </section>

          <section className="coordinators-section">
            <h2 className="section-heading">
              Event <span className="highlight">Co-ordinators</span>
            </h2>
            {event.eventCordinators && event.eventCordinators.length > 0 ? (
              <div className="coordinators-grid">
                {event.eventCordinators.map((coordinator, index) => (
                  <div key={index} className="coordinator-card">
                    <h3 className="coordinator-name">{coordinator.name || 'Coordinator'}</h3>
                    {coordinator.phone && (
                      <a href={`tel:${coordinator.phone}`} className="coordinator-contact">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {coordinator.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">No coordinators listed for this event.</p>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className="tags-section">
                <h3 className="tags-heading">Event Tags</h3>
                <div className="tags-container">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="event-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="cta-section">
          <div className="cta-box">
            <h3 className="cta-title">Ready to Join?</h3>
            <p className="cta-subtitle">Secure your spot now — limited seats available!</p>
            <Link href={`/register?event=${event._id}`} className="register-button">
              Register Now
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}