'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import './gallery.css'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const heroImages = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
  ]

  const galleryImages = [
    { id: 1, src: '/images/gallery1.jpg', category: 'team', alt: 'IGNITE Team Photo 1' },
    { id: 2, src: '/images/gallery2.jpg', category: 'team', alt: 'IGNITE Team Photo 2' },
    { id: 3, src: '/images/gallery3.jpg', category: 'team', alt: 'IGNITE Team Photo 3' },
    { id: 4, src: '/images/gallery4.jpg', category: 'events', alt: 'IGNITE Event Photo 1' },
    { id: 5, src: '/images/gallery5.jpg', category: 'events', alt: 'IGNITE Event Photo 2' },
    { id: 6, src: '/images/snapshot1.jpeg', category: 'events', alt: 'IGNITE Event Snapshot 1' },
    { id: 7, src: '/images/snapshot2.jpeg', category: 'events', alt: 'IGNITE Event Snapshot 2' },
    { id: 8, src: '/images/snapshot3.jpeg', category: 'events', alt: 'IGNITE Event Snapshot 3' },
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

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const navigateLightbox = (direction: number) => {
    const newIndex = lightboxIndex + direction
    if (newIndex < 0) {
      setLightboxIndex(filteredImages.length - 1)
    } else if (newIndex >= filteredImages.length) {
      setLightboxIndex(0)
    } else {
      setLightboxIndex(newIndex)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1)
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxIndex, filteredImages.length])

  return (
    <>
      <Header />
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
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            <img src={image.src} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-lightbox" onClick={closeLightbox}>&times;</span>
          <img 
            src={filteredImages[lightboxIndex]?.src} 
            alt={filteredImages[lightboxIndex]?.alt}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox(-1)
            }}
          >
            &#10094;
          </button>
          <button 
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox(1)
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
    </>
  )
}