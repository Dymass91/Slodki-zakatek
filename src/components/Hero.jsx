import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import slide1 from '../assets/hero-slide-1.jpg'
import slide2 from '../assets/hero-slide-2.jpg'
import slide3 from '../assets/hero-slide-3.jpg'
import slide4 from '../assets/hero-slide-4.jpg'

// All four source photos share this natural size — used to replicate the
// same object-fit: cover crop inside the muted heading word.
const IMG_W = 2048
const IMG_H = 1536

const slides = [
  {
    img: slide1,
    wordMuted: 'SŁODKIE',
    wordBold: 'CHWILE',
    subtitle: 'Każdy tort to unikalne dzieło — tworzony z pasji, najlepszych składników i dbałości o każdy detal.',
  },
  {
    img: slide2,
    wordMuted: 'TORTY',
    wordBold: 'MARZEŃ',
    subtitle: 'Ręcznie robione z miłością, dopasowane do Twojej wyjątkowej okazji.',
  },
  {
    img: slide3,
    wordMuted: 'KAŻDY',
    wordBold: 'DETAL',
    subtitle: 'Skórka i okolice — słodki zakątek od ponad 5 lat.',
  },
  {
    img: slide4,
    wordMuted: 'TWOJE',
    wordBold: 'ŚWIĘTO',
    subtitle: 'Zaprojektujemy tort, który zachwyci smakiem i wyglądem.',
  },
]

// Every draggable slot (the two heading words, the two buttons) is built the same way:
// a base layer sits at the bottom, always fully visible; an overlay layer sits on top,
// clipped with a pixel-precise clip-path that tracks the drag handle. Because the clip is
// a raw pixel cut (not a per-word toggle), it slices straight through individual letters
// as it crosses them — letter-by-letter, not word-by-word.
//
// Left-slot overlays (the white layer over the left word/button) are hidden at rest and
// reveal growing from their RIGHT edge as the seam sweeps left through them.
function clipFromRight(seamPx, rect) {
  if (!rect) return 'inset(0 0 0 100%)'
  const local = Math.min(rect.width, Math.max(0, seamPx - rect.left))
  return `inset(0 0 0 ${local}px)`
}

