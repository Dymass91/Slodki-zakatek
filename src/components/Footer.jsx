export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start">

        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#fda4af',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}>
              Słodki Zakątek
            </div>
            <div style={{
              fontFamily: "'Lato', Arial, sans-serif",
              fontWeight: 400,
              fontSize: '0.6rem',
              color: '#9d7070',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '3px',
            }}>
              Agnieszka Włodarczyk
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ręcznie robione torty z miłością.<br />
            Skórka i okolice, od 2019 roku.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=100063707095880"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-rose-400 hover:text-rose-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Słodki Zakątek na Facebooku
          </a>
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
