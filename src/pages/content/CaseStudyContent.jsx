import { useLocation } from 'react-router-dom'
import Sec from './Sec.jsx'
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import CsContentStats from '../../components/sections/CsContentStats.jsx'
import CsContentArticle from '../../components/sections/CsContentArticle.jsx'
import CsContentRelated from '../../components/sections/CsContentRelated.jsx'
import { CASE_STUDY_CONTENT } from './caseStudyContentData.js'

// case-study-content (/case-studies-contents/customer-6..10): one component, per-route props from caseStudyContentData.js.
export default function CaseStudyContent() {
  const { pathname } = useLocation()
  const d = CASE_STUDY_CONTENT[pathname] || {}
  return (
    <>
      <Sec id="layout2-hero"><Layout2Hero variant="case-study" {...d.hero} /></Sec>
      <Sec id="cs-content-stats"><CsContentStats key={pathname} {...d.stats} /></Sec>
      <Sec id="cs-content-article"><CsContentArticle key={pathname} tocFromHeadings {...d.article} /></Sec>
      <Sec id="cs-content-related"><CsContentRelated {...d.related} /></Sec>
    </>
  )
}
