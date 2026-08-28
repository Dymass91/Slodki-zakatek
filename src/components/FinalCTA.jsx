import RevealText from './primitives/RevealText'

export default function FinalCTA() {
  return (
    <section
      id="kontakt"
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: 'clamp(560px, 78vh, 900px)',
        background: 'linear-gradient(160deg, var(--color-plum) 0%, #33131f 100%)',
      }}
    >
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 w-full py-20">
        <RevealText as="div">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-blush-deep)]">
            Gotowa na swój wyjątkowy tort?
          </p>
        </RevealText>

        <div className="mt-6 md:mt-8 grid md:grid-cols-12 gap-x-8 gap-y-10 items-end">
          <div className="md:col-span-8">
            <RevealText as="h2" delay={80}>
              <span
                className="block font-playfair text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', lineHeight: 0.85, letterSpacing: '-0.02em' }}
              >
                Masz<br />pomysł?
              </span>
            </RevealText>
            <RevealText as="p" delay={160} className="mt-4 md:mt-6">
              <span
                className="block text-rose-300"
                style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(34px, 5vw, 58px)' }}
              >
                Napisz do mnie.
              </span>
            </RevealText>
          </div>

          <div className="md:col-span-4 md:border-l md:border-[var(--color-blush-deep)]/25 md:pl-8">
            <RevealText as="div" delay={260}>
              <a
                href="tel:730042213"
                className="inline-flex items-center gap-2 text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-[var(--color-cream)] border-b border-rose-300/60 pb-1 hover:text-rose-300 hover:border-rose-300 transition-colors"
              >
                Zapytaj o termin
                <span aria-hidden>→</span>
              </a>
              <p className="mt-6 text-[var(--color-blush-deep)]/80 text-sm leading-relaxed">
                730 042 213<br />
                ul. Wrzosowa 2, 64-917 Skórka
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  )
}
