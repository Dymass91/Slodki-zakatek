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
    <section id="proces" className="bg-[var(--color-blush)] py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <RevealText as="h2">
          <span
            className="block font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1 }}
          >
            Jak powstaje<br />Twój tort?
          </span>
        </RevealText>

        <div className="mt-8 md:mt-12">
          {steps.map((step, i) => (
            <RevealText
              key={step.n}
              delay={i * 90}
              className="grid md:grid-cols-12 items-center gap-3 md:gap-8 py-5 md:py-7 border-t border-rose-200/70 last:border-b"
            >
              <span
                className="md:col-span-4 font-playfair text-rose-300 select-none"
                style={{ fontSize: 'clamp(56px, 8vw, 150px)', lineHeight: 0.8 }}
              >
                {step.n}
              </span>
              <div className="md:col-span-8">
                <h3 className="font-playfair text-xl md:text-2xl text-[var(--color-plum)] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[var(--color-plum)]/70 text-base max-w-md">{step.desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  )
}
