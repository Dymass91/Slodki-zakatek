import { useEffect, useState } from 'react'
import logo from '../assets/logo-mark.png'

const links = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#proces', label: 'Proces' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#kontakt', label: 'Kontakt' },
]

function Brand() {
  return (
    <a href="#hero" className="flex items-center shrink-0">
      <img
        src={logo}
        alt="Słodki Zakątek — Agnieszka Włodarczyk"
        className="h-10 md:h-12 w-auto object-contain"
        draggable={false}
      />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 isolate"
        style={{
          zIndex: 100,
          background: scrolled ? 'rgba(255,249,245,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(66,26,39,0.08)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <div
          className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between"
          style={{
            paddingTop: scrolled ? '0.75rem' : '1.1rem',
            paddingBottom: scrolled ? '0.75rem' : '1.1rem',
            transition: 'padding 0.4s ease',
          }}
        >
          <Brand />

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors border-b border-transparent hover:text-rose-600 hover:border-rose-300 pb-0.5"
                  style={{ color: scrolled ? '#9d174d' : 'var(--color-plum)' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://www.facebook.com/profile.php?id=100063707095880"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: scrolled ? '#be185d' : 'var(--color-plum)' }}
              className="transition-colors hover:opacity-70"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase border-b pb-0.5 transition-colors"
              style={{
                color: scrolled ? '#be185d' : 'var(--color-plum)',
                borderColor: scrolled ? 'rgba(190,24,101,0.4)' : 'rgba(66,26,39,0.4)',
              }}
            >
              Zamów tort <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Otwórz menu"
            className="md:hidden flex flex-col items-end gap-[5px] p-2"
          >
            <span style={{ width: 22, height: 1.5, background: 'var(--color-plum)' }} />
            <span style={{ width: 15, height: 1.5, background: 'var(--color-plum)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className="md:hidden fixed inset-0 flex flex-col"
        style={{
          zIndex: 110,
          background: 'var(--color-cream)',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div className="flex items-center justify-between px-6 pt-[1.1rem] pb-4">
          <Brand />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Zamknij menu"
            className="p-2 text-2xl leading-none"
            style={{ color: 'var(--color-plum)' }}
          >
            ×
          </button>
        </div>

        <ul className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-playfair text-4xl text-[var(--color-plum)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-8 pb-12">
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1"
          >
            Zamów tort →
          </a>
        </div>
      </div>
    </>
  )
}
