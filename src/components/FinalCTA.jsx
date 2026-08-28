import cake from '../assets/Untitled design (23).png'
import CakeCutout from './primitives/CakeCutout'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

export default function FinalCTA() {
  return (
    <section id="kontakt" className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 items-center gap-10">
        <div className="md:col-span-7 relative z-10">
          <RevealText as="div">
            <SectionLabel>Gotowa na swój wyjątkowy tort?</SectionLabel>
          </RevealText>
          <RevealText as="h2" delay={80} className="mt-5">
            <span
              className="block font-playfair text-[var(--color-plum)]"
              style={{ fontSize: 'clamp(56px, 9vw, 130px)', lineHeight: 0.92 }}
            >
              Masz pomysł?
            </span>
          </RevealText>
          <RevealText as="p" delay={160} className="mt-3">
            <span
              className="block text-rose-500"
              style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(34px, 5vw, 60px)' }}
            >
              Napisz do mnie.
            </span>
          </RevealText>
          <RevealText as="div" delay={240} className="mt-10">
            <a
              href="tel:730042213"
              className="inline-block bg-rose-500 text-white text-sm font-semibold tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-rose-600 transition-colors shadow-lg"
            >
              Zapytaj o termin →
            </a>
            <p className="mt-6 text-[var(--color-plum)]/60 text-sm">
              730 042 213 &nbsp;·&nbsp; ul. Wrzosowa 2, 64-917 Skórka
            </p>
          </RevealText>
        </div>

        <div className="md:col-span-5 flex justify-center md:justify-end relative">
          <CakeCutout
            src={cake}
            alt="Wysoki różowo-biały tort piętrowy z kwiatami"
            className="w-[260px] sm:w-[320px] md:w-[420px]"
          />
        </div>
      </div>
    </section>
  )
}
