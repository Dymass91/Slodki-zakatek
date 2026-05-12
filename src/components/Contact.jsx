export default function Contact() {
  return (
    <section id="kontakt" className="py-24 bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Odwiedź nas
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800">
            Kontakt
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">

          {/* Phone */}
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-playfair text-lg text-gray-800 mb-2">Telefon</h4>
            <a href="tel:730042213" className="text-rose-600 font-semibold text-lg hover:underline">
              730 042 213
            </a>
          </div>

          {/* Address */}
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-playfair text-lg text-gray-800 mb-2">Adres</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              ul. Wrzosowa 2<br />
              64-917 Skórka
            </p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-playfair text-lg text-gray-800 mb-2">Godziny pracy</h4>
            <div className="text-gray-600 text-sm space-y-1">
              <p><span className="font-medium">Pon – Pt:</span> 9:00 – 17:00</p>
              <p><span className="font-medium">Sobota:</span> 9:00 – 13:00</p>
              <p className="text-rose-400"><span className="font-medium">Niedziela:</span> Nieczynne</p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center bg-rose-500 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="font-playfair text-3xl mb-3">Masz pytanie lub chcesz złożyć zamówienie?</h3>
          <p className="text-rose-100 mb-7 max-w-lg mx-auto">
            Zadzwoń lub napisz — chętnie omówimy szczegóły Twojego wymarzonego tortu.
            Rezerwacje przyjmujemy z wyprzedzeniem.
          </p>
          <a
            href="tel:730042213"
            className="inline-block bg-white text-rose-600 font-bold px-10 py-4 rounded-full text-lg hover:bg-rose-50 transition-colors shadow-md"
          >
            Zadzwoń: 730 042 213
          </a>
        </div>

      </div>
    </section>
  )
}
