import ContentOverview from './ContentOverview.jsx'
import ContentCatalogue from './ContentCatalogue.jsx'
import ContentService from './ContentService.jsx'
import CustomContent from './CustomContent.jsx'
import Mentoring from './Mentoring.jsx'
import CaseStudiesLms from './CaseStudiesLms.jsx'
import CaseStudyPlatform from './CaseStudyPlatform.jsx'
import CaseStudiesContent from './CaseStudiesContent.jsx'
import CaseStudyContent from './CaseStudyContent.jsx'

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

export const pages = {
  '/content': ContentOverview,
  '/content/topics': ContentCatalogue,
  '/content/sector-suites': ContentCatalogue,
  '/content/service': ContentService,
  '/content/custom-content': CustomContent,
  '/mentoring': Mentoring,
  '/case-studies/lms': CaseStudiesLms,
  ...Object.fromEntries(range(1, 5).map((n) => [`/case-study/customer-${n}`, CaseStudyPlatform])),
  '/case-studies/content': CaseStudiesContent,
  ...Object.fromEntries(range(6, 10).map((n) => [`/case-studies-contents/customer-${n}`, CaseStudyContent])),
}
