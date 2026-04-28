'use client'

import { useRef, useCallback, type MouseEvent } from 'react'

const ATTRACTION_RADIUS = 80
const BUTTON_STRENGTH = 0.35
const TEXT_STRENGTH = 0.15

export default function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < ATTRACTION_RADIUS) {
      const tx = dx * BUTTON_STRENGTH
      const ty = dy * BUTTON_STRENGTH
      btn.style.transform = `translate(${tx}px, ${ty}px)`
      btn.style.transition = 'transform 0.1s linear'

      if (textRef.current) {
        textRef.current.style.transform = `translate(${dx * TEXT_STRENGTH}px, ${dy * TEXT_STRENGTH}px)`
      }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = 'translate(0px, 0px)'
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    if (textRef.current) {
      textRef.current.style.transform = 'translate(0px, 0px)'
    }
  }, [])

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-neutral-950"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={btnRef}
        className="relative px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/40 transition-colors"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={textRef}
          className="block"
          style={{
            transition: 'transform 0.1s linear',
            willChange: 'transform',
          }}
        >
          Hover near me
        </span>
      </button>
    </div>
  )
}
