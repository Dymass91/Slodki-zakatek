import artwork from '../assets/manifesto-artwork.png'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'
import useSceneFade from '../hooks/useSceneFade'

export default function Manifesto() {
  const [fadeRef, fadeStyle] = useSceneFade('scene-wedding')
  return (
    <>
      {/* Desktop / tablet: the prepared artwork IS the section background — cake stays
          anchored to the right, empty left area holds the real HTML typography.
          This is the FIRST panel in the shared editorial stacked-scroll sequence
          (continues through Wedding / Custom 02 / Custom 03 in CakeStory). */}
      <div
        id="scene-manifesto"
        className="hidden md:flex items-center overflow-hidden h-screen min-h-[560px] sticky top-0"
        style={{
          zIndex: 1,
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          ...fadeStyle,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-md lg:max-w-lg lg:pl-4">
            <RevealText as="div">
              <SectionLabel>Różne okazje. Jedna pasja.</SectionLabel>
            </RevealText>

            <RevealText as="h2" delay={80} className="mt-6">
              <span
                className="block font-playfair text-[var(--color-plum)]"
                style={{ fontSize: 'clamp(56px, 6.5vw, 108px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
              >
                Każdy inny.
              </span>
            </RevealText>

            <RevealText as="p" delay={160} className="mt-1">
              <span
                className="block text-rose-500"
                style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 4.4vw, 62px)' }}
              >
                Tak jak okazja.
              </span>
            </RevealText>

            <RevealText as="p" delay={240} className="mt-8 max-w-xs">
              <span className="block text-[var(--color-plum)]/75 leading-relaxed">
                Od delikatnych i romantycznych, po szalone i niebanalne —
                Twój pomysł, moje wykonanie.
              </span>
            </RevealText>

            <RevealText as="div" delay={320} className="mt-8">
              <a
                href="#realizacje"
                className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1 hover:text-rose-700 hover:border-rose-500 transition-colors"
              >
                Zobacz realizacje →
              </a>
            </RevealText>
          </div>
        </div>
      </div>

      {/* Mobile: one integrated composition — the artwork is the section's own background
          (scaled up + cropped so the cake reads large, right side, allowed to bleed off-edge),
          with the HTML typography layered directly on top. Not a banner + text stack. */}
      <div
        ref={fadeRef}
        className="md:hidden relative overflow-hidden"
        style={{
          height: 'clamp(850px, 220vw, 1000px)',
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'auto 108%',
          backgroundPosition: '82% 38%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--color-blush)',
          ...fadeStyle,
        }}
      >
        <div className="relative z-10 h-full flex flex-col px-6 pt-16">
          <RevealText as="div">
            <SectionLabel>Różne okazje. Jedna pasja.</SectionLabel>
          </RevealText>

          <RevealText as="h2" delay={80} className="mt-5">
            <span
              className="block font-playfair text-[var(--color-plum)]"
              style={{ fontSize: 'clamp(48px, 14vw, 68px)', lineHeight: 0.92, letterSpacing: '-0.01em' }}
            >
              Każdy<br />inny.
            </span>
          </RevealText>

          <RevealText as="p" delay={160} className="mt-1">
            <span
              className="block text-rose-500"
              style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(34px, 10vw, 46px)' }}
            >
              Tak jak okazja.
            </span>
          </RevealText>

          {/* Negative space for the cake to read as a real object, not covered by text */}
          <div className="flex-1 min-h-[140px]" />

          <div className="pb-14 max-w-[72%]">
            <RevealText as="p" delay={240}>
              <span className="block text-[var(--color-plum)]/80 leading-relaxed">
                Od delikatnych i romantycznych, po szalone i niebanalne — Twój pomysł, moje wykonanie.
              </span>
            </RevealText>
            <RevealText as="div" delay={320} className="mt-7">
              <a
                href="#realizacje"
                className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1"
              >
                Zobacz realizacje →
              </a>
            </RevealText>
          </div>
        </div>
      </div>
    </>
  )
}
