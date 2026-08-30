import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'sz_closed_popup_dismissed'

export default function ClosedPopup() {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)
  const cardRef = useRef(null)
  const prevFocusRef = useRef(null)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {}
    if (dismissed) return
    setVisible(true)
    setTimeout(() => setAnimated(true), 10)
  }, [])

  const close = () => {
    setAnimated(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    setTimeout(() => setVisible(false), 300)
  }

  // Lock background scrolling while open, saving/restoring the exact previous value.
  useEffect(() => {
    if (!visible) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [visible])

  // Focus management: move focus into the dialog, trap Tab inside it, and restore
  // focus to whatever was focused before the popup opened.
  useEffect(() => {
    if (!visible) return
    prevFocusRef.current = document.activeElement

    const focusables = () =>
      cardRef.current
        ? Array.from(cardRef.current.querySelectorAll('a[href], button'))
        : []

    const first = focusables()[0]
    if (first) first.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'Tab') {
        const els = focusables()
        if (!els.length) return
        const firstEl = els[0]
        const lastEl = els[els.length - 1]
        if (!cardRef.current.contains(document.activeElement)) {
          e.preventDefault()
          firstEl.focus()
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      const prev = prevFocusRef.current
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(45,15,26,0.55)',
        opacity: animated ? 1 : 0,
        transition: 'opacity 0.35s ease',
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
      onClick={close}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="closed-popup-title"
        className="relative overflow-hidden"
        style={{
          width: 'min(92vw, 640px)',
          maxHeight: 'calc(100dvh - 2rem)',
          background: 'var(--color-cream)',
          border: '1px solid rgba(66,26,39,0.1)',
          borderRadius: '1.25rem',
          boxShadow: '0 30px 70px rgba(45,15,26,0.25)',
          transform: animated ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(16px)',
          opacity: animated ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="px-7 py-9 md:px-10 md:py-12"
          style={{ maxHeight: 'calc(100dvh - 2rem)', overflowY: 'auto', overscrollBehavior: 'contain' }}
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rose-500/80">
            Ważna informacja
          </p>

          <h2
            id="closed-popup-title"
            className="font-playfair text-[var(--color-plum)] mt-4"
            style={{ fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.08 }}
          >
            Pracownia jest<br />obecnie nieczynna.
          </h2>

          <p className="mt-5 text-[var(--color-plum)]/75 leading-relaxed">
            Agnieszka przechodzi intensywną rehabilitację, dlatego realizacja zamówień
            jest obecnie wstrzymana.
          </p>

          <p className="mt-4 text-[var(--color-plum)]/75 leading-relaxed">
            Jeśli chcesz wesprzeć Agnieszkę w drodze do odzyskania sprawności,
            trwa zbiórka na jej leczenie i rehabilitację.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4">
            <a
              href="https://pomagam.pl/rehabilitacjaagi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.15em] uppercase px-7 py-3.5 rounded-full transition-colors"
              style={{ background: 'var(--color-brand-pink)', color: 'var(--color-cream)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d43f6b' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-pink)' }}
            >
              Wesprzyj Agnieszkę
              <span aria-hidden>→</span>
            </a>

            <a
              href="https://pomagam.pl/rehabilitacjaagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-plum)]/50 hover:text-rose-500 transition-colors"
            >
              Dowiedz się więcej na Pomagam.pl ↗
            </a>

            <button
              onClick={close}
              className="text-sm text-[var(--color-plum)]/60 hover:text-[var(--color-plum)] transition-colors mt-1"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
