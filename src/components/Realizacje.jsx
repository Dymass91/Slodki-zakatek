import { useState, useEffect, useCallback } from 'react'

// Auto-discovers all tort0.jpg … tort99.jpg from assets
const globbed = import.meta.glob('../assets/tort*.jpg', { eager: true })
const images = Object.values(globbed).map(m => m.default)

const VISIBLE = 3   // cards visible at once on desktop

export default function Realizacje() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = images.length

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  useEffect(() => {
    if (total < 2 || paused) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next, total, paused])

  // Placeholder shown when no images added yet
  if (total === 0) {
    return (
      <section id="realizacje" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Galeria
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-6">
            Nasze realizacje
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-pink-50 border-2 border-dashed border-pink-200 flex items-center justify-center"
              >
                <span className="text-4xl select-none">🎂</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Zdjęcia pojawią się automatycznie — nazwij je <span className="font-mono bg-gray-100 px-1 rounded">tort0.jpg</span>, <span className="font-mono bg-gray-100 px-1 rounded">tort1.jpg</span> … i wrzuć do <span className="font-mono bg-gray-100 px-1 rounded">src/assets/</span>
          </p>
        </div>
      </section>
    )
  }

  // Indices of visible cards (wrapping)
  const visibleCount = Math.min(VISIBLE, total)
  const visibleIndices = Array.from({ length: visibleCount }, (_, i) => (current + i) % total)

  return (
    <section
      id="realizacje"
      className="py-24 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Galeria
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800">
            Nasze realizacje
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Każdy tort to inna historia — zajrzyj do naszej galerii i zainspiruj się.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {visibleIndices.map((idx, pos) => (
              <div
                key={`${idx}-${pos}`}
                className="rounded-3xl overflow-hidden shadow-md aspect-square cursor-pointer"
                style={{ transition: 'opacity 0.4s ease' }}
                onClick={() => setCurrent(idx)}
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
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Poprzednie"
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Następne"
                className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-pink-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Zdjęcie ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current ? '#e11d48' : '#fda4af',
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
