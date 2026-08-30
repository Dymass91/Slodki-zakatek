import { useEffect, useRef, useState } from 'react'
import weddingArtwork from '../assets/wedding-scene-artwork.webp'
import customArtwork from '../assets/custom-scene-artwork.webp'
import colorfulArtwork from '../assets/colorful-scene-artwork.webp'
import useSceneFade from '../hooks/useSceneFade'

// Wedding scene is fully art-directed: the prepared artwork already contains the real
// cake, warm cream background and watercolor texture, so it's used as the scene's own
// background (same technique as the Manifesto section) instead of the generic
// text-column + isolated-cake layout the other two scenes use.
function WeddingScene() {
  const ref = useRef(null)
  const [fadeRef, fadeStyle] = useSceneFade('scene-custom02')
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

  return (
    <div
      id="scene-wedding"
      ref={(el) => { ref.current = el; fadeRef.current = el }}
      className="sticky top-0 overflow-hidden"
      style={{ zIndex: 2, ...fadeStyle }}
    >
      {/* Desktop / tablet */}
      <div
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[560px]"
        style={{
          backgroundImage: `url(${weddingArtwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-xl lg:max-w-2xl lg:pl-4">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-5"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              Wedding / 01
            </p>
            <h3
              className="font-playfair text-[var(--color-plum)] whitespace-nowrap"
              style={{ fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}
            >
              {['Dla chwil,', 'które zostają.'].map((line, i) => (
                <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.16em" }}>
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
          </div>
        </div>
      </div>

      {/* Mobile — one integrated crop, headline upper-left, cake reads large lower-right */}
      <div
        className="md:hidden relative"
        style={{
          height: 'clamp(850px, 220vw, 1000px)',
          backgroundImage: `url(${weddingArtwork})`,
          backgroundSize: 'auto 108%',
          backgroundPosition: '80% 42%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-cream)',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="px-6 pt-16">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-5"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Wedding / 01
          </p>
          <h3
            className="font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(44px, 12vw, 60px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}
          >
            {['Dla chwil,', 'które zostają.'].map((line, i) => (
              <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.16em" }}>
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
        </div>
      </div>
    </div>
  )
}

// Custom / 02 is fully art-directed like the Wedding scene: the prepared artwork already
// contains the real treasure-chest cake, deep burgundy background and gold watercolor
// texture, so it's used as the scene's own background instead of an isolated cutout.
function CustomScene() {
  const ref = useRef(null)
  const [fadeRef, fadeStyle] = useSceneFade('scene-custom03')
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

  const heading = ['A czasem…', 'bez żadnych', 'zasad.']

  return (
    <div
      id="scene-custom02"
      ref={(el) => { ref.current = el; fadeRef.current = el }}
      className="sticky top-0 overflow-hidden"
      style={{ zIndex: 3, ...fadeStyle }}
    >
      {/* Desktop / tablet */}
      <div
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[560px]"
        style={{
          backgroundImage: `url(${customArtwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-md lg:max-w-lg lg:pl-4">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
              style={{
                color: 'var(--color-blush-deep)',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              Custom / 02
            </p>
            <h3
              className="font-playfair"
              style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 1, letterSpacing: '-0.01em', color: 'var(--color-cream)' }}
            >
              {heading.map((line, i) => (
                <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.16em" }}>
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
          </div>
        </div>
      </div>

      {/* Mobile — one integrated crop: dark burgundy fills the section, headline upper-left, chest reads large lower-right */}
      <div
        className="md:hidden relative"
        style={{
          height: 'clamp(850px, 220vw, 1000px)',
          backgroundImage: `url(${customArtwork})`,
          backgroundSize: 'auto 120%',
          backgroundPosition: '78% 46%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-plum)',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="px-6 pt-16">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
            style={{
              color: 'var(--color-blush-deep)',
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Custom / 02
          </p>
          <h3
            className="font-playfair"
            style={{ fontSize: 'clamp(40px, 11vw, 54px)', lineHeight: 1, letterSpacing: '-0.01em', color: 'var(--color-cream)' }}
          >
            {heading.map((line, i) => (
              <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.16em" }}>
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
        </div>
      </div>
    </div>
  )
}

// Custom / 03 closes the story with the same art-directed approach: the prepared
// artwork already contains the real colorful cake, pale blush background and watercolor
// texture, used as the scene's own background instead of an isolated cutout.
function ColorfulScene() {
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

  const heading = ['Twój pomysł.', 'Moje wykonanie.']
  const sub = 'Od pierwszego pomysłu po ostatni detal.'

  return (
    <div id="scene-custom03" ref={ref} className="sticky top-0 overflow-hidden" style={{ zIndex: 4 }}>
      {/* Desktop / tablet */}
      <div
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[560px]"
        style={{
          backgroundImage: `url(${colorfulArtwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl lg:max-w-3xl lg:pl-4">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-5"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              Custom / 03
            </p>
            <h3
              className="font-playfair text-[var(--color-plum)] whitespace-nowrap"
              style={{ fontSize: 'clamp(44px, 5.2vw, 72px)', lineHeight: 1, letterSpacing: '-0.01em' }}
            >
              {heading.map((line, i) => (
                <span key={line} className="block overflow-hidden" style={{ paddingBottom: '0.16em' }}>
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
            <p
              className="mt-6 text-base text-[var(--color-plum)]/70"
              style={{ opacity: active ? 1 : 0, transition: 'opacity 1s ease 300ms' }}
            >
              {sub}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile — one integrated crop: blush watercolor fills the section, headline upper-left, cake reads large lower-right */}
      <div
        className="md:hidden relative"
        style={{
          height: 'clamp(850px, 220vw, 1000px)',
          backgroundImage: `url(${colorfulArtwork})`,
          backgroundSize: 'auto 118%',
          backgroundPosition: '76% 44%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-blush)',
          transform: active ? 'scale(1)' : 'scale(1.015)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="px-6 pt-16">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-5"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Custom / 03
          </p>
          <h3
            className="font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(40px, 11vw, 54px)', lineHeight: 1, letterSpacing: '-0.01em' }}
          >
            {heading.map((line, i) => (
              <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.16em" }}>
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
        </div>

        <div className="absolute left-0 right-0 bottom-0 px-6 pb-12">
          <p
            className="text-base text-[var(--color-plum)]/70 max-w-[55%]"
            style={{ opacity: active ? 1 : 0, transition: 'opacity 1s ease 300ms' }}
          >
            {sub}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CakeStory() {
  return (
    <>
      <WeddingScene />
      <CustomScene />
      <ColorfulScene />
    </>
  )
}
