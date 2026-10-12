import GlossaryIndex from '../../components/sections/GlossaryIndex.jsx'
import GlossaryCta from '../../components/sections/GlossaryCta.jsx'
import { GLOSSARY_TERMS } from './glossaryData.js'

// /resources/lms-glossary (fixed 16px root; oldest Webflow system).
export default function GlossaryPage() {
  return (
    <div>
      <GlossaryIndex
        terms={GLOSSARY_TERMS}
        intro="Your plain-language guide to the words used across workplace learning, from adaptive pathways to xAPI, with clear definitions, practical examples and helpful tips for putting every single idea to work in your own organisation."
      />
      {/* one line at desktop, two at 768 (as on the original) */}
      <GlossaryCta text="Explore what Nimbus could do for your teams with a short, friendly demo today." />
    </div>
  )
}
