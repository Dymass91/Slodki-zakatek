import heroCake from '../assets/headerimgslodkizakatek.png'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #881337 0%, #be185d 40%, #e11d48 100%)' }}
    >
      {/* Decorative soft circle behind image */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-0 items-center min-h-screen">

        {/* Left — text */}
        <div className="text-white py-32 md:py-0 pr-0 md:pr-10">
          <p className="text-pink-200 tracking-widest uppercase text-sm mb-5">
            Ręcznie robione z miłością
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl leading-tight mb-6">
            Torty, które<br />
            <em className="text-yellow-200">zachwycają</em><br />
            smakiem i wyglądem
          </h1>
          <p className="text-pink-100 text-lg mb-10 max-w-md leading-relaxed">
            Każdy tort to unikalne dzieło — tworzony z pasji, najlepszych składników
            i dbałości o każdy detal. Skórka i okolice, od ponad 5 lat.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#cennik"
              className="bg-white text-rose-600 font-semibold px-8 py-3 rounded-full hover:bg-rose-50 transition-colors shadow-md"
            >
              Zobacz cennik
            </a>
            <a
              href="#o-nas"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-rose-700 transition-colors"
            >
              Nasza historia
            </a>
          </div>
        </div>

        {/* Right — image, full quality, no crop */}
        <div className="hidden md:flex items-center justify-center h-full py-24">
          <img
            src={heroCake}
            alt="Słodki Zakątek"
            className="w-full max-w-lg object-contain drop-shadow-2xl"
            style={{ borderRadius: '2rem' }}
          />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
