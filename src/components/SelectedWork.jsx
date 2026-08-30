import { useCallback, useEffect, useRef, useState } from 'react'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'
import useReveal from '../hooks/useReveal'
import galleryDimensions from '../assets/gallery-dimensions.json'

// Full portfolio archive — every real realization photo in the project, not a curated set.
// `eager: true` only registers the resolved URL string for each asset (no network / no
// decode happens here); the actual image fetch is gated per-thumbnail below by
// conditional rendering (only `visibleCount` items mount) plus loading="lazy".
const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
// Preserve the existing glob ordering; attach each photo's real intrinsic size so the
// browser can reserve correct space before the image loads (no masonry reflow / CLS).
const photos = Object.entries(globbed).map(([path, mod]) => {
  const name = path.slice(path.lastIndexOf('/') + 1)
  const dims = galleryDimensions[name]
  return { src: mod.default, w: dims ? dims[0] : 4, h: dims ? dims[1] : 3 }
})

const PAGE_SIZE = 12

function GalleryItem({ photo, index, onOpen }) {
  const [ref, visible] = useReveal({ threshold: 0.05 })
  return (
    <button
      ref={ref}
      onClick={(e) => onOpen(index, e.currentTarget)}
      className={`group relative block w-full mb-3 md:mb-5 overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ breakInside: 'avoid', transitionDuration: '0.6s' }}
      aria-label={`Powiększ realizację ${index + 1}`}
    >
      <img
        src={photo.src}
        alt={`Realizacja Słodki Zakątek ${index + 1}`}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <span
        className="absolute inset-0 hidden md:flex items-center justify-center text-cream text-xs font-semibold tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'rgba(45,15,26,0.22)' }}
      >
        Zobacz ↗
      </span>
    </button>
  )
}

function Lightbox({ index, setIndex, total, restoreFocusRef }) {
  const containerRef = useRef(null)
  const close = useCallback(() => setIndex(null), [setIndex])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [setIndex, total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [setIndex, total])

  // Lock background scroll, saving/restoring the exact previous value.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Move focus into the dialog on open; restore it to the opening thumbnail on close.
  useEffect(() => {
    const opener = restoreFocusRef?.current
    containerRef.current?.querySelector('button')?.focus()
    return () => {
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [restoreFocusRef])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowLeft') { prev(); return }
      if (e.key === 'ArrowRight') { next(); return }
      if (e.key === 'Tab') {
        const f = containerRef.current?.querySelectorAll('button')
        if (!f || !f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (!containerRef.current.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, prev, next])

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Realizacja ${index + 1} z ${total}`}
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      style={{ background: 'rgba(45,15,26,0.94)' }}
      onClick={close}
    >
      <button
        onClick={close}
        aria-label="Zamknij"
        className="absolute top-5 right-5 md:top-8 md:right-8 text-3xl text-cream/80 hover:text-cream transition-colors"
      >
        ×
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Poprzednie zdjęcie"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-3xl text-cream/70 hover:text-cream transition-colors p-3"
      >
        ‹
      </button>
      <img
        src={photos[index].src}
        alt={`Realizacja Słodki Zakątek ${index + 1}`}
        className="max-h-[86vh] max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Następne zdjęcie"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-3xl text-cream/70 hover:text-cream transition-colors p-3"
      >
        ›
      </button>
    </div>
  )
}

export default function SelectedWork() {
  const [openIndex, setOpenIndex] = useState(null)
  const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, photos.length))
  const galleryRef = useRef(null)
  const openerRef = useRef(null)

  const handleOpen = (i, el) => {
    openerRef.current = el
    setOpenIndex(i)
  }

  const allShown = visibleCount >= photos.length

  const handleToggle = () => {
    if (allShown) {
      setVisibleCount(Math.min(PAGE_SIZE, photos.length))
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, photos.length))
    }
  }

  return (
    <section id="realizacje" className="relative bg-[var(--color-cream)] py-20 md:py-28">
      <div
        className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center"
        style={{ minHeight: 'clamp(280px, 42vh, 480px)' }}
      >
        <RevealText as="div">
          <SectionLabel>Realizacje / Archiwum</SectionLabel>
        </RevealText>
        <RevealText as="h2" delay={80} className="mt-4">
          <span
            className="block font-playfair text-[var(--color-plum)]"
            style={{ fontSize: 'clamp(38px, 5.2vw, 76px)', lineHeight: 1 }}
          >
            Każda okazja,<br />inna historia.
          </span>
        </RevealText>
      </div>

      {/* Editorial masonry archive — natural aspect ratios via CSS columns, no cards/borders/shadows */}
      <div ref={galleryRef} className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 md:mt-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-5">
          {photos.slice(0, visibleCount).map((photo, i) => (
            <GalleryItem key={photo.src} photo={photo} index={i} onOpen={handleOpen} />
          ))}
        </div>

        {photos.length > PAGE_SIZE && (
          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-rose-600 border-b border-rose-300 pb-1 hover:border-rose-500 hover:text-rose-700 transition-colors"
            >
              {allShown ? 'Zwiń galerię' : 'Zobacz więcej realizacji'}
              <span aria-hidden>{allShown ? '↑' : '↓'}</span>
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          index={openIndex}
          setIndex={setOpenIndex}
          total={photos.length}
          restoreFocusRef={openerRef}
        />
      )}
    </section>
  )
}
