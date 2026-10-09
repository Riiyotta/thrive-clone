// Route registry for every page under the nav. `template` is filled in from the
// template recon; `component` is lazy-loaded so each page family builds independently.
// Slugs mirror the original's paths, with brand/customer names swapped for neutral ones.
export const ROUTES = [
  // Platform
  { path: '/lms', original: '/lms' },
  { path: '/lms/small-business', original: '/lms/small-business' },
  { path: '/lms/corporate-lms', original: '/lms/corporate-lms' },
  { path: '/lms/enterprise', original: '/lms/enterprise' },
  { path: '/lms/solutions', original: '/lms/solutions' },
  { path: '/lms/professional-services', original: '/lms/professional-services' },
  { path: '/lms/impact', original: '/lms/thrive-impact' },
  { path: '/lms/integrations', original: '/lms/integrations' },
  { path: '/lms/spring-release', original: '/lms/spring-release' },
  { path: '/lms/demo-platform', original: '/lms/demo-platform' },
  { path: '/pricing', original: '/pricing' },
  // Features
  { path: '/lms/features', original: '/lms/features' },
  { path: '/nova', original: '/kiki' },
  { path: '/lms/mentoring-software', original: '/lms/mentoring-software' },
  ...[
    'lms-homepage', 'spaces', 'chat', 'learning-pathways', 'lms-analytics', 'skills',
    'employee-assessment-software', 'ai-content-creator', 'lms-admin', 'lms-rewards', 'mcp',
    'mobile-lms', 'lms-security', 'employee-experience', 'communication',
    'employee-performance-management-software', 'lms-gamification',
  ].map((s) => ({ path: `/lms/features/${s}`, original: `/lms/features/${s}` })),
  // Content
  { path: '/content', original: '/content' },
  { path: '/content/topics', original: '/content/topics' },
  { path: '/content/sector-suites', original: '/content/sector-suites' },
  { path: '/content/service', original: '/content/service' },
  { path: '/content/custom-content', original: '/content/custom-content' },
  { path: '/mentoring', original: '/mentoring' },
  // Case studies
  { path: '/case-studies/lms', original: '/case-studies/lms' },
  ...['avon', 'british-airways', 'burger-king', 'international-workplace-group', 'nothing-bundt-cakes'].map((s, i) => ({
    path: `/case-study/customer-${i + 1}`,
    original: `/case-study/${s}`,
  })),
  { path: '/case-studies/content', original: '/case-studies/content' },
  ...['nhs-property-service', 'specsavers', 'nandos', 'morrisons', 'momentum-group'].map((s, i) => ({
    path: `/case-studies-contents/customer-${i + 6}`,
    original: `/case-studies-contents/${s}`,
  })),
  // Learn
  { path: '/company', original: '/company' },
  { path: '/company/why-nimbus', original: '/company/why-thrive' },
  { path: '/whats-included', original: '/whats-included' },
  { path: '/contact-us', original: '/contact-us' },
  { path: '/resources/events-webinars', original: '/resources/events-webinars' },
  { path: '/resources/blog-and-news', original: '/resources/blog-and-news' },
  { path: '/resources/guides', original: '/resources/guides' },
  { path: '/resources/lms-glossary', original: '/resources/lms-glossary' },
]
