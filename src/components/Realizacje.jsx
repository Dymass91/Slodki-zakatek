import { useState, useEffect, useRef, useCallback } from 'react'

const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
const allImages = Object.values(globbed).map(m => m.default)

const PER_PAGE = 3

function getPageImages(pageIdx, totalPages) {
  const safe = ((pageIdx % totalPages) + totalPages) % totalPages
  const start = safe * PER_PAGE
  return Array.from({ length: PER_PAGE }, (_, i) => allImages[(start + i) % allImages.length])
}

export default function Realizacje() {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const locked = useRef(false)

  const totalPages = Math.ceil(allImages.length / PER_PAGE)

  const navigate = useCallback((dir) => {
    if (locked.current || !trackRef.current) return
    locked.current = true

    const track = trackRef.current
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    track.style.transform = dir === 'right' ? 'translateX(-200%)' : 'translateX(0%)'

    setTimeout(() => {
      setPage(p => dir === 'right'
        ? (p + 1) % totalPages
        : (p - 1 + totalPages) % totalPages
      )
      track.style.transition = 'none'
      track.style.transform = 'translateX(-100%)'
      requestAnimationFrame(() => requestAnimationFrame(() => { locked.current = false }))
    }, 510)
  }, [totalPages])

  useEffect(() => {
    if (allImages.length < 4 || paused) return
    const id = setInterval(() => navigate('right'), 4000)
    return () => clearInterval(id)
  }, [navigate, paused])

  if (allImages.length === 0) return null

  const prevImages = getPageImages(page - 1, totalPages)
  const currImages = getPageImages(page,     totalPages)
  const nextImages = getPageImages(page + 1, totalPages)

  return (
    <section
      id="realizacje"
      className="py-24 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Galeria</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800">Nasze realizacje</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Każdy tort to inna historia — zajrzyj do naszej galerii i zainspiruj się.
          </p>
        </div>

        <div className="relative px-8">
          {/* Viewport */}
          <div style={{ overflow: 'hidden' }}>
            {/* Track — 3 pages side by side, starts showing middle (−100%) */}
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                transform: 'translateX(-100%)',
                willChange: 'transform',
              }}
            >
              {[prevImages, currImages, nextImages].map((imgs, slot) => (
                <div key={slot} style={{ minWidth: '100%', padding: '4px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                  }}>
                    {imgs.map((src, i) => (
                      <div key={i} style={{
                        aspectRatio: '1 / 1',
                        borderRadius: '1.5rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                      }}>
                        <img
                          src={src}
                          alt="Realizacja"
                          draggable={false}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={() => navigate('left')}
            aria-label="Poprzednie"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => navigate('right')}
            aria-label="Następne"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="mt-8 max-w-md mx-auto flex items-center gap-4">
          <span className="text-sm text-rose-500 font-semibold whitespace-nowrap">
            {page + 1} / {totalPages}
          </span>
          <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-400 rounded-full transition-all duration-500"
              style={{ width: `${((page + 1) / totalPages) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
