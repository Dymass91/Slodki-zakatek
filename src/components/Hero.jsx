export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #be185d 0%, #e11d48 30%, #fb7185 60%, #fda4af 100%)',
        }}
      />
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />

      {/* Floating cake SVG decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center opacity-20 pointer-events-none select-none">
        <svg viewBox="0 0 300 320" className="w-72 h-80 text-white" fill="currentColor">
          <ellipse cx="150" cy="290" rx="110" ry="18" opacity=".4"/>
          <rect x="60" y="210" width="180" height="70" rx="12"/>
          <rect x="75" y="145" width="150" height="70" rx="12"/>
          <rect x="95" y="90" width="110" height="60" rx="12"/>
          <ellipse cx="150" cy="90" rx="55" ry="14"/>
          <ellipse cx="150" cy="145" rx="75" ry="14"/>
          <ellipse cx="150" cy="210" rx="90" ry="15"/>
          <circle cx="150" cy="72" r="12"/>
          <circle cx="130" cy="60" r="5"/>
          <circle cx="170" cy="60" r="5"/>
        </svg>
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
