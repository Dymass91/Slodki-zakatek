import cakeWedding from '../assets/Untitled design (21).png'
import cakeElegant from '../assets/Untitled design (23).png'
import cakeCustom from '../assets/Untitled design (26).png'
import cakeBirthday from '../assets/tort przezroczyste tlo.png'
import CakeCutout from './primitives/CakeCutout'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

export default function SelectedWork() {
  return (
    <section id="realizacje" className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <RevealText as="div">
          <SectionLabel>Wybrane realizacje</SectionLabel>
        </RevealText>
        <RevealText as="h2" delay={80} className="mt-5">
          <span
            className="block font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 1 }}
          >
            Każda okazja,<br />inna historia.
          </span>
        </RevealText>
      </div>

      {/* Asymmetric exhibition layout — varied scale, offset, cakes crossing column edges */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 md:mt-28 grid md:grid-cols-12 gap-y-24 md:gap-y-0">

        <RevealText as="div" className="md:col-span-6 md:col-start-1 relative">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-4">Śluby</p>
          <CakeCutout
            src={cakeWedding}
            alt="Biały piętrowy tort weselny"
            className="w-[75%] md:w-[85%]"
          />
        </RevealText>

        <RevealText
          as="div"
          delay={120}
          className="md:col-span-5 md:col-start-8 relative md:-mt-16 flex flex-col items-end text-right"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-4">Uroczystości</p>
          <CakeCutout
            src={cakeElegant}
            alt="Wysoki różowo-biały tort piętrowy z kwiatami"
            className="w-[70%] md:w-[75%]"
          />
        </RevealText>

        <RevealText
          as="div"
          delay={80}
          className="md:col-span-5 md:col-start-2 relative md:mt-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-4">Nietypowe</p>
          <CakeCutout
            src={cakeCustom}
            alt="Tort w motywie beczki whisky"
            className="w-[70%] md:w-[78%]"
          />
        </RevealText>

        <RevealText
          as="div"
          delay={160}
          className="md:col-span-5 md:col-start-8 relative md:-mt-4 flex flex-col items-end text-right"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-500/80 mb-4">Urodziny</p>
          <CakeCutout
            src={cakeBirthday}
            alt="Wyrazisty różowy tort urodzinowy z kwiatami"
            className="w-[68%] md:w-[72%]"
          />
        </RevealText>
      </div>

      <RevealText as="div" delay={200} className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 md:mt-16">
        <a
          href="#cennik"
          className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1 hover:text-rose-700 hover:border-rose-500 transition-colors"
        >
          Zobacz cennik →
        </a>
      </RevealText>
    </section>
  )
}
