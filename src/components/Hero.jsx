import heroCake from '../assets/tort pietrowy.jpg'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={heroCake}
          alt="Tort weselny"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/75 via-rose-800/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center pt-20">
        <div className="text-white">
          <p className="text-pink-200 font-lato tracking-widest uppercase text-sm mb-4">
            Ręcznie robione z miłością
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl leading-tight mb-6">
            Torty, które<br />
            <em className="text-yellow-200">zachwycają</em><br />
            smakiem i wyglądem
          </h1>
          <p className="text-pink-100 text-lg mb-8 max-w-md">
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
