import cake from '../assets/Untitled design (22).png'
import CakeCutout from './primitives/CakeCutout'
import RevealText from './primitives/RevealText'

export default function BrandStatement() {
  return (
    <section className="relative bg-[var(--color-brand-pink)] py-32 md:py-48 overflow-hidden flex items-center justify-center text-center">
      <CakeCutout
        src={cake}
        alt="Nasycony różowy tort z kwiatami i makaronikami"
        className="absolute -bottom-10 md:-bottom-16 right-[4%] md:right-[8%] w-[220px] md:w-[320px] opacity-90 hidden sm:block"
        style={{ filter: 'drop-shadow(0 30px 40px rgba(66,26,39,0.3))' }}
      />
      <RevealText as="h2" scale className="max-w-3xl px-6">
        <span
          className="block font-playfair text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}
        >
          Każdy tort<br />powstaje tylko raz.
        </span>
      </RevealText>
    </section>
  )
}
