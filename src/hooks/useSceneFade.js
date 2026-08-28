import { useEffect, useRef, useState } from 'react'

// Drives the "leaving section gently disappears" cinematic transition between the
// stacked editorial scenes (Hero → Manifesto → Wedding → Custom/02 → Custom/03).
//
// Desktop: scenes are position:sticky and get physically covered by the next scene,
// so "leaving" progress is measured from how far the NEXT scene (by DOM id) has
// scrolled into place — 0 = next scene not yet visible, 1 = next scene fully covering.
//
// Mobile: scenes scroll normally (no sticky), so progress is measured from this
// scene's own element scrolling up past the top of the viewport.
//
// Returns [ref, style] — attach ref to the scene's own root element (used for the
// mobile measurement only) and style to whichever element(s) should animate; the
// hook decides per-frame which formula applies based on current viewport width, so
// the same output is safe to apply to both a desktop and a mobile block.
export default function useSceneFade(nextId) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = null

    const compute = () => {
      raf = null
      const vh = window.innerHeight
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      let progress = 0

      if (isDesktop && nextId) {
        const nextEl = document.getElementById(nextId)
        if (nextEl) {
          const r = nextEl.getBoundingClientRect()
          progress = Math.max(0, Math.min(1, 1 - r.top / vh))
        }
        setStyle({
          opacity: 1 - progress * 0.88,
          transform: `translateY(${-progress * 34}px) scale(${1 - progress * 0.02})`,
        })
      } else if (!isDesktop && ref.current) {
        const r = ref.current.getBoundingClientRect()
        progress = Math.max(0, Math.min(1, -r.top / vh))
        setStyle({
          opacity: 1 - progress * 0.7,
          transform: `translateY(${-progress * 15}px)`,
        })
      }
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [nextId])

  return [ref, style]
}
