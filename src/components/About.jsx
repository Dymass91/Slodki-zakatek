import RevealText from './primitives/RevealText'
import SectionLabel from './primitives/SectionLabel'

export default function About() {
  return (
    <section id="o-nas" className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 items-start">

        {/* Oversized monogram standing in for a portrait — an editorial mark, not a stock photo */}
        <div className="md:col-span-4 flex md:justify-start justify-center">
          <RevealText scale>
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 'clamp(220px, 22vw, 320px)',
                height: 'clamp(220px, 22vw, 320px)',
                background: 'linear-gradient(150deg, var(--color-blush-deep) 0%, #f2b8ca 100%)',
              }}
            >
              <span
                className="font-playfair italic"
                style={{ fontSize: 'clamp(96px, 10vw, 150px)', color: 'var(--color-cream)' }}
              >
                A
              </span>
            </div>
          </RevealText>
        </div>

        <div className="md:col-span-8">
          <RevealText as="div">
            <SectionLabel>Poznajmy się</SectionLabel>
          </RevealText>

          <RevealText as="h2" delay={80} className="mt-5">
            <span
              className="block font-playfair text-[var(--color-plum)]"
              style={{ fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 0.98 }}
            >
              Cześć,<br />jestem Agnieszka.
            </span>
          </RevealText>

          <RevealText as="p" delay={160} className="mt-10 md:ml-[6%] max-w-xl">
            <span
              className="block font-playfair italic text-rose-500"
              style={{ fontSize: 'clamp(30px, 3.4vw, 46px)', lineHeight: 1.15 }}
            >
              Ręcznie. Spokojnie.<br />Z dbałością o detal.
            </span>
          </RevealText>

          <RevealText as="div" delay={240} className="mt-10 md:ml-[6%] max-w-md space-y-4">
            <p className="text-[var(--color-plum)]/75 leading-relaxed">
              Wszystko zaczęło się ponad 5 lat temu w małej miejscowości Skórka —
              z pasji do cukiernictwa i marzenia o własnej pracowni.
            </p>
            <p className="text-[var(--color-plum)]/75 leading-relaxed">
              Dziś Słodki Zakątek to kameralna pracownia, w której każdy tort
              powstaje ręcznie, od pierwszego szkicu po ostatni kwiat z lukru —
              dla Skórki, Piły, Złotowa i okolic.
            </p>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
