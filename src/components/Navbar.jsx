import logoImg from '../assets/slodkizakateklogo.jpg'

const links = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero">
          <img src={logoImg} alt="Słodki Zakątek" className="h-14 w-auto" />
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
        <a
          href="#kontakt"
          className="hidden md:inline-block bg-rose-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-rose-600 transition-colors"
        >
          Zamów tort
        </a>
      </div>
    </nav>
  )
}
