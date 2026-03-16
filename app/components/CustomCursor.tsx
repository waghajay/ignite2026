'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') !== null || 
                           target.closest('button') !== null
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  const cursorStyle = { left: `${position.x}px`, top: `${position.y}px` }
  const hoverClass = isHovering ? 'hover' : ''

  return (
    <>
      <div className={`custom-cursor ${hoverClass}`} style={cursorStyle} />
      <div className={`custom-cursor-dot ${hoverClass}`} style={cursorStyle} />
    </>
  )
}
