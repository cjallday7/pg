'use client'

import { useRef, useEffect } from 'react'

const DOT_SIZE = 8
const RING_SIZE = 36
const LERP_FACTOR = 0.12
const SCALE_LERP = 0.1

export default function CursorLagTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const visible = useRef(false)
  const targetScale = useRef(1)
  const currentScale = useRef(1)
  const targetDotOpacity = useRef(1)
  const currentDotOpacity = useRef(1)
  const rafId = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!container || !dot || !ring) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function loop() {
      ringPos.current.x = lerp(ringPos.current.x, dotPos.current.x, LERP_FACTOR)
      ringPos.current.y = lerp(ringPos.current.y, dotPos.current.y, LERP_FACTOR)
      currentScale.current = lerp(currentScale.current, targetScale.current, SCALE_LERP)
      currentDotOpacity.current = lerp(currentDotOpacity.current, targetDotOpacity.current, SCALE_LERP)

      const halfDot = DOT_SIZE / 2
      const halfRing = RING_SIZE / 2

      dot.style.transform = `translate(${dotPos.current.x - halfDot}px, ${dotPos.current.y - halfDot}px)`
      ring.style.transform = `translate(${ringPos.current.x - halfRing}px, ${ringPos.current.y - halfRing}px) scale(${currentScale.current})`
      dot.style.opacity = visible.current ? String(currentDotOpacity.current) : '0'
      ring.style.opacity = visible.current ? '1' : '0'

      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      dotPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseEnterContainer = () => { visible.current = true }
    const handleMouseLeaveContainer = () => { visible.current = false }
    const handleMouseDown = () => { targetScale.current = 0.75 }
    const handleMouseUp = () => { targetScale.current = 1 }

    const handleEnterInteractive = () => {
      targetScale.current = 2
      targetDotOpacity.current = 0.3
    }
    const handleLeaveInteractive = () => {
      targetScale.current = 1
      targetDotOpacity.current = 1
    }

    const interactives = container.querySelectorAll('a, button')

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnterContainer)
    container.addEventListener('mouseleave', handleMouseLeaveContainer)
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseup', handleMouseUp)
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    return () => {
      cancelAnimationFrame(rafId.current)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnterContainer)
      container.removeEventListener('mouseleave', handleMouseLeaveContainer)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseup', handleMouseUp)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-neutral-950 overflow-hidden"
      style={{ cursor: 'none' }}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-white pointer-events-none"
        style={{ width: DOT_SIZE, height: DOT_SIZE, willChange: 'transform', zIndex: 9999, opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border border-white pointer-events-none"
        style={{ width: RING_SIZE, height: RING_SIZE, willChange: 'transform', zIndex: 9999, opacity: 0 }}
      />

      <div className="flex flex-col items-center justify-center h-full gap-6">
        <p className="text-neutral-500 text-sm select-none">Move your cursor around</p>
        <button className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white text-sm">
          Hover me
        </button>
        <a href="#" onClick={e => e.preventDefault()} className="text-white/40 text-sm underline underline-offset-4">
          Or this link
        </a>
      </div>
    </div>
  )
}
