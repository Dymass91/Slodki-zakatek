import { useEffect, useRef, useState } from 'react'
import artwork from '../assets/about-scene-artwork.png'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

export default function About() {
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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="o-nas" ref={ref} className="relative overflow-hidden">
      {/* Desktop / tablet — Agnieszka + her cakes occupy the left of the prepared artwork,
          HTML typography sits in the intentional negative space on the right. */}
      <div
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[640px]"
        style={{
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-blush)',
          transform: active ? 'scale(1)' : 'scale(1.01)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex justify-end">
          <div className="w-full" style={{ maxWidth: '560px' }}>
            <RevealText as="div">
              <SectionLabel>Poznajmy się</SectionLabel>
            </RevealText>

            <RevealText as="h2" delay={80} className="mt-5">
              <span
                className="block font-playfair text-[var(--color-plum)]"
                style={{ fontSize: 'clamp(40px, 4.6vw, 64px)', lineHeight: 1.05 }}
              >
                Cześć,<br />jestem Agnieszka.
              </span>
            </RevealText>

            <RevealText as="p" delay={160} className="mt-6">
              <span
                className="block font-playfair italic text-rose-500"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.25 }}
              >
                Ręcznie. Spokojnie.<br />Z dbałością o detal.
              </span>
            </RevealText>

            <RevealText as="div" delay={240} className="mt-7 space-y-4">
              <p className="text-[var(--color-plum)]/75 leading-relaxed max-w-[42ch]">
                Wszystko zaczęło się ponad 5 lat temu w małej miejscowości Skórka —
                z pasji do cukiernictwa i marzenia o własnej pracowni.
              </p>
              <p className="text-[var(--color-plum)]/75 leading-relaxed max-w-[42ch]">
                Dziś Słodki Zakątek to kameralna pracownia, w której każdy tort
                powstaje ręcznie, od pierwszego szkicu po ostatni kwiat z lukru —
                dla Skórki, Piły, Złotowa i okolic.
              </p>
            </RevealText>
          </div>
        </div>
      </div>

      {/* Mobile — Agnieszka's face stays the priority; artwork blends into the section via
          a matching background color instead of reading as a separate photo card. */}
      <div
        className="md:hidden relative"
        style={{
          height: 'clamp(780px, 205vw, 940px)',
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'auto 130%',
          backgroundPosition: '28% 18%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-blush)',
          transform: active ? 'scale(1)' : 'scale(1.01)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="absolute left-0 right-0 bottom-0 px-6 pt-10 pb-14"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, var(--color-blush) 22%)',
          }}
        >
          <RevealText as="div">
            <SectionLabel>Poznajmy się</SectionLabel>
          </RevealText>

          <RevealText as="h2" delay={80} className="mt-4">
            <span
              className="block font-playfair text-[var(--color-plum)]"
              style={{ fontSize: 'clamp(36px, 10vw, 48px)', lineHeight: 1.05 }}
            >
              Cześć,<br />jestem Agnieszka.
            </span>
          </RevealText>

          <RevealText as="p" delay={160} className="mt-5">
            <span
              className="block font-playfair italic text-rose-500"
              style={{ fontSize: 'clamp(20px, 6vw, 26px)', lineHeight: 1.25 }}
            >
              Ręcznie. Spokojnie.<br />Z dbałością o detal.
            </span>
          </RevealText>

          <RevealText as="div" delay={240} className="mt-6 space-y-4">
            <p className="text-[var(--color-plum)]/75 leading-relaxed">
              Wszystko zaczęło się ponad 5 lat temu w małej miejscowości Skórka —
              z pasji do cukiernictwa i marzenia o własnej pracowni.
            </p>
            <p className="text-[var(--color-plum)]/75 leading-relaxed">
              Dziś Słodki Zakątek to kameralna pracownia, w której każdy tort
              powstaje ręcznie, od pierwszego szkicu po ostatni kwiat z lukru —
              dla Skórki, Piły, Złotowa i okolic.
            </p>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
