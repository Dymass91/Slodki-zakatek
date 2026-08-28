import { useCallback, useEffect, useRef, useState } from 'react'
import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'
import useReveal from '../hooks/useReveal'

// Full portfolio archive — every real realization photo in the project, not a curated set.
const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
const photos = Object.values(globbed).map((m) => m.default)

const PAGE_SIZE = 12

function GalleryItem({ src, onClick }) {
  const [ref, visible] = useReveal({ threshold: 0.05 })
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group relative block w-full mb-3 md:mb-5 overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ breakInside: 'avoid', transitionDuration: '0.6s' }}
      aria-label="Powiększ realizację"
    >
      <img
        src={src}
        alt="Realizacja Słodki Zakątek"
        loading="lazy"
        draggable={false}
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

function Lightbox({ index, setIndex, total }) {
  const close = useCallback(() => setIndex(null), [setIndex])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [setIndex, total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [setIndex, total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [close, prev, next])

  return (
    <div
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
        src={photos[index]}
        alt="Realizacja Słodki Zakątek"
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
          {photos.slice(0, visibleCount).map((src, i) => (
            <GalleryItem key={src} src={src} onClick={() => setOpenIndex(i)} />
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
        <Lightbox index={openIndex} setIndex={setOpenIndex} total={photos.length} />
      )}
    </section>
  )
}
