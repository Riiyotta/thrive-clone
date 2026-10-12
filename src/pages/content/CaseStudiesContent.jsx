import Sec from './Sec.jsx'
import GlobalHeaderLegacy from '../../components/sections/GlobalHeaderLegacy.jsx'
import CsContentList from '../../components/sections/CsContentList.jsx'
import { phrase } from './filler.js'

// /case-studies/content (page-case-studies-content): legacy header + CMS list of content case studies.
// Ten cards, as on the live list at measurement time; summary lengths (characters) follow each live card.
const NAMES = ['six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen']
const LENGTHS = [101, 99, 110, 116, 118, 153, 89, 120, 102, 114]
const ITEMS = LENGTHS.map((n, i) => ({
  logo: `Customer ${NAMES[i]}`,
  text: phrase(`Customer ${NAMES[i]}`, n - 1, 11 + i * 29) + '.',
  href: `/case-studies-contents/customer-${(i % 5) + 6}`,
}))

export default function CaseStudiesContent() {
  return (
    <>
      <Sec id="global-header-legacy"><GlobalHeaderLegacy variant="logo" theme="yellow" /></Sec>
      <Sec id="cs-content-list"><CsContentList items={ITEMS} /></Sec>
    </>
  )
}
