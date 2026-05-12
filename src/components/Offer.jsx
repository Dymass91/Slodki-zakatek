const offers = [
  {
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    emoji: '🎂',
    title: 'Torty standardowe',
    desc: 'Eleganckie torty jedno- i dwupoziomowe idealne na urodziny, chrzciny i inne uroczystości rodzinne. Biszkopt waniliowy lub czekoladowy, krem do wyboru.',
    tag: 'od 280 zł',
  },
  {
    gradient: 'linear-gradient(135deg, #ffe4e6 0%, #fda4af 100%)',
    emoji: '🏰',
    title: 'Torty piętrowe',
    desc: 'Imponujące wielopiętrowe konstrukcje na wesela i jubileusze. Każde piętro może mieć inny smak kremu i frużeliny — według Twoich życzeń.',
    tag: 'od 500 zł',
  },
  {
    gradient: 'linear-gradient(135deg, #fff1f2 0%, #fb7185 100%)',
    emoji: '✨',
    title: 'Torty na zamówienie',
    desc: 'Masz konkretną wizję? Własnoręcznie lepione figurki, toppery, kwiaty cukrowe i słodkie wydruki. Wycena indywidualna dla większych projektów.',
    tag: 'wycena indywidualna',
  },
]

export default function Offer() {
  return (
    <section id="oferta" className="py-24 bg-pink-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Co robimy
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800">
            Nasza oferta
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Każde zamówienie to nowe wyzwanie, które podejmujemy z radością.
            Tworzymy torty z pasją i dbałością o każdy szczegół.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map(o => (
            <div key={o.title} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ background: o.gradient }}
              >
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
                  {o.emoji}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-playfair text-xl text-gray-800">{o.title}</h3>
                  <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {o.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flavors strip */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-playfair text-lg text-rose-600 mb-3">Biszkopt</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Waniliowy</li>
              <li>• Czekoladowy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-lg text-rose-600 mb-3">Frużelina / Żelki</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Malina</li>
              <li>• Truskawka</li>
              <li>• Wiśnia</li>
              <li>• Owoce leśne</li>
              <li>• Borówka</li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-lg text-rose-600 mb-3">Smaki kremów</h4>
            <div className="text-sm text-gray-600 columns-2 space-y-1">
              {['Śmietanka','Malina','Truskawka','Czekolada biała','Czekolada mleczna','Czekolada gorzka','Ferrero Rocher','Pistacja','Kinder Bueno','Bounty','Oreo','Borówka'].map(k => (
                <p key={k}>• {k}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
