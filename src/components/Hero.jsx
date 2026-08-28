import { useEffect, useRef, useState } from 'react'
import heroArtwork from '../assets/hero-artwork.png'

export default function Hero() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 60)
    return () => clearTimeout(t)
  }, [])

  const ease = 'cubic-bezier(0.22,1,0.36,1)'
  const lineStyle = (delay) => ({
    transform: active ? 'translateY(0)' : 'translateY(100%)',
    transition: `transform 0.9s ${ease} ${delay}ms`,
  })
  const fadeStyle = (delay, distance = 16) => ({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: `opacity 0.8s ${ease} ${delay}ms, transform 0.8s ${ease} ${delay}ms`,
  })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* Desktop / tablet — prepared artwork is the full hero background; cake stays right, text sits in the intentional left negative space */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          backgroundImage: `url(${heroArtwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-cream)',
        }}
      />

      {/* Mobile — intentional crop keeping the cake visible */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          backgroundImage: `url(${heroArtwork})`,
          backgroundSize: 'auto 112%',
          backgroundPosition: '78% 30%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-cream)',
        }}
      />

      <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col">
        {/* Metadata — editorial masthead */}
        <div className="flex items-start justify-between pt-24 md:pt-28 shrink-0">
          <p
            className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[var(--color-plum)]/70"
            style={fadeStyle(80)}
          >
            Słodki Zakątek<br className="md:hidden" />
            <span className="hidden md:inline"> — </span>
            Torty na zamówienie
          </p>
          <p
            className="hidden sm:block text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-rose-500/80 text-right"
            style={fadeStyle(140)}
          >
            Skórka · Piła · Złotów
          </p>
        </div>

        {/* Headline — positioned in the artwork's intentional left negative space */}
        <div className="relative flex-1 min-h-0 mt-4 md:mt-6 flex items-center">
          <h1
            className="relative z-10 font-playfair text-[var(--color-plum)] select-none"
            style={{
              fontSize: 'clamp(2.6rem, 6.4vw, 6.2rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              maxWidth: 'min(52vw, 620px)',
              marginLeft: 'clamp(0px, 6vw, 96px)',
            }}
          >
            <span className="block overflow-hidden">
              <span className="block" style={lineStyle(160)}>Torty,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" style={lineStyle(250)}>które zostają</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" style={lineStyle(340)}>
                w <em className="italic text-rose-500">pamięci</em>.
              </span>
            </span>
          </h1>
        </div>

        {/* CTA */}
        <div className="shrink-0 pb-10 md:pb-12 flex justify-center md:justify-start">
          <a
            href="#kontakt"
            style={fadeStyle(520)}
            className="group inline-flex items-center gap-2 text-sm md:text-base font-semibold tracking-[0.1em] uppercase text-rose-600 border-b border-rose-300 pb-1 hover:border-rose-500 hover:text-rose-700 transition-colors"
          >
            Zamów tort
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
