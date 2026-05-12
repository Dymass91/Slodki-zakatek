import { useState, useEffect, useRef, useCallback } from 'react'

const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
const allImages = Object.values(globbed).map(m => m.default)

const PER_PAGE = 3

function getPageImages(pageIdx, totalPages) {
  const safePage = ((pageIdx % totalPages) + totalPages) % totalPages
  const start = safePage * PER_PAGE
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
    const toX = dir === 'right' ? '-200%' : '0%'

    track.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
    track.style.transform = `translateX(${toX})`

    setTimeout(() => {
      setPage(p => dir === 'right'
        ? (p + 1) % totalPages
        : (p - 1 + totalPages) % totalPages
      )
      track.style.transition = 'none'
      track.style.transform = 'translateX(-100%)'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        locked.current = false
      }))
    }, 560)
  }, [totalPages])

  useEffect(() => {
    if (allImages.length < 4 || paused) return
    const id = setInterval(() => navigate('right'), 4000)
    return () => clearInterval(id)
  }, [navigate, paused])

  if (allImages.length === 0) {
    return (
      <section id="realizacje" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Galeria</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-10">Nasze realizacje</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-pink-50 border-2 border-dashed border-pink-200 flex items-center justify-center">
                <span className="text-4xl select-none">🎂</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const prevImages = getPageImages(page - 1, totalPages)
  const currImages = getPageImages(page,     totalPages)
  const nextImages = getPageImages(page + 1, totalPages)

  const progress = ((page + 1) / totalPages) * 100

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

        {/* Slider track */}
        <div className="relative px-8">
          <div style={{ overflow: 'hidden', borderRadius: '1.5rem' }}>
            {/* Track: 3 pages wide, starts at -100% to show middle */}
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                width: '300%',
                transform: 'translateX(-100%)',
                willChange: 'transform',
              }}
            >
              {[prevImages, currImages, nextImages].map((imgs, pagePos) => (
                <div
                  key={pagePos}
                  style={{ width: '33.3333%', flexShrink: 0, padding: '0 0.75rem', boxSizing: 'border-box' }}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {imgs.map((src, i) => (
                      <div key={i} className="rounded-3xl overflow-hidden shadow-md aspect-square">
                        <img
                          src={src}
                          alt={`Realizacja`}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => navigate('left')}
            aria-label="Poprzednie"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
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

        {/* Progress bar + counter */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm text-rose-500 font-semibold whitespace-nowrap">
              {page + 1} / {totalPages}
            </span>
            <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
