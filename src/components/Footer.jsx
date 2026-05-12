import logoImg from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start">

        <div>
          <img src={logoImg} alt="Słodki Zakątek" className="h-20 w-auto mb-4 brightness-0 invert opacity-80" />
          <p className="text-sm text-gray-500 leading-relaxed">
            Ręcznie robione torty z miłością.<br />
            Skórka i okolice, od 2019 roku.
          </p>
        </div>

        <div>
          <h4 className="font-playfair text-white text-lg mb-4">Szybkie linki</h4>
          <ul className="space-y-2 text-sm">
            {['#o-nas', '#oferta', '#cennik', '#kontakt'].map((href) => (
              <li key={href}>
                <a href={href} className="hover:text-rose-400 transition-colors capitalize">
                  {href.replace('#', '')}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-playfair text-white text-lg mb-4">Dane kontaktowe</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>ul. Wrzosowa 2, 64-917 Skórka</li>
            <li>
              <a href="tel:730042213" className="hover:text-rose-400 transition-colors">
                730 042 213
              </a>
            </li>
            <li className="text-gray-500">Pon–Pt 9–17 · Sob 9–13 · Nd nieczynne</li>
          </ul>
        </div>

      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Słodki Zakątek Agnieszka Włodarczyk. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  )
}
