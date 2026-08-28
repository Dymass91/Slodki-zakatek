import { useEffect, useRef, useState } from 'react'
import cakeWedding from '../assets/Untitled design (20).png'
import cakeCustom from '../assets/Untitled design (24).png'
import cakeColorful from '../assets/Untitled design (25).png'
import CakeCutout from './primitives/CakeCutout'

const scenes = [
  {
    label: 'Wedding / 01',
    heading: ['Dla chwil,', 'które zostają.'],
    cake: cakeWedding,
    alt: 'Biały piętrowy tort weselny z białymi różami',
    bg: 'var(--color-cream)',
  },
  {
    label: 'Custom / 02',
    heading: ['A czasem…', 'bez żadnych zasad.'],
    cake: cakeCustom,
    alt: 'Nietypowy tort w kształcie skrzyni skarbów z ośmiornicą',
    bg: 'var(--color-plum)',
    dark: true,
  },
  {
    label: 'Custom / 03',
    heading: ['Twój pomysł.', 'Moje wykonanie.'],
    sub: 'Od pierwszego pomysłu po ostatni detal.',
    cake: cakeColorful,
    alt: 'Kolorowy piętrowy tort z lodami i makaronikami',
    bg: 'var(--color-blush)',
  },
]

function Scene({ scene, index }) {
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

  const flip = index % 2 === 1

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen min-h-[560px] flex items-center overflow-hidden"
      style={{ background: scene.bg, zIndex: index + 1 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-8 items-center">
        <div className={`relative ${flip ? 'md:order-2' : ''}`}>
          <p
            className={`text-xs font-semibold tracking-[0.3em] uppercase mb-4 ${scene.dark ? 'text-cream/60' : 'text-rose-500/80'}`}
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {scene.label}
          </p>
          <h3
            className="font-playfair"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: scene.dark ? 'var(--color-cream)' : 'var(--color-plum)',
            }}
          >
            {scene.heading.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="block"
                  style={{
                    transform: active ? 'translateY(0)' : 'translateY(100%)',
                    transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h3>
          {scene.sub && (
            <p
              className={`mt-6 text-lg max-w-xs ${scene.dark ? 'text-cream/70' : 'text-[var(--color-plum)]/70'}`}
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 1s ease 300ms',
              }}
            >
              {scene.sub}
            </p>
          )}
        </div>

        <div className={`relative flex justify-center ${flip ? 'md:order-1' : ''}`}>
          <CakeCutout
            src={scene.cake}
            alt={scene.alt}
            className="w-[240px] sm:w-[300px] md:w-[380px] lg:w-[440px]"
            style={{
              filter: 'drop-shadow(0 40px 60px rgba(66,26,39,0.25))',
              transform: active ? 'scale(1) rotate(0deg)' : 'scale(0.96) rotate(-2deg)',
              opacity: active ? 1 : 0,
              transition: 'transform 1s cubic-bezier(0.22,1,0.36,1), opacity 1s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function CakeStory() {
  return (
    <section aria-label="Historia w trzech odsłonach">
      {scenes.map((scene, i) => (
        <Scene key={scene.label} scene={scene} index={i} />
      ))}
    </section>
  )
}