// Right-slot overlays (the photo layer over the right word/button) are hidden at rest and
// reveal growing from their LEFT edge as the seam sweeps right through them — the mirror
// of the above.
function clipFromLeft(seamPx, rect) {
  if (!rect) return 'inset(0 100% 0 0)'
  const local = Math.min(rect.width, Math.max(0, seamPx - rect.left))
  return `inset(0 ${rect.width - local}px 0 0)`
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const leftWordRefs = useRef([])
  const rightWordRefs = useRef([])
  const leftBtnRefs = useRef([])
  const rightBtnRefs = useRef([])

  const [bgSize, setBgSize] = useState(null)
  const [leftWordBgPositions, setLeftWordBgPositions] = useState([])
  const [rightWordBgPositions, setRightWordBgPositions] = useState([])
  const [leftBtnBgPositions, setLeftBtnBgPositions] = useState([])
  const [rightBtnBgPositions, setRightBtnBgPositions] = useState([])

  // Live pixel rects of every slot, refreshed on layout changes, read on every drag
  // frame to compute each slot's clip-path — kept in a ref (not state) since they
  // don't need to trigger renders on their own.
  const rectsRef = useRef({ leftWord: [], rightWord: [], leftBtn: [], rightBtn: [] })
  const sectionRectRef = useRef({ left: 0, width: 1 })

  const sectionRef = useRef(null)
  const dragRef = useRef({ active: false, pos: 50, raf: null })
  const [dragActive, setDragActive] = useState(false)
  const [dragPos, setDragPos] = useState(50)

  const goTo = (index) => {
    setCurrent((index + slides.length) % slides.length)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const restartAutoplay = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
  }

  const handleNav = (action) => {
    action()
    restartAutoplay()
  }

  // Every slot's "photo" layer needs its own background-position (same trick as before:
  // background-size matches the Hero's, position compensated for that slot's own offset
  // inside the section), and every slot's rect is cached for the live clip-path math.
  useLayoutEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scale = Math.max(vw / IMG_W, vh / IMG_H)
      const renderedW = IMG_W * scale
      const renderedH = IMG_H * scale
      const offsetX = (vw - renderedW) / 2
      const offsetY = (vh - renderedH) / 2
      setBgSize(`${renderedW}px ${renderedH}px`)

      const measure = (refs) =>
        refs.current.map((el) => (el ? el.getBoundingClientRect() : null))
      const positionsFrom = (rects) =>
        rects.map((rect) => (rect ? `${offsetX - rect.left}px ${offsetY - rect.top}px` : 'center'))

      const leftWordRects = measure(leftWordRefs)
      const rightWordRects = measure(rightWordRefs)
      const leftBtnRects = measure(leftBtnRefs)
      const rightBtnRects = measure(rightBtnRefs)

      rectsRef.current = {
        leftWord: leftWordRects,
        rightWord: rightWordRects,
        leftBtn: leftBtnRects,
        rightBtn: rightBtnRects,
      }
      setLeftWordBgPositions(positionsFrom(leftWordRects))
      setRightWordBgPositions(positionsFrom(rightWordRects))
      setLeftBtnBgPositions(positionsFrom(leftBtnRects))
      setRightBtnBgPositions(positionsFrom(rightBtnRects))

      if (sectionRef.current) {
        const sr = sectionRef.current.getBoundingClientRect()
        sectionRectRef.current = { left: sr.left, width: sr.width }
      }
    }
    recalc()
    const raf = requestAnimationFrame(recalc)
    window.addEventListener('resize', recalc)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recalc)
    }
  }, [])

  // Drag the center handle: the photo/slide never changes — only the split point follows
  // the pointer. Whatever falls left of it stays/becomes the photo cutout, whatever falls
  // right of it stays/becomes solid — sliced at the exact pixel, so it cuts through
  // letters (and button labels) as it crosses them. Releasing springs back to center.
  const flushDrag = () => {
    dragRef.current.raf = null
    setDragPos(dragRef.current.pos)
  }

  const scheduleFlush = () => {
    if (dragRef.current.raf == null) {
      dragRef.current.raf = requestAnimationFrame(flushDrag)
    }
  }

  const updateDragFromClientX = (clientX) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let pos = ((clientX - rect.left) / rect.width) * 100
    pos = Math.min(100, Math.max(0, pos))
    dragRef.current.pos = pos
    scheduleFlush()
  }

  const endDrag = () => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    setDragActive(false)
    dragRef.current.pos = 50
    setDragPos(50)
    restartAutoplay()
  }

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current.active = true
    setDragActive(true)
    clearInterval(timerRef.current)
    updateDragFromClientX(e.clientX)
  }

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return
    updateDragFromClientX(e.clientX)
  }

  const handlePointerUp = () => {
    endDrag()
  }

  const splitTransitionClass = dragActive ? '' : 'transition-[left,width] duration-300 ease-out'
  const seamPx = sectionRectRef.current.left + (dragPos / 100) * sectionRectRef.current.width

  const photoTextStyle = (img, bgPos) => ({
    backgroundImage: `url(${img})`,
    backgroundSize: bgSize ?? 'cover',
    backgroundPosition: bgPos ?? 'center',
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextStroke: '1px rgba(255,255,255,0.55)',
  })

  const whiteTextStyle = {
    color: '#fff',
    textShadow: '0 4px 24px rgba(0,0,0,0.35)',
  }

  const photoBtnStyle = (img, bgPos) => ({
    backgroundImage: `url(${img})`,
    backgroundSize: bgSize ?? 'cover',
    backgroundPosition: bgPos ?? 'center',
    backgroundRepeat: 'no-repeat',
    textShadow: '0 2px 10px rgba(0,0,0,0.6)',
  })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-black"
    >
      {/* 1. Main Hero background — a plain background-image, one per slide, crossfaded. Unaffected by dragging. */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            backgroundImage: `url(${s.img})`,
            backgroundSize: bgSize ?? 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Mobile-only dimming so the plain white heading stays legible over the full photo */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.72) 100%)' }}
      />

      {/* 2. Darkening overlay — its width follows the drag handle instead of a fixed 50%. */}
      <div
        className={`absolute left-0 top-0 h-full pointer-events-none hidden md:block ${splitTransitionClass}`}
        style={{ width: `${dragPos}%`, background: 'rgba(76,5,25,0.72)' }}
      />

      {/* Right half — subtle warm tint, follows the same split point from the other side */}
      <div
        className={`absolute top-0 h-full pointer-events-none hidden md:block ${splitTransitionClass}`}
        style={{ left: `${dragPos}%`, width: `${100 - dragPos}%`, background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
      />

      {/* Text content. The photo/slide stays put — only which side of each word/button is a
          photo cutout vs. solid follows the drag, sliced at the exact pixel (letter by letter). */}
      {slides.map((s, i) => {
        const leftWordClip = clipFromRight(seamPx, rectsRef.current.leftWord[i])
        const rightWordClip = clipFromLeft(seamPx, rectsRef.current.rightWord[i])
        const leftBtnClip = clipFromRight(seamPx, rectsRef.current.leftBtn[i])
        const rightBtnClip = clipFromLeft(seamPx, rectsRef.current.rightBtn[i])

        return (
          <div
            key={s.img}
            className="absolute inset-0 z-10 flex items-center transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            <div className="w-full px-6 md:px-12">
              <h1 className="font-playfair leading-none select-none grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-0">
                {/* Left word slot: photo cutout underneath (always), white on top clipped to the right of the seam. */}
                <div ref={(el) => { leftWordRefs.current[i] = el }} className="relative">
                  <span
                    aria-hidden={i !== current}
                    className="block w-full text-center md:text-right md:pr-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
                    style={photoTextStyle(s.img, leftWordBgPositions[i])}
                  >
                    {s.wordMuted}
                  </span>
                  <span
                    aria-hidden
                    className="hidden md:flex absolute inset-0 justify-center md:justify-end md:pr-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight pointer-events-none"
                    style={{ ...whiteTextStyle, clipPath: leftWordClip }}
                  >
                    {s.wordMuted}
                  </span>
                </div>

                {/* Right word slot: same pair, mirrored — white underneath by default, photo cutout on top clipped in from the right. */}
                <div ref={(el) => { rightWordRefs.current[i] = el }} className="relative">
                  <span
                    aria-hidden={i !== current}
                    className="block w-full text-center md:text-left md:pl-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
                    style={whiteTextStyle}
                  >
                    {s.wordBold}
                  </span>
                  <span
                    aria-hidden
                    className="hidden md:flex absolute inset-0 justify-center md:justify-start md:pl-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight pointer-events-none"
                    style={{ ...photoTextStyle(s.img, rightWordBgPositions[i]), clipPath: rightWordClip }}
                  >
                    {s.wordBold}
                  </span>
                </div>
              </h1>

              {/* Subtitle — centered under the whole heading, same on mobile and desktop */}
              <p className="mt-16 max-w-md mx-auto text-pink-50 text-base md:text-lg text-center leading-relaxed">
                {s.subtitle}
              </p>

              {/* Buttons row: same photo/white slot pair as the words, so dragging the seam over a button re-styles it too. */}
              <div className="mt-8 flex gap-4 justify-center items-center md:grid md:grid-cols-2 md:items-center md:gap-0">
                {/* Left button slot: photo-fill underneath (always clickable), solid white/rose on top clipped to the right of the seam. */}
                <div ref={(el) => { leftBtnRefs.current[i] = el }} className="relative w-52 md:justify-self-end md:mr-4">
                  <a
                    href="#o-nas"
                    className="block w-full whitespace-nowrap text-center font-semibold px-8 py-3 rounded-full border-2 border-white text-white transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.6),0_0_44px_rgba(255,255,255,0.4)]"
                    style={photoBtnStyle(s.img, leftBtnBgPositions[i])}
                  >
                    Nasza historia
                  </a>
                  <span
                    aria-hidden
                    className="hidden md:flex absolute inset-0 items-center justify-center whitespace-nowrap font-semibold px-8 py-3 rounded-full bg-white text-rose-600 shadow-md pointer-events-none overflow-hidden"
                    style={{ clipPath: leftBtnClip }}
                  >
                    Nasza historia
                  </span>
                </div>

                {/* Right button slot: solid white/rose underneath (always clickable), photo-fill on top clipped in from the right. */}
                <div ref={(el) => { rightBtnRefs.current[i] = el }} className="relative w-52 md:justify-self-start md:ml-4">
                  <a
                    href="#cennik"
                    className="block w-full whitespace-nowrap text-center font-semibold px-8 py-3 rounded-full bg-white text-rose-600 transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-[0_0_10px_rgba(244,63,94,0.9),0_0_24px_rgba(244,63,94,0.6),0_0_44px_rgba(244,63,94,0.4)]"
                  >
                    Zobacz cennik
                  </a>
                  <span
                    aria-hidden
                    className="hidden md:flex absolute inset-0 items-center justify-center whitespace-nowrap font-semibold px-8 py-3 rounded-full border-2 border-white text-white shadow-lg pointer-events-none overflow-hidden"
                    style={{ ...photoBtnStyle(s.img, rightBtnBgPositions[i]), clipPath: rightBtnClip }}
                  >
                    Zobacz cennik
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Draggable center handle — grab and drag sideways; whatever crosses the seam
          (letters included) switches between the photo cutout and solid look. */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-y-0 -translate-x-1/2 w-10 hidden md:flex items-center justify-center z-20 cursor-grab active:cursor-grabbing ${dragActive ? '' : 'transition-[left] duration-300 ease-out'}`}
        style={{ left: `${dragPos}%`, touchAction: 'none' }}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/40 pointer-events-none" />
        <div className="relative w-9 h-9 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Prev / next controls, bottom-right like the reference slider */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10 flex gap-3">
        <button
          onClick={() => handleNav(prev)}
          aria-label="Poprzedni slajd"
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => handleNav(next)}
          aria-label="Następny slajd"
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-9 left-6 z-10 hidden md:flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNav(() => goTo(i))}
            aria-label={`Przejdź do slajdu ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all cursor-pointer border-none"
            style={{
              background: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
              width: i === current ? '1.5rem' : '0.5rem',
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none p-2 z-10 hidden md:block"
        onClick={() => document.getElementById('o-nas')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Przewiń w dół"
      >
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
