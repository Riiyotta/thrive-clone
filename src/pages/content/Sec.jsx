// Page-level section slot: tags each composed section with its manifest id (data-sec) so the page can be
// measured against pages-manifest.json metrics. A plain block box, so it adds no geometry of its own.
export default function Sec({ id, children, className }) {
  return (
    <div data-sec={id} className={className}>
      {children}
    </div>
  )
}
