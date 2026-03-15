'use client'

import { useState } from 'react'
import Image from 'next/image'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="header-nav">
      <div className="header-container">
        <div className="logo-section">
          <Image
            src="/images/ig_logo.png"
            alt="Ignite Logo"
            width={130}
            height={130}
            className="header-logo"
          />
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`header-menu ${isMenuOpen ? 'active' : ''}`}>
          {[
            { name: 'Home', href: '/' },
            { name: 'About us', href: '/about' },
            { name: 'Events', href: '/events' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Team', href: '/team' },
            { name: 'Contact', href: '/contact' }
          ].map((item) => (
            <li key={item.name}>
              <a href={item.href} className="header-link" onClick={closeMenu}>
                {item.name}
                <span className="header-underline" />
              </a>
            </li>
          ))}
        </ul>

        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  )
}
