import BlogFeatured from '../../components/sections/BlogFeatured.jsx'
import BlogFilter, { DEFAULT_POSTS } from '../../components/sections/BlogFilter.jsx'

// /resources/blog-and-news (fluid root, legacy "green" theme).
const FEATURED = {
  title: 'Your next admin job could take seconds, not hours',
  text: 'How we turned Nova into a helper for routine admin, so platform owners can focus on the work that moves learning forward.',
  author: 'Jordan Ellis',
  date: 'October 7, 2026',
  readTime: '6 mins to read',
  href: '#',
}
// The first page of posts (20) gets titles sized per card to the original's line counts at 1440 / 1280 / 768 / 390;
// the rest keep the component's placeholder titles.
const FIRST_PAGE_TITLES = [
  'Your next admin task can start with a sentence',
  'What we learned shipping our biggest release in five simple steps',
  'Inside the team behind Nova without adding more meetings',
  'Five habits of teams that keep learning and why it matters for every new starter',
  'A practical guide to measuring impact: what the data tells us about performance',
  'Nimbus welcomes a new product lead: lessons from our customers',
  'How we rebuilt search this year',
  'Why onboarding matters most and why it matters for every new starter',
  'Our new mobile experience in a hybrid world',
  'The quiet power of short lessons: what the data tells us about performance',
  'A practical guide to measuring impact for growing teams everywhere',
  'Your next admin task can start with a sentence and why it matters for every new starter',
  'What we learned shipping our biggest release, and what comes next',
  'Building a culture of feedback without adding more meetings',
  'Coaching managers at scale: what the data tells us about performance',
  'Making compliance feel human: a practical guide',
  'Mentoring that works for busy managers',
  'Rethinking the annual review in five simple steps',
  'Small teams, big results in a hybrid world',
  'Skills data you can act on, and what comes next',
]
const POSTS = DEFAULT_POSTS.map((p, i) => (i < FIRST_PAGE_TITLES.length ? { ...p, title: FIRST_PAGE_TITLES[i] } : p))

export default function BlogPage() {
  return (
    <div>
      {/* featured text (2L desktop / 3L at 390) and callout heading (3L everywhere) sized to the original's line counts */}
      <BlogFeatured post={FEATURED} subscribe={{ heading: 'Get our latest learning and workplace insights delivered monthly' }} />
      <BlogFilter posts={POSTS} />
    </div>
  )
}
