import { useEffect, useRef } from 'react'

// Drives the "one gesture = one section" jumps for Hero → Manifesto and
// Manifesto → Wedding, and the single jump from the end of the stacked story
// (Custom / 03) into About. Everything in between (Wedding → Custom/02 →
// Custom/03) and everything from About onward is left as completely native
// scrolling — this controller simply stays out of the way there.
const WHEEL_THRESHOLD = 6
const TOUCH_THRESHOLD = 42
const COOLDOWN_MS = 700

function getTop(id) {
  const el = document.getElementById(id)
  return el ? el.getBoundingClientRect().top + window.scrollY : null
}

function smoothScrollTo(targetY, instant, onDone) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (instant || Math.abs(distance) < 1) {
    window.scrollTo(0, targetY)
    onDone()
    return
  }
  const duration = 650
  const start = performance.now()
  const ease = (t) => 1 - Math.pow(1 - t, 3)

  function step(now) {
    const elapsed = now - start
    const t = Math.min(1, elapsed / duration)
    window.scrollTo(0, startY + distance * ease(t))
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      onDone()
    }
  }
  requestAnimationFrame(step)
}

export default function ScrollFlowController() {
  const lockedRef = useRef(false)
  const touchStartYRef = useRef(null)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isEditable = () => {
      const tag = document.activeElement && document.activeElement.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable
    }

    // Boundaries are computed arithmetically from the (non-sticky) shared stack
    // wrapper's document position + a uniform panel height, rather than reading
    // getBoundingClientRect() on the sticky panels themselves — once a sticky panel
    // is actually stuck, its rect reflects its pinned viewport position (top: 0),
    // not its true document offset, which would make the zone math unreliable.
    const resolveJump = (goingDown) => {
      const stackTop = getTop('story-stack')
      const aboutTop = getTop('o-nas')
      if (stackTop == null || aboutTop == null) return null

      const panelHeight = Math.max(window.innerHeight, 560)
      const manifestoTop = stackTop
      const weddingTop = stackTop + panelHeight * 1.5
      const custom03Top = stackTop + panelHeight * 3
      const y = window.scrollY

      // Hero zone: before Manifesto
      if (y < manifestoTop - 1) {
        return goingDown ? manifestoTop : null
      }
      // Manifesto zone: before Wedding
      if (y < weddingTop - 1) {
        return goingDown ? weddingTop : 0
      }
      // Custom/03 exit zone: last stacked panel, fully covering — forward jump only
      if (y >= custom03Top - 1 && y < aboutTop - 1) {
        return goingDown ? aboutTop : null
      }
      // Wedding → Custom/02 → (start of) Custom/03, and About+ : native scroll
      return null
    }

    const runJump = (targetY) => {
      lockedRef.current = true
      smoothScrollTo(targetY, reduceMotionRef.current, () => {
        setTimeout(() => { lockedRef.current = false }, COOLDOWN_MS)
      })
    }

    const onWheel = (e) => {
      if (isEditable()) return
      // While an animated jump (or its cooldown) is running, swallow the rest of the
      // same physical gesture — otherwise the browser's own native scroll keeps
      // moving in parallel and fights the animated scrollTo, making it stop short.
      if (lockedRef.current) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      const target = resolveJump(e.deltaY > 0)
      if (target != null) {
        e.preventDefault()
        runJump(target)
      }
    }

    const onKeyDown = (e) => {
      if (lockedRef.current || isEditable()) return
      if (e.key !== 'PageDown' && e.key !== 'ArrowDown') return
      const target = resolveJump(true)
      if (target != null) {
        e.preventDefault()
        runJump(target)
      }
    }

    const onTouchStart = (e) => {
      if (lockedRef.current) return
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    const onTouchEnd = (e) => {
      if (lockedRef.current || touchStartYRef.current == null) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current
      const delta = touchStartYRef.current - endY
      touchStartYRef.current = null
      if (Math.abs(delta) < TOUCH_THRESHOLD) return
      const target = resolveJump(delta > 0)
      if (target != null) {
        runJump(target)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
