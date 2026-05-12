import logoImg from '../assets/slodkizakateklogo.jpg'

const stats = [
  { value: '5+', label: 'lat doświadczenia' },
  { value: '500+', label: 'zadowolonych klientów' },
  { value: '1000+', label: 'wykonanych tortów' },
]

export default function About() {
  return (
    <section id="o-nas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Decorative image area */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-pink-100 -z-10" />
          <div
            className="w-full rounded-3xl shadow-xl aspect-[4/5] flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #fce7f3 0%, #fda4af 50%, #fb7185 100%)' }}
          >
            <img
              src={logoImg}
              alt="Słodki Zakątek – Agnieszka Włodarczyk"
              className="w-4/5 object-contain drop-shadow-2xl"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-rose-500 text-white rounded-2xl p-5 shadow-lg text-center">
            <p className="font-playfair text-3xl font-bold">5</p>
            <p className="text-xs font-semibold tracking-wide uppercase">lat pasji</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Nasza historia
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-6 leading-tight">
            Słodki Zakątek –<br />
            <em className="text-rose-500">z miłości do tortów</em>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Wszystko zaczęło się ponad 5 lat temu w małej miejscowości Skórka.
            Agnieszka Włodarczyk, z pasją do cukiernictwa i marzeniem o własnej
            działalności, postawiła pierwsze kroki w świecie tortów artystycznych.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            To, co zaczęło się jako hobby w domowej kuchni, szybko przerodziło się
            w prawdziwą cukiernię z gronem stałych, zadowolonych klientów.
            Dziś Słodki Zakątek to marka znana w całej okolicy — każde zlecenie
            traktujemy jak wyjątkowe dzieło sztuki.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Każdy tort jest pieczołowicie przygotowywany ręcznie, z najwyższej
            jakości składników. Specjalizujemy się w tortach okolicznościowych,
            weselnych i urodzinowych — zawsze dopasowanych do wizji klienta.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.label} className="text-center bg-pink-50 rounded-2xl p-4">
                <p className="font-playfair text-3xl font-bold text-rose-500">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
