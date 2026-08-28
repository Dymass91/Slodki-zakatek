export default function SectionLabel({ children, dark = false, className = '' }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.3em] uppercase ${dark ? 'text-cream/70' : 'text-rose-500/80'} ${className}`}
    >
      {children}
    </p>
  )
}
