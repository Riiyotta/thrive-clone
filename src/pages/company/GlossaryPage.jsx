import GlossaryIndex from '../../components/sections/GlossaryIndex.jsx'
import GlossaryCta from '../../components/sections/GlossaryCta.jsx'

// /resources/lms-glossary (fixed 16px root; oldest Webflow system).
export default function GlossaryPage() {
  return (
    <div>
      <GlossaryIndex />
      <GlossaryCta />
    </div>
  )
}
