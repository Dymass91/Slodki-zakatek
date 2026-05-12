const standardowe = [
  { porcje: '10–12 porcji', cena: 'od 280 zł' },
  { porcje: '15 porcji', cena: 'od 330 zł' },
  { porcje: '18 porcji', cena: 'od 360 zł' },
  { porcje: '20 porcji', cena: 'od 390 zł' },
  { porcje: '25 porcji', cena: 'od 470 zł' },
]

const pietrowe = [
  { porcje: '25 porcji', cena: 'od 500 zł' },
  { porcje: '30 porcji', cena: 'od 570 zł' },
  { porcje: '40 porcji', cena: 'od 710 zł' },
  { porcje: 'Większe torty', cena: 'wycena indywidualna' },
]

function PriceTable({ rows }) {
  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div
          key={r.porcje}
          className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm border border-pink-100"
        >
          <span className="text-gray-700 font-medium">{r.porcje}</span>
          <span className="text-rose-600 font-bold">{r.cena}</span>
        </div>
      ))}
    </div>
  )
}

export default function Cennik() {
  return (
    <section id="cennik" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Przejrzyste ceny
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
            Cennik
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Ceny obowiązują od 1 listopada 2025 r. Podane kwoty to ceny minimalne —
            finalna wycena zależy od wybranego smaku, dekoracji i stopnia skomplikowania.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Standardowe */}
          <div className="bg-pink-50 rounded-3xl p-7">
            <h3 className="font-playfair text-2xl text-rose-700 mb-6 text-center">
              Torty standardowe
            </h3>
            <PriceTable rows={standardowe} />
          </div>

          {/* Piętrowe */}
          <div className="bg-rose-50 rounded-3xl p-7">
            <h3 className="font-playfair text-2xl text-rose-700 mb-6 text-center">
              Torty piętrowe
            </h3>
            <PriceTable rows={pietrowe} />
          </div>

        </div>

        {/* Dodatkowo płatne */}
        <div className="mt-10 bg-pink-100 rounded-3xl p-7 text-center">
          <h3 className="font-playfair text-xl text-rose-700 mb-3">
            Dodatkowo płatne
          </h3>
          <p className="text-gray-600 text-sm">
            Figurki lepione własnoręcznie &nbsp;·&nbsp; Toppery &nbsp;·&nbsp;
            Kwiaty cukrowe &nbsp;·&nbsp; Słodkie wydruki
          </p>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Cennik obowiązuje od 1 listopada 2025 r.
        </p>
      </div>
    </section>
  )
}
