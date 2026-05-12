import { useState, useEffect, useCallback, useRef } from 'react'

const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
const images = Object.values(globbed).map(m => m.default)

const PER_PAGE = 3

export default function Realizacje() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState('right')
  const [animKey, setAnimKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = images.length

  const navigate = useCallback((dir) => {
    setDirection(dir)
    setAnimKey(k => k + 1)
    setCurrent(c => dir === 'right'
      ? (c + 1) % total
      : (c - 1 + total) % total
    )
  }, [total])

  useEffect(() => {
    if (total < 2 || paused) return
    const id = setInterval(() => navigate('right'), 3500)
    return () => clearInterval(id)
  }, [navigate, total, paused])

  if (total === 0) {
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

  const visible = Math.min(PER_PAGE, total)
  const visibleIndices = Array.from({ length: visible }, (_, i) => (current + i) % total)
  const animClass = direction === 'right' ? 'slide-from-right' : 'slide-from-left'
  const progress = ((current + 1) / total) * 100

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

        {/* Slider */}
        <div className="relative px-8">
          <div
            key={animKey}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${animClass}`}
          >
            {visibleIndices.map((idx, pos) => (
              <div
                key={`${idx}-${pos}`}
                className="rounded-3xl overflow-hidden shadow-md aspect-square"
                style={{ animationDelay: `${pos * 60}ms` }}
              >
                <img
                  src={images[idx]}
                  alt={`Realizacja ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => navigate('left')}
            aria-label="Poprzednie"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => navigate('right')}
            aria-label="Następne"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
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
              {current + 1} / {total}
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
