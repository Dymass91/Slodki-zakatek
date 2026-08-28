import cake from '../assets/Untitled design (28).png'
import CakeCutout from './primitives/CakeCutout'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-blush)] pt-28 pb-40 md:pt-40 md:pb-56">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <RevealText as="div">
          <SectionLabel>Różne okazje. Jedna pasja.</SectionLabel>
        </RevealText>

        <div className="relative mt-6 md:mt-10">
          <RevealText as="h2" delay={80}>
            <span
              className="block font-playfair text-[var(--color-plum)]"
              style={{ fontSize: 'clamp(64px, 10vw, 150px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
            >
              Każdy inny.
            </span>
          </RevealText>

          {/* Cake breaks out of the text column, overlapping the headline on desktop */}
          <CakeCutout
            src={cake}
            alt="Delikatny tort z różowym lukrem i kwiatami"
            className="hidden md:block absolute -top-10 right-0 w-[300px] lg:w-[380px] z-10 rotate-[4deg]"
          />

          <RevealText as="p" delay={160} className="mt-1 md:mt-2">
            <span
              className="block font-script text-rose-500"
              style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              Tak jak okazja.
            </span>
          </RevealText>

          <CakeCutout
            src={cake}
            alt="Delikatny tort z różowym lukrem i kwiatami"
            className="md:hidden mx-auto w-[220px] mt-10"
          />
        </div>

        <RevealText as="div" delay={240} className="mt-14 md:mt-20 md:ml-[8%] max-w-sm">
          <p className="text-[var(--color-plum)]/80 text-lg leading-relaxed">
            Od delikatnych i romantycznych, po szalone i niebanalne —
            <br />
            Twój pomysł, moje wykonanie.
          </p>
          <a
            href="#realizacje"
            className="inline-block mt-8 text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1 hover:text-rose-700 hover:border-rose-500 transition-colors"
          >
            Zobacz realizacje →
          </a>
        </RevealText>
      </div>
    </section>
  )
}
