import { useEffect, useRef } from 'react'

// ONE SOURCE OF TRUTH for the top-of-page scroll architecture.
//
// The story sequence is a deterministic state machine over six sections:
//
//   0 HERO  →  1 MANIFESTO  →  2 WEDDING/01  →  3 CUSTOM/02  →  4 CUSTOM/03  →  5 ABOUT
//
// One deliberate wheel/trackpad/touch gesture = exactly one step (±1). Desktop and
// mobile run the identical logic; only the input detection differs (wheel vs touch).
// The layered "page-turn" effect between WEDDING → CUSTOM/02 → CUSTOM/03 is purely the
// sticky panels in CakeStory being scrolled through — it is driven by these same
// discrete jumps, never by free scrolling.
//
// From ABOUT downward it is completely native browser scroll: no interception, no
// snapping, no pinning. The only reverse hook near ABOUT is a tiny margin at its very
// top so an immediate upward gesture returns to CUSTOM/03; once the user has scrolled
// past that margin, both directions are fully native.

const WHEEL_THRESHOLD = 6
const TOUCH_THRESHOLD = 42
const COOLDOWN_MS = 650
// px below ABOUT's top within which an upward gesture still reverses into CUSTOM/03
const ABOUT_REVERSE_MARGIN = 8

// True document offset of an element, unaffected by position:sticky pinning
// (offsetTop always reports layout position, never the stuck viewport position).
function docTop(el) {
  let y = 0
  while (el) {
    y += el.offsetTop
    el = el.offsetParent
  }
  return y
}

// MANIFESTO has two responsive root nodes (desktop / mobile); pick the rendered one.
function manifestoEl() {
  const d = document.getElementById('scene-manifesto')
  if (d && d.offsetParent !== null) return d
  const m = document.getElementById('scene-manifesto-m')
  if (m && m.offsetParent !== null) return m
  return d || m
}

function sectionTops() {
  const els = [
    document.getElementById('hero'),
    manifestoEl(),
    document.getElementById('scene-wedding'),
    document.getElementById('scene-custom02'),
    document.getElementById('scene-custom03'),
    document.getElementById('o-nas'),
  ]
  if (els.some((e) => !e)) return null
  const tops = els.map(docTop)
  tops[0] = 0
  return tops
}

// The page sets a global `scroll-behavior: smooth`. window.scrollTo()'s default
// behavior defers to that CSS, so every per-frame scrollTo() in the rAF loop below
// was ALSO being smooth-animated by the browser on top of our own easing — two
// animations fighting, resolving anywhere. Force instant scroll-behavior for the
// duration of a controlled jump, hard-snap to the exact target, then restore.
function withInstantScrollBehavior(run) {
  const html = document.documentElement
  const body = document.body
  const prevHtml = html.style.scrollBehavior
  const prevBody = body.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  body.style.scrollBehavior = 'auto'
  run(() => {
    html.style.scrollBehavior = prevHtml
    body.style.scrollBehavior = prevBody
  })
}

function smoothScrollTo(targetY, instant, onDone) {
  withInstantScrollBehavior((restore) => {
    const finish = () => {
      // Hard-correct to the exact destination regardless of rounding/interruption,
      // so a controlled jump can never resolve to an arbitrary in-between position.
      window.scrollTo(0, targetY)
      restore()
      onDone()
    }

    const startY = window.scrollY
    const distance = targetY - startY
    if (instant || Math.abs(distance) < 1) {
      finish()
      return
    }

    const duration = 620
    const start = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3)

    function stepFrame(now) {
      const t = Math.min(1, (now - start) / duration)
      if (t < 1) {
        window.scrollTo(0, startY + distance * ease(t))
        requestAnimationFrame(stepFrame)
      } else {
        finish()
      }
    }
    requestAnimationFrame(stepFrame)
  })
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

    // Returns the exact Y to jump to for one gesture in `dir` (1 = down, -1 = up),
    // or null when the current position must be left to native scrolling.
    const resolveJump = (dir) => {
      const tops = sectionTops()
      if (!tops) return null
      const last = tops.length - 1 // ABOUT
      const y = window.scrollY

      // Past ABOUT's top (beyond the tiny reverse margin): fully native, both ways.
      if (y > tops[last] + ABOUT_REVERSE_MARGIN) return null

      // Current section index = last boundary we've reached.
      let idx = 0
      for (let i = 0; i < tops.length; i++) {
        if (y >= tops[i] - 2) idx = i
      }

      if (dir > 0) {
        if (idx >= last) return null // at ABOUT, going down → native
        return tops[idx + 1]
      }
      if (idx <= 0) return null // at HERO, nothing above
      return tops[idx - 1]
    }

    const runJump = (targetY) => {
      lockedRef.current = true
      smoothScrollTo(targetY, reduceMotionRef.current, () => {
        setTimeout(() => { lockedRef.current = false }, COOLDOWN_MS)
      })
    }

    const onWheel = (e) => {
      if (isEditable()) return
      // During a controlled transition, swallow the rest of the physical gesture so
      // the browser's native scroll can't run in parallel and stop the jump short.
      if (lockedRef.current) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      const target = resolveJump(e.deltaY > 0 ? 1 : -1)
      if (target != null) {
        e.preventDefault()
        runJump(target)
      }
    }

    const onKeyDown = (e) => {
      if (lockedRef.current || isEditable()) return
      const down = e.key === 'PageDown' || e.key === 'ArrowDown'
      const up = e.key === 'PageUp' || e.key === 'ArrowUp'
      if (!down && !up) return
      const target = resolveJump(down ? 1 : -1)
      if (target != null) {
        e.preventDefault()
        runJump(target)
      }
    }

    const onTouchStart = (e) => {
      if (lockedRef.current) return
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    // Block native touch scrolling while a controlled jump runs (mobile momentum
    // would otherwise fight the animated scrollTo and land between sections).
    const onTouchMove = (e) => {
      if (lockedRef.current && e.cancelable) e.preventDefault()
    }

    const onTouchEnd = (e) => {
      if (lockedRef.current || touchStartYRef.current == null) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current
      const delta = touchStartYRef.current - endY
      touchStartYRef.current = null
      if (Math.abs(delta) < TOUCH_THRESHOLD) return
      const target = resolveJump(delta > 0 ? 1 : -1)
      if (target != null) runJump(target)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
