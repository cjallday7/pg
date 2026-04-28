'use client'

import { useEffect, useRef } from 'react'

const PANELS = [
  {
    num: '01',
    title: 'Start Scrolling',
    sub: 'Vertical scroll drives horizontal movement',
    color: '#3b82f6',
  },
  {
    num: '02',
    title: 'Slide Right',
    sub: 'Progress maps to translateX on the track',
    color: '#8b5cf6',
  },
  {
    num: '03',
    title: 'Keep Going',
    sub: 'position: sticky pins the viewport in place',
    color: '#ec4899',
  },
  {
    num: '04',
    title: "You're Here",
    sub: 'Scroll resumes normally after this point',
    color: '#10b981',
  },
]

export default function ScrollLinkedHorizontal() {
  const outerRef = useRef<HTMLDivElement>(null)
  const spaceRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const outer = outerRef.current
    const space = spaceRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    const barFill = barFillRef.current
    if (!outer || !space || !sticky || !track || !barFill) return

    function sync() {
      if (!outer || !space || !sticky) return
      const h = outer.clientHeight
      space.style.height = `${h * 4}px`
      sticky.style.height = `${h}px`
    }

    function onScroll() {
      if (!outer || !track || !barFill) return
      const maxScroll = outer.scrollHeight - outer.clientHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(outer.scrollTop / maxScroll, 0), 1) : 0

      track.style.transform = `translateX(${-75 * progress}%)`
      barFill.style.transform = `scaleX(${progress})`

      const hint = hintRef.current
      if (hint) hint.style.opacity = progress < 0.04 ? '1' : '0'

      const activeIndex = Math.round(progress * (PANELS.length - 1))
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        dot.style.background = i === activeIndex ? PANELS[i].color : 'rgba(255,255,255,0.15)'
        dot.style.transform = i === activeIndex ? 'scale(1.6)' : 'scale(1)'
      })
    }

    sync()
    onScroll()

    const ro = new ResizeObserver(sync)
    ro.observe(outer)
    outer.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ro.disconnect()
      outer.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      className="w-full h-full overflow-y-scroll"
      style={{ scrollbarWidth: 'none' }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <div ref={spaceRef} className="relative w-full">
        <div ref={stickyRef} className="sticky top-0 w-full overflow-hidden bg-neutral-950">
          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: '400%', willChange: 'transform' }}
          >
            {PANELS.map((panel) => (
              <Panel key={panel.num} panel={panel} total={PANELS.length} />
            ))}
          </div>

          {/* Scroll hint — fades out immediately on scroll */}
          <div
            ref={hintRef}
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
            style={{ transition: 'opacity 0.4s ease' }}
          >
            <span className="text-neutral-600 text-xs tracking-[0.25em] uppercase">scroll</span>
            <ScrollArrow />
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none">
            <div className="flex gap-2">
              {PANELS.map((panel, i) => (
                <div
                  key={i}
                  ref={(el) => { dotsRef.current[i] = el }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? panel.color : 'rgba(255,255,255,0.15)',
                    transform: i === 0 ? 'scale(1.6)' : 'scale(1)',
                    transition: 'background 0.3s ease, transform 0.3s ease',
                  }}
                />
              ))}
            </div>
            <div className="w-28 h-px bg-white/10 overflow-hidden rounded-full">
              <div
                ref={barFillRef}
                className="h-full bg-white/50 origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Panel({ panel, total }: { panel: typeof PANELS[0]; total: number }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full overflow-hidden"
      style={{ width: `${100 / total}%` }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${panel.color}18 0%, transparent 70%)`,
        }}
      />

      {/* Large background numeral */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-black tabular-nums leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 200px)', color: panel.color, opacity: 0.05 }}
        >
          {panel.num}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-10 space-y-4">
        <p
          className="text-xs font-mono tracking-[0.3em] uppercase"
          style={{ color: panel.color }}
        >
          {panel.num} / {String(total).padStart(2, '0')}
        </p>
        <h2 className="text-white text-4xl font-bold tracking-tight">{panel.title}</h2>
        <p className="text-neutral-500 text-sm leading-relaxed max-w-[28ch] mx-auto">{panel.sub}</p>
      </div>

      {/* Bottom edge accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-16"
        style={{ background: `linear-gradient(to right, transparent, ${panel.color}60, transparent)` }}
      />
    </div>
  )
}

function ScrollArrow() {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" className="text-neutral-600">
      <path d="M6 1v12M1 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
