import GuidesIndex from '../../components/sections/GuidesIndex.jsx'

// /resources/guides (fixed 16px root; oldest Webflow system). The original opens with an empty
// .top-space-30px block (30px) between the nav and the .s section.
export default function GuidesPage() {
  return (
    <div>
      <div aria-hidden data-sec="top-space" className="h-[1.875rem]" />
      <GuidesIndex />
    </div>
  )
}
