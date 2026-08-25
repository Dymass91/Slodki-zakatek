import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const mutedRefs = useRef([])
  const historyBtnRefs = useRef([])
  const [bgSize, setBgSize] = useState(null)
  const [mutedBgPositions, setMutedBgPositions] = useState([])
  const [historyBtnBgPositions, setHistoryBtnBgPositions] = useState([])

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

  // Every slide's muted word re-uses the exact same background-image as the Hero.
  // For the two copies to line up pixel-for-pixel, both must share the same
  // background-size (computed here, in px, the same way object-fit: cover
  // would scale the photo), and each word's background-position must be the
  // Hero's offset minus that word's own offset inside the section — i.e. the
  // classic "compensate by the element's own position" trick. All slides are
  // measured up front (not just the current one) because they're now all
  // rendered simultaneously, crossfading together with the background.
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
      setMutedBgPositions(
        mutedRefs.current.map((el) => {
          if (!el) return 'center'
          const rect = el.getBoundingClientRect()
          return `${offsetX - rect.left}px ${offsetY - rect.top}px`
        })
      )
      setHistoryBtnBgPositions(
        historyBtnRefs.current.map((el) => {
          if (!el) return 'center'
          const rect = el.getBoundingClientRect()
          return `${offsetX - rect.left}px ${offsetY - rect.top}px`
        })
      )
    }
    recalc()
    const raf = requestAnimationFrame(recalc)
    window.addEventListener('resize', recalc)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recalc)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-black"
    >
      {/* 1. Main Hero background — a plain background-image, one per slide, crossfaded.
          background-size / background-position here are the exact values the
          muted text below re-uses to line its own photo copy up with this one. */}
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

      {/* 2. Darkening overlay — a separate flat layer, above the photo, below the text.
          It never touches background-image directly, so the text can later "cut a hole"
          through it and reveal the original, undarkened photo underneath. */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none hidden md:block"
        style={{ background: 'rgba(20,7,14,0.72)' }}
      />

      {/* Right half — subtle warm tint to tie into brand color, image stays crisp */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none hidden md:block"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
      />

      {/* Center seam with handle, echoing a split-view slider */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/40 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Text content, split like the seam: muted word (filled by the photo) on the left, bold white word on the right.
          Stacked per-slide, crossfading with the same transition/duration as the background photos so both change in sync. */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          className="absolute inset-0 z-10 flex items-center transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
        >
          <div className="w-full px-6 md:px-12">
            <h1 className="font-playfair leading-none select-none grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-0">
              {/* 3+4. Same photo as the Hero, reused inside the letters. Same background-size,
                  background-position compensated for this span's own offset inside the
                  section, so it lines up pixel-for-pixel with the darkened layer behind it —
                  the text reads as a cutout revealing the original, undarkened photo. */}
              <span
                ref={(el) => { mutedRefs.current[i] = el }}
                className="flex justify-center md:justify-end md:pr-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white md:text-transparent"
                style={{
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: bgSize ?? 'cover',
                  backgroundPosition: mutedBgPositions[i] ?? 'center',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextStroke: '1px rgba(255,255,255,0.55)',
                }}
              >
                {s.wordMuted}
              </span>
              <span
                className="flex justify-center md:justify-start md:pl-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white"
                style={{ textShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
              >
                {s.wordBold}
              </span>
            </h1>

            <div className="mt-8 flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:items-end md:gap-0">
              {/* Mobile-only subtitle, shown above the buttons row */}
              <p className="md:hidden max-w-md text-pink-50 text-base text-center leading-relaxed">
                {s.subtitle}
              </p>

              {/* Buttons row: side by side on mobile, split across the two columns on desktop */}
              <div className="flex gap-4 md:contents">
                {/* Left action — same photo-cutout trick as the muted word, this time filling a button */}
                <a
                  ref={(el) => { historyBtnRefs.current[i] = el }}
                  href="#o-nas"
                  className="font-semibold px-8 py-3 rounded-full border-2 border-white text-white transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.6),0_0_44px_rgba(255,255,255,0.4)] md:justify-self-end md:mr-4"
                  style={{
                    backgroundImage: `url(${s.img})`,
                    backgroundSize: bgSize ?? 'cover',
                    backgroundPosition: historyBtnBgPositions[i] ?? 'center',
                    backgroundRepeat: 'no-repeat',
                    textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                  }}
                >
                  Nasza historia
                </a>

                {/* Right action — subtitle (desktop only here) + solid CTA, on the crisp/bright side */}
                <div className="flex flex-col items-center md:items-start md:pl-4">
                  <p className="hidden md:block max-w-md text-pink-50 text-lg text-left leading-relaxed">
                    {s.subtitle}
                  </p>
                  <a
                    href="#cennik"
                    className="md:mt-4 bg-white text-rose-600 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:bg-rose-50 shadow-md hover:shadow-[0_0_10px_rgba(244,63,94,0.9),0_0_24px_rgba(244,63,94,0.6),0_0_44px_rgba(244,63,94,0.4)]"
                  >
                    Zobacz cennik
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

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
