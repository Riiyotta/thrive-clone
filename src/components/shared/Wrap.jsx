// Optional wrapper: renders a <div> only when a class is given, so an unused prop adds no DOM
// node (keeps default section markup identical to the homepage).
export default function Wrap({ className, children }) {
  return className ? <div className={className}>{children}</div> : children
}
