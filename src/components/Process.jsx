import RevealText from './primitives/RevealText'

const steps = [
  {
    n: '01',
    title: 'Napisz do mnie',
    desc: 'Opowiedz mi o swojej okazji, pomyśle i terminie.',
  },
  {
    n: '02',
    title: 'Tworzymy plan',
    desc: 'Wspólnie ustalamy smak, wygląd i najważniejsze detale.',
  },
  {
    n: '03',
    title: 'Odbierasz swój tort',
    desc: 'Gotowy tort czeka na Ciebie — wyjątkowy i jedyny w swoim rodzaju.',
  },
]

export default function Process() {
  return (
    <section id="proces" className="bg-[var(--color-blush)] py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <RevealText as="h2">
          <span
            className="block font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 1 }}
          >
            Jak powstaje<br />Twój tort?
          </span>
        </RevealText>

        <div className="mt-16 md:mt-24">
          {steps.map((step, i) => (
            <RevealText
              key={step.n}
              delay={i * 90}
              className="grid md:grid-cols-12 items-baseline gap-4 md:gap-8 py-10 md:py-14 border-t border-rose-200/70 last:border-b"
            >
              <span
                className="md:col-span-4 font-playfair text-rose-300 select-none"
                style={{ fontSize: 'clamp(90px, 12vw, 220px)', lineHeight: 0.8 }}
              >
                {step.n}
              </span>
              <div className="md:col-span-8">
                <h3 className="font-playfair text-2xl md:text-4xl text-[var(--color-plum)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-plum)]/70 text-lg max-w-md">{step.desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  )
}
