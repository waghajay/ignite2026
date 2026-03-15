'use client'

import { useEffect } from 'react'

export default function SoundEffects() {
  useEffect(() => {
    const playClickSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        // Silently fail if audio context is not supported
        console.log('Audio not supported')
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Play click sound
      playClickSound()
      
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
