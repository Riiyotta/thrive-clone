import Sec from './Sec.jsx'
import GlobalHeaderLegacy from '../../components/sections/GlobalHeaderLegacy.jsx'
import CsContentList from '../../components/sections/CsContentList.jsx'
import { phrase } from './filler.js'

// /case-studies/content (page-case-studies-content): legacy header + CMS list of content case studies.
// Ten cards, as on the live list at measurement time; summary lengths (characters) follow each live card
// (card seven trimmed so it wraps to the live 2 lines at 390 as well as 1440).
const NAMES = ['six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen']
const LENGTHS = [101, 99, 110, 116, 118, 153, 79, 120, 102, 114]
const ITEMS = LENGTHS.map((n, i) => ({
  logo: `Customer ${NAMES[i]}`,
  text: phrase(`Customer ${NAMES[i]}`, n - 1, 11 + i * 29) + '.',
  href: `/case-studies-contents/customer-${(i % 5) + 6}`,
}))

export default function CaseStudiesContent() {
  return (
    <>
      <Sec id="global-header-legacy">
        <GlobalHeaderLegacy
          variant="logo"
          theme="yellow"
          body="Discover how leading organisations use Nimbus content to onboard and train their people, strengthen engagement and build lasting capability, with libraries tailored to every single role, sector and team size."
        />
      </Sec>
      <Sec id="cs-content-list"><CsContentList items={ITEMS} textClassName="mb-[1.5rem]" /></Sec>
    </>
  )
}
