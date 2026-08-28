import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

const standardowe = [
  { porcje: '10–12 porcji', cena: 'od 280 zł' },
  { porcje: '15 porcji',    cena: 'od 330 zł' },
  { porcje: '18 porcji',    cena: 'od 360 zł' },
  { porcje: '20 porcji',    cena: 'od 390 zł' },
  { porcje: '25 porcji',    cena: 'od 470 zł' },
]

const pietrowe = [
  { porcje: '25 porcji',       cena: 'od 500 zł' },
  { porcje: '30 porcji',       cena: 'od 570 zł' },
  { porcje: '40 porcji',       cena: 'od 710 zł' },
  { porcje: 'Większe torty',   cena: 'cena ustalana indywidualnie' },
]

const kremyLewy = [
  'Śmietanka',
  'Malina',
  'Truskawka',
  'Czekolada (biała, mleczna, gorzka)',
  'Ferrero Rocher',
]

const kremyPrawy = [
  'Pistacja',
  'Kinder Bueno',
  'Bounty',
  'Oreo',
  'Borówka',
]

function PriceRow({ porcje, cena }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-rose-200/60 last:border-b-0">
      <span className="text-[var(--color-plum)]/85">{porcje}</span>
      <span className="text-rose-600 font-semibold whitespace-nowrap text-right">{cena}</span>
    </div>
  )
}

function CategoryLabel({ n }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.25em] text-rose-400/80 mb-2">
      {n}
    </p>
  )
}

export default function Cennik() {
  return (
    <section id="cennik" className="bg-[var(--color-cream)] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12">

        {/* Intro */}
        <RevealText as="div">
          <SectionLabel>Przejrzyste ceny</SectionLabel>
        </RevealText>
        <RevealText as="h2" delay={80} className="mt-4">
          <span
            className="block font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1 }}
          >
            Cennik
          </span>
        </RevealText>
        <RevealText as="p" delay={140} className="mt-5">
          <span className="block text-[var(--color-plum)]/70 leading-relaxed max-w-lg">
            Podane kwoty to ceny minimalne — finalna wycena zależy od wybranego
            smaku, dekoracji i stopnia skomplikowania.
          </span>
        </RevealText>

        {/* Torty standardowe + piętrowe */}
        <RevealText as="div" delay={200} className="mt-16 md:mt-20 grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <CategoryLabel n="01" />
            <h3 className="font-playfair text-[var(--color-plum)] mb-2" style={{ fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
              Torty standardowe
            </h3>
            <div className="mt-4">
              {standardowe.map((r) => <PriceRow key={r.porcje} {...r} />)}
            </div>
          </div>

          <div>
            <CategoryLabel n="02" />
            <h3 className="font-playfair text-[var(--color-plum)] mb-2" style={{ fontSize: 'clamp(28px, 2.6vw, 34px)' }}>
              Torty piętrowe
            </h3>
            <div className="mt-4">
              {pietrowe.map((r) => <PriceRow key={r.porcje} {...r} />)}
            </div>
          </div>
        </RevealText>

        {/* Dodatkowo płatne */}
        <RevealText as="div" delay={260} className="mt-14 md:mt-16 pt-8 border-t border-rose-300/50">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-rose-500/80 mb-2">
            Dodatkowo płatne
          </p>
          <p className="text-[var(--color-plum)]/75 leading-relaxed">
            Figurki lepione własnoręcznie, toppery, kwiaty, słodkie wydruki.
          </p>
        </RevealText>

        {/* Biszkopt / Frużelina / Smaki kremów */}
        <RevealText as="div" delay={320} className="mt-14 md:mt-16">
          <CategoryLabel n="03" />
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-8 mt-4">
            <div>
              <h4 className="font-playfair text-[var(--color-plum)] text-xl mb-3">Biszkopt</h4>
              <p className="text-[var(--color-plum)]/70 text-sm">Waniliowy lub czekoladowy</p>
            </div>

            <div>
              <h4 className="font-playfair text-[var(--color-plum)] text-xl mb-3">Frużelina / Żelki</h4>
              <ul className="space-y-1">
                {['Malina', 'Truskawka', 'Wiśnia', 'Owoce leśne', 'Borówka'].map((s) => (
                  <li key={s} className="text-[var(--color-plum)]/70 text-sm">{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-playfair text-[var(--color-plum)] text-xl mb-3">Smaki kremów</h4>
              <div className="grid grid-cols-2 gap-x-4">
                <ul className="space-y-1">
                  {kremyLewy.map((k) => (
                    <li key={k} className="text-[var(--color-plum)]/70 text-sm leading-snug">{k}</li>
                  ))}
                </ul>
                <ul className="space-y-1">
                  {kremyPrawy.map((k) => (
                    <li key={k} className="text-[var(--color-plum)]/70 text-sm leading-snug">{k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealText>

        {/* Godziny pracy */}
        <RevealText as="div" delay={380} className="mt-14 md:mt-16 py-6 border-y border-rose-300/50 text-center">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-rose-500/80 mb-2">
            Godziny pracy
          </p>
          <p className="text-[var(--color-plum)]/80">
            Pon.–Pt.&nbsp; 9:00–17:00 &nbsp;·&nbsp; Sob.&nbsp; 9:00–13:00 &nbsp;·&nbsp; Nd.&nbsp; Nieczynne
          </p>
        </RevealText>

        {/* Dane firmy */}
        <div className="mt-10 text-center text-sm text-[var(--color-plum)]/60 space-y-1">
          <p className="font-semibold text-[var(--color-plum)]/80">Słodki Zakątek Agnieszka Włodarczyk</p>
          <p>
            ul. Wrzosowa 2, 64-917 Skórka &nbsp;·&nbsp; tel.&nbsp;
            <a href="tel:730042213" className="text-rose-500 hover:underline">730 042 213</a>
          </p>
          <p className="text-xs text-[var(--color-plum)]/40 uppercase tracking-wide pt-1">
            Cennik obowiązuje od 1 listopada 2025 r.
          </p>
        </div>

      </div>
    </section>
  )
}
