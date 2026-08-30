import { useEffect, useRef, useState } from 'react'
import artwork from '../assets/brand-statement-artwork.webp'

export default function BrandStatement() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const lines = ['Każdy tort', 'powstaje tylko', 'raz.']

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Desktop / tablet — full-bleed campaign canvas, headline set into the artwork's left negative space */}
      <div
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[600px]"
        style={{
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-brand-pink)',
          transform: active ? 'scale(1)' : 'scale(1.01)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="font-playfair text-[var(--color-cream)]"
          style={{
            marginLeft: '16vw',
            maxWidth: '40vw',
            fontSize: 'clamp(52px, 6.4vw, 108px)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
          }}
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block"
                style={{
                  transform: active ? 'translateY(0)' : 'translateY(100%)',
                  opacity: active ? 1 : 0,
                  transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, opacity 0.9s ease ${i * 120}ms`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Mobile — one integrated crop: pink/watercolor fills the section, headline upper-left, cake lower-right */}
      <div
        className="md:hidden relative"
        style={{
          height: 'clamp(760px, 195vw, 900px)',
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'auto 130%',
          backgroundPosition: '68% 40%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-brand-pink)',
          transform: active ? 'scale(1)' : 'scale(1.01)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="px-6 pt-16">
          <h2
            className="font-playfair text-[var(--color-cream)]"
            style={{ fontSize: 'clamp(42px, 12vw, 58px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="block"
                  style={{
                    transform: active ? 'translateY(0)' : 'translateY(100%)',
                    opacity: active ? 1 : 0,
                    transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, opacity 0.9s ease ${i * 120}ms`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  )
}
