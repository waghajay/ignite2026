'use client'

import React, { useState, useEffect } from 'react'
import './gallery.css'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    '/images/IMG_0773.png',
    '/images/IMG_0773.png',
    '/images/IMG_0773.png',
    '/images/IMG_0773.png',
    '/images/IMG_0773.png',
  ]

  const galleryImages = [
    { id: 1, src: '/images/IMG_0773.png', category: 'team', alt: 'Team Photo 1' },
    { id: 2, src: '/images/IMG_0773.png', category: 'team', alt: 'Team Photo 2' },
    { id: 3, src: '/images/IMG_0773.png', category: 'events', alt: 'Event Photo 1' },
    { id: 4, src: '/images/IMG_0773.png', category: 'events', alt: 'Event Photo 2' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000) // 4 seconds wait time per image

    return () => clearInterval(interval)
  }, [heroImages.length])

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <h1 className="gallery-title">
          <span className="highlight">The Glimpse</span> of IGNITE
        </h1>
        <p className="gallery-subtitle">
          Snapshots from our events, workshops, and team moments.
        </p>

        <div className="hero-image-container">
          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {heroImages.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`IGNITE Team ${index + 1}`} 
                  className="hero-gallery-image"
                />
              ))}
            </div>
          </div>
          <div className="image-dots">
            {heroImages.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
          onClick={() => setActiveFilter('events')}
        >
          Events
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'team' ? 'active' : ''}`}
          onClick={() => setActiveFilter('team')}
        >
          Team
        </button>
      </section>

      <section className="gallery-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.src} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </section>
    </div>
  )
}