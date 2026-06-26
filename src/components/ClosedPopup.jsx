import { useState, useEffect } from 'react'

export default function ClosedPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)',
          border: '3px solid #f06292',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bow at top */}
        <div className="flex justify-center pt-4">
          <span className="text-5xl" style={{ filter: 'drop-shadow(0 2px 4px #f06292aa)' }}>🎀</span>
        </div>

        {/* Warning banner */}
        <div className="mx-4 mt-2 rounded-xl overflow-hidden border-2 border-yellow-400 shadow">
          {/* Yellow-black tape stripe */}
          <div
            className="h-4 w-full"
            style={{
              background: 'repeating-linear-gradient(45deg, #f5c300 0px, #f5c300 12px, #1a1a1a 12px, #1a1a1a 24px)',
            }}
          />
          <div className="bg-yellow-50 text-center py-2 px-3">
            <p className="font-extrabold text-red-600 text-base leading-tight tracking-wide">UWAGA!</p>
            <p className="font-extrabold text-gray-800 text-sm leading-tight">PRACOWNIA NIECZYNNA</p>
          </div>
          <div
            className="h-4 w-full"
            style={{
              background: 'repeating-linear-gradient(45deg, #f5c300 0px, #f5c300 12px, #1a1a1a 12px, #1a1a1a 24px)',
            }}
          />
        </div>

        {/* Body text */}
        <div className="mx-5 my-4 text-center text-gray-800 text-sm leading-relaxed">
          <p>
            Z powodu operacji kręgosłupa oraz komplikacji <em>w trakcie operacji</em> i okresu{' '}
            <strong>rehabilitacji</strong> pracownia tortów{' '}
            <span className="font-bold" style={{ fontFamily: 'cursive', color: '#c2185b' }}>
              Słodki Zakątek
            </span>{' '}
            będzie przez dłuższy czas <strong>nieczynna.</strong> 🩷
          </p>
          <p className="mt-2">
            Na bieżąco będziemy informować o powrocie działalności pracowni. 🩷
          </p>
          <p className="mt-2 italic font-semibold text-pink-700">Przepraszamy za utrudnienia!</p>
        </div>

        {/* Close button */}
        <div className="flex justify-center pb-5">
          <button
            onClick={() => setVisible(false)}
            className="px-8 py-2 rounded-full font-bold text-white text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(90deg, #e91e8c, #f06292)' }}
          >
            Zamknij
          </button>
        </div>

        {/* Decorative hearts */}
        <div className="absolute top-3 left-3 text-pink-300 text-lg select-none">♥</div>
        <div className="absolute top-6 right-5 text-pink-400 text-sm select-none">♥</div>
        <div className="absolute bottom-12 left-4 text-pink-300 text-xs select-none">♥</div>
        <div className="absolute bottom-10 right-3 text-pink-400 text-lg select-none">♥</div>
      </div>
    </div>
  )
}
