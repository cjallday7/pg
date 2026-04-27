'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'
const SCRAMBLE_START_FRAME_RANGE = 20
const SCRAMBLE_DURATION_MIN_FRAMES = 20
const SCRAMBLE_DURATION_RANGE = 20

class TextScramble {
  private el: HTMLElement
  private frameRequest = 0
  private frame = 0
  private queue: Array<{ from: string; to: string; start: number; end: number; char: string }> = []
  private resolve: (() => void) | null = null

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    return new Promise(resolve => {
      this.resolve = resolve
      this.queue = Array.from({ length }, (_, i) => ({
        from: oldText[i] ?? '',
        to: newText[i] ?? '',
        start: Math.floor(Math.random() * SCRAMBLE_START_FRAME_RANGE),
        end:
          Math.floor(Math.random() * SCRAMBLE_START_FRAME_RANGE) +
          SCRAMBLE_DURATION_MIN_FRAMES +
          Math.floor(Math.random() * SCRAMBLE_DURATION_RANGE),
        char: '',
      }))
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
    })
  }

  private update() {
    let output = ''
    let complete = 0

    for (const item of this.queue) {
      if (this.frame >= item.end) {
        complete++
        output += item.to
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        output += `<span style="color:#525252">${item.char}</span>`
      } else {
        output += item.from
      }
    }

    this.el.innerHTML = output

    if (complete === this.queue.length) {
      this.resolve?.()
    } else {
      this.frame++
      this.frameRequest = requestAnimationFrame(this.update)
    }
  }

  cancel() {
    cancelAnimationFrame(this.frameRequest)
  }
}

const PHRASES = [
  'Design systems.',
  'Interaction design.',
  'Motion craft.',
  'Creative coding.',
  'WebGL shaders.',
]

const HOVER_LABELS = ['Scramble me', 'Hover here', 'Try this one']

export default function TextScrambleEffect() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cycleActive = useRef(true)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return

    const scrambler = new TextScramble(el)
    cycleActive.current = true
    let i = 0

    async function cycle() {
      while (cycleActive.current) {
        await scrambler.setText(PHRASES[i % PHRASES.length])
        i++
        await new Promise(r => setTimeout(r, 2200))
      }
    }

    cycle()

    return () => {
      cycleActive.current = false
      scrambler.cancel()
    }
  }, [])

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center gap-12 select-none">
      <div className="text-center space-y-3">
        <p className="text-neutral-600 text-xs uppercase tracking-widest">auto-cycling</p>
        <h2
          ref={headingRef}
          className="text-white text-3xl font-semibold tracking-tight w-72 text-center"
        >
          {PHRASES[0]}
        </h2>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {HOVER_LABELS.map(label => (
          <HoverScramble key={label} text={label} />
        ))}
      </div>
    </div>
  )
}

function HoverScramble({ text }: { text: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const scrambler = useRef<TextScramble | null>(null)

  useEffect(() => {
    if (spanRef.current) scrambler.current = new TextScramble(spanRef.current)
    return () => scrambler.current?.cancel()
  }, [])

  return (
    <button
      onMouseEnter={() => scrambler.current?.setText(text)}
      className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-colors"
    >
      <span ref={spanRef} className="text-white text-sm font-mono">
        {text}
      </span>
    </button>
  )
}
