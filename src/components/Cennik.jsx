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
    <div className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm border border-pink-100">
      <span className="text-gray-700 font-medium">{porcje}</span>
      <span className="text-rose-600 font-bold whitespace-nowrap ml-4">{cena}</span>
    </div>
  )
}

export default function Cennik() {
  return (
    <section id="cennik" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Nagłówek */}
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Przejrzyste ceny
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
            Cennik
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Podane kwoty to ceny minimalne — finalna wycena zależy od wybranego
            smaku, dekoracji i stopnia skomplikowania.
          </p>
        </div>

        {/* Torty standardowe + piętrowe */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          <div className="bg-pink-50 rounded-3xl p-7">
            <h3 className="font-playfair text-2xl text-rose-700 mb-5 text-center">
              Torty standardowe
            </h3>
            <div className="space-y-2">
              {standardowe.map(r => <PriceRow key={r.porcje} {...r} />)}
            </div>
          </div>

          <div className="bg-rose-50 rounded-3xl p-7">
            <h3 className="font-playfair text-2xl text-rose-700 mb-5 text-center">
              Torty piętrowe
            </h3>
            <div className="space-y-2">
              {pietrowe.map(r => <PriceRow key={r.porcje} {...r} />)}
            </div>
          </div>

        </div>

        {/* Dodatkowo płatne */}
        <div className="bg-pink-100 rounded-3xl p-7 text-center mb-8">
          <h3 className="font-playfair text-xl text-rose-700 mb-3">
            Dodatkowo płatne:
          </h3>
          <p className="text-gray-700 font-semibold uppercase tracking-wide text-sm">
            Figurki lepione własnoręcznie, toppery, kwiaty, słodkie wydruki.
          </p>
        </div>

        {/* Biszkopt + Frużelina + Kremy */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* Biszkopt */}
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-7">
            <h3 className="font-playfair text-xl text-rose-700 mb-4 text-center">
              Biszkopt
            </h3>
            <p className="text-center text-gray-500 text-sm uppercase tracking-wide font-semibold">
              Waniliowy lub czekoladowy
            </p>
          </div>

          {/* Frużelina/Żelki */}
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-7">
            <h3 className="font-playfair text-xl text-rose-700 mb-4 text-center">
              Frużelina / Żelki
            </h3>
            <ul className="space-y-1 text-center">
              {['Malina', 'Truskawka', 'Wiśnia', 'Owoce leśne', 'Borówka'].map(s => (
                <li key={s} className="text-gray-600 text-sm uppercase tracking-wide font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Smaki kremów */}
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-7">
            <h3 className="font-playfair text-xl text-rose-700 mb-4 text-center">
              Smaki kremów
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-1">
                {kremyLewy.map(k => (
                  <li key={k} className="text-gray-600 text-xs uppercase tracking-wide font-medium leading-snug">
                    {k}
                  </li>
                ))}
              </ul>
              <ul className="space-y-1">
                {kremyPrawy.map(k => (
                  <li key={k} className="text-gray-600 text-xs uppercase tracking-wide font-medium leading-snug">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Godziny pracy */}
        <div className="bg-rose-500 rounded-3xl p-7 text-white text-center mb-6">
          <h3 className="font-playfair text-xl mb-3">Godziny pracy</h3>
          <p className="font-bold tracking-wide uppercase text-sm">
            Pon.–Pt.&nbsp; 9:00–17:00 &nbsp;·&nbsp; Sob.&nbsp; 9:00–13:00 &nbsp;·&nbsp; Nd.&nbsp; Nieczynne
          </p>
        </div>

        {/* Dane firmy */}
        <div className="text-center text-sm text-gray-500 space-y-1">
          <p className="font-semibold text-gray-700">Słodki Zakątek Agnieszka Włodarczyk</p>
          <p>ul. Wrzosowa 2, 64-917 Skórka &nbsp;·&nbsp; tel.&nbsp;
            <a href="tel:730042213" className="text-rose-500 hover:underline">730 042 213</a>
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide pt-1">
            Cennik obowiązuje od 1 listopada 2025 r.
          </p>
        </div>

      </div>
    </section>
  )
}
