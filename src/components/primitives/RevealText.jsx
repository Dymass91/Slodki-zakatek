import useReveal from '../../hooks/useReveal'

// Wraps a block in the site's standard translateY/opacity reveal.
// `as` lets callers pick the semantic tag (h2, p, div…) without duplicating logic.
export default function RevealText({ as: Tag = 'div', className = '', delay = 0, scale = false, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`${scale ? 'reveal-scale' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
