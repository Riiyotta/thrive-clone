import { useLocation } from 'react-router-dom'

// Shown for routes whose template hasn't been built yet.
export default function PendingPage() {
  const { pathname } = useLocation()
  return (
    <section className="padding-global">
      <div className="container-medium flex min-h-[60vh] flex-col items-start justify-center gap-[1rem] py-[8rem]">
        <h1 className="heading-h2">Page in progress</h1>
        <p className="text-para text-grey">{pathname}</p>
      </div>
    </section>
  )
}
