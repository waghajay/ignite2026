'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Event } from '@/types/event'
import './EventSection.css'

export default function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://ignitecore-three.vercel.app/api/v1/events/')
      
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setEvents(result.data)
      } else {
        throw new Error(result.message || 'Failed to fetch events')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageError = (eventId: string) => {
    setImageErrors(prev => ({ ...prev, [eventId]: true }))
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="event-section">
        <div className="event-container">
          <div className="loading-state">
            <p>Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="event-section">
        <div className="event-container">
          <div className="error-state">
            <p>Error loading events: {error}</p>
            <button onClick={fetchEvents} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Get only the first 3 events
  const displayedEvents = events.slice(0, 3)

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
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-image-wrapper">
                  {!imageErrors[event._id] ? (
                    <Image
                      src={event.eventimage || '/images/event.png'}
                      alt={event.title}
                      width={400}
                      height={300}
                      className="event-image"
                      onError={() => handleImageError(event._id)}
                      unoptimized
                    />
                  ) : (
                    <img
                      src="/images/event.png"
                      alt={event.title}
                      className="event-image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                
                <div className="event-content">
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-description">{event.content}</p>
                  
                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="event-tags">
                      {event.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="event-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="event-details">
                    <div className="event-detail-item">
                      <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{formatDate(event.eventdate)}</span>
                    </div>
                    
                    <div className="event-detail-item">
                      <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{event.eventvenue || event.mode}</span>
                    </div>

                    {event.amount > 0 && (
                      <div className="event-detail-item">
                        <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        <span>₹{event.amount}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/register?event=${event._id}`} className="register-btn">
                    Register Now
                  </Link>
                  
                  <Link href={`/event-details/${event._id}`} className="more-details-btn">
                    More Details
                    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No events available at the moment.</p>
          )}
        </div>

        {/* View All Events Button */}
        {events.length > 3 && (
          <div className="view-all-container">
            <Link href="/events" className="view-all-btn">
              View All Events
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}


