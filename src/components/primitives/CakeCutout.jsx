// Transparent-background cake PNGs are treated as graphic objects, not photos in
// frames — no card, no border, just a drop-shadow so they sit believably on the page.
export default function CakeCutout({ src, alt, className = '', style, loading = 'lazy' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      draggable={false}
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: 'drop-shadow(0 40px 60px rgba(66,26,39,0.25))', ...style }}
    />
  )
}
