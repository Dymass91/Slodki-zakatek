const navLinks = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#proces', label: 'Proces' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#kontakt', label: 'Kontakt' },
]

function ColumnLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-blush-deep)]/60 mb-4">
      {children}
    </p>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#2c0f18' }} className="pt-14 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-10 md:gap-8">

        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 600, fontSize: '1.2rem', color: 'var(--color-cream)', letterSpacing: '0.01em', lineHeight: 1 }}>
            Słodki Zakątek
          </div>
          <div style={{ fontFamily: "'Lato', Arial, sans-serif", fontSize: '0.56rem', color: 'var(--color-blush-deep)', opacity: 0.7, letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: '6px' }}>
            Agnieszka Włodarczyk
          </div>
          <p className="text-sm text-[var(--color-blush-deep)]/70 leading-relaxed mt-4 max-w-[24ch]">
            Ręcznie robione torty z miłością. Skórka i okolice, od 2019 roku.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=100063707095880"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-[var(--color-cream)]/80 hover:text-rose-300 transition-colors"
          >
            Facebook ↗
          </a>
        </div>

        {/* Navigation */}
        <div>
          <ColumnLabel>Nawigacja</ColumnLabel>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[var(--color-cream)]/85 hover:text-rose-300 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <ColumnLabel>Kontakt</ColumnLabel>
          <ul className="space-y-2 text-sm text-[var(--color-cream)]/85">
            <li>ul. Wrzosowa 2, 64-917 Skórka</li>
            <li>
              <a href="tel:730042213" className="hover:text-rose-300 transition-colors">
                730 042 213
              </a>
            </li>
            <li className="text-[var(--color-blush-deep)]/60 pt-1">Pon–Pt 9:00–17:00</li>
            <li className="text-[var(--color-blush-deep)]/60">Sob 9:00–13:00 · Nd nieczynne</li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10 pt-5 border-t border-[var(--color-blush-deep)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--color-blush-deep)]/45">
        <p>© {new Date().getFullYear()} Słodki Zakątek · Agnieszka Włodarczyk. Wszelkie prawa zastrzeżone.</p>
        <p className="tracking-[0.2em] uppercase">Skórka · Piła · Złotów</p>
      </div>
    </footer>
  )
}
