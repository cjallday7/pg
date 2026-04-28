'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

const ITEMS = [
  'Interaction Design',
  'WebGL Shaders',
  'Creative Coding',
  'Motion Craft',
  'Three.js',
  'GLSL',
  'React',
  'Scroll Magic',
]

const BASE_SPEED = 0.6
const FRICTION = 0.9
const VELOCITY_SCALE = 0.04

export default function InfiniteMarquee() {
  const [direction, setDirection] = useState<1 | -1>(1)
  const directionRef = useRef<1 | -1>(1)

  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const x1Ref = useRef(0)
  const x2Ref = useRef(0)
  const velocityRef = useRef(0)
  const rafRef = useRef(0)
  const width1Ref = useRef(0)
  const width2Ref = useRef(0)

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  useEffect(() => {
    if (track1Ref.current) width1Ref.current = track1Ref.current.scrollWidth / 2
    if (track2Ref.current) width2Ref.current = track2Ref.current.scrollWidth / 2

    function tick() {
      const speed = BASE_SPEED + velocityRef.current * VELOCITY_SCALE
      const dir = directionRef.current

      x1Ref.current -= speed * dir
      x2Ref.current -= speed * dir * 0.7  // second row at different rate for depth

      // seamless loop for row 1
      const w1 = width1Ref.current
      if (dir === 1 && x1Ref.current <= -w1) x1Ref.current += w1
      else if (dir === -1 && x1Ref.current >= 0) x1Ref.current -= w1

      // seamless loop for row 2
      const w2 = width2Ref.current
      if (dir === 1 && x2Ref.current <= -w2) x2Ref.current += w2
      else if (dir === -1 && x2Ref.current >= 0) x2Ref.current -= w2

      if (track1Ref.current) track1Ref.current.style.transform = `translateX(${x1Ref.current}px)`
      if (track2Ref.current) track2Ref.current.style.transform = `translateX(${x2Ref.current}px)`

      velocityRef.current *= FRICTION
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      velocityRef.current += Math.abs(e.deltaY)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center gap-10 overflow-hidden select-none">
      <p className="text-neutral-600 text-xs uppercase tracking-widest">scroll to accelerate</p>

      <div className="w-full flex flex-col gap-6">
        <MarqueeRow items={ITEMS} trackRef={track1Ref} size="large" />
        <MarqueeRow items={ITEMS} trackRef={track2Ref} size="small" dimmed />
      </div>

      <button
        onClick={() => setDirection(d => (d === 1 ? -1 : 1))}
        className="px-5 py-2 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs uppercase tracking-widest hover:border-white/30 hover:text-white/80 transition-colors"
      >
        {direction === 1 ? '← reverse' : '→ forward'}
      </button>
    </div>
  )
}

function MarqueeRow({
  items,
  trackRef,
  size = 'large',
  dimmed = false,
}: {
  items: string[]
  trackRef: RefObject<HTMLDivElement | null>
  size?: 'large' | 'small'
  dimmed?: boolean
}) {
  const textClass =
    size === 'large'
      ? 'text-3xl font-semibold tracking-tight text-white'
      : 'text-sm font-mono tracking-widest text-neutral-500 uppercase'

  const separator =
    size === 'large'
      ? <span className="text-neutral-700 text-base">✦</span>
      : <span className="text-neutral-800 text-xs">·</span>

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8">
      <span className={textClass}>{item}</span>
      {separator}
    </span>
  ))

  return (
    <div className={`w-full overflow-hidden ${dimmed ? 'opacity-35' : ''}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-8"
        style={{ willChange: 'transform' }}
      >
        <span className="flex gap-8">{content}</span>
        <span className="flex gap-8" aria-hidden>{content}</span>
      </div>
    </div>
  )
}
