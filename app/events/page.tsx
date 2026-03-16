'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { Event } from '@/types/event'
import './events.css'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Format time function
  const formatTime = (timeString: string) => {
    if (!timeString) return 'TBA'
    return timeString
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="event-page">
          <div className="loading-state">
            <p>Loading events...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="event-page">
          <div className="error-state">
            <h1>Error Loading Events</h1>
            <p>{error}</p>
            <button onClick={fetchEvents} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
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
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="event-card">
                  <div className="event-card-image">
                    <img 
                      src={event.eventimage || '/images/IMG_0773.png'} 
                      alt={event.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/IMG_0773.png'
                      }}
                    />
                    <div className="event-badge-overlay">{event.mode || 'offline'}</div>
                  </div>
                  <div className="event-card-content">
                    <h3 className="event-card-title">
                      {event.title.split(' ').map((word: string, index: number, array: string[]) => 
                        index === array.length - 1 ? 
                        <span key={index} className="highlight">{word}</span> : 
                        word + ' '
                      )}
                    </h3>
                    <p className="event-card-description">
                      {event.content}
                    </p>
                    
                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="event-tags">
                        {event.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span key={index} className="event-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                    
                    <div className="event-card-meta">
                      <div className="event-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#F3BD51" strokeWidth="2"/>
                          <line x1="3" y1="9" x2="21" y2="9" stroke="#F3BD51" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="#F3BD51" strokeWidth="2"/>
                        </svg>
                        <span>{formatDate(event.eventdate)}</span>
                      </div>
                      <div className="event-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="9" stroke="#F3BD51" strokeWidth="2"/>
                          <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{formatTime(event.eventtime)}</span>
                      </div>
                      {event.amount > 0 && (
                        <div className="event-meta-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#F3BD51"/>
                          </svg>
                          <span>₹{event.amount}</span>
                        </div>
                      )}
                    </div>
                    <div className="event-card-actions">
                      <Link href={`/register?event=${event._id}`} className="btn-register">
                        Register Now
                      </Link>
                      <Link href={`/event-details/${event._id}`} className="btn-details">
                        Show Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-events">No events available at the moment.</p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}