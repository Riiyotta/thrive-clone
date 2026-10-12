// Features family (wave 2, W2-features): /lms/features, /nova, /lms/mentoring-software and the
// 17 feature-detail routes (one FeatureDetail component + featureDetailData.js keyed by path).
import FeatureDetail from './FeatureDetail.jsx'
import LmsFeatures from './LmsFeatures.jsx'
import Nova from './Nova.jsx'
import MentoringSoftware from './MentoringSoftware.jsx'

const DETAIL_SLUGS = [
  'lms-homepage', 'spaces', 'chat', 'learning-pathways', 'lms-analytics', 'skills',
  'employee-assessment-software', 'ai-content-creator', 'lms-admin', 'lms-rewards', 'mcp',
  'mobile-lms', 'lms-security', 'employee-experience', 'communication',
  'employee-performance-management-software', 'lms-gamification',
]

export const pages = {
  '/lms/features': LmsFeatures,
  '/nova': Nova,
  '/lms/mentoring-software': MentoringSoftware,
  ...Object.fromEntries(DETAIL_SLUGS.map((s) => [`/lms/features/${s}`, FeatureDetail])),
}
