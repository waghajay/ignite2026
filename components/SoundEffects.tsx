'use client'

import { useEffect } from 'react'

export default function SoundEffects() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create ripple effect
      const ripple = document.createElement('div')
      ripple.className = 'click-ripple'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      document.body.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
