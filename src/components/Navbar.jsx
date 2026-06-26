const links = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#be185d',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}>
            Słodki Zakątek
          </div>
          <div style={{
            fontFamily: "'Lato', Arial, sans-serif",
            fontWeight: 400,
            fontSize: '0.62rem',
            color: '#9d174d',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '3px',
          }}>
            Agnieszka Włodarczyk
          </div>
        </a>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold tracking-wide text-rose-700 hover:text-pink-500 transition-colors uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=100063707095880"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-pink-500 transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>
          <a
            href="#kontakt"
            className="bg-rose-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-rose-600 transition-colors"
          >
            Zamów tort
          </a>
        </div>
      </div>
    </nav>
  )
}
