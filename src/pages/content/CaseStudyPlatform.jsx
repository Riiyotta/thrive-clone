import { useLocation } from 'react-router-dom'
import Sec from './Sec.jsx'
import CsPlatformBody from '../../components/sections/CsPlatformBody.jsx'
import EnterpriseSlider from '../../components/EnterpriseSlider.jsx'
import { CASE_STUDY_PLATFORM, RELATED_SLIDES } from './caseStudyPlatformData.js'

// Related slider: section padding 96/80 on the original (bottom 0 at ≤479); EnterpriseSlider adds its own
// trailing 2rem spacer, so the bottom padding here is 3rem and the spacer is cancelled at ≤479.
// case-study-platform (/case-study/customer-1..5): one component, per-route content from caseStudyPlatformData.js.
export default function CaseStudyPlatform() {
  const { pathname } = useLocation()
  const data = CASE_STUDY_PLATFORM[pathname] || {}
  return (
    <>
      <Sec id="cs-platform-body"><CsPlatformBody key={pathname} inlineImageClassName="mb-[3rem] mt-[1rem] inline-flex h-[26rem] w-full max-w-full rounded-panel align-top" {...data} /></Sec>
      <Sec id="related-3col-slider">
        <EnterpriseSlider
          variant="case"
          className="overflow-hidden pb-[3rem] pt-[6rem] xs:mb-[-1.25rem] xs:pb-0"
          header={
            <div className="flex flex-col items-center">
              <h2 className="heading-h2">Explore more customer stories</h2>
            </div>
          }
          headerSpacerClassName="pt-[5rem] xs:pt-[3rem]"
          slides={RELATED_SLIDES}
        />
      </Sec>
    </>
  )
}
