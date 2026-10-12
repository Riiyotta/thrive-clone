import GuidesIndex from '../../components/sections/GuidesIndex.jsx'

// Card copy sized per card to the original's title / text line counts at 1440, 1280, 768 and 390
// (the grid rows take their height from the tallest card).
const GUIDES = [
  ['Communication in learning teams: a practical guide', 'How clear communication helps learning teams build trust and keep every single person moving in the same direction.'],
  ['The manager’s guide to coaching', 'Coaching habits any manager can use to help their people grow, with conversation prompts.'],
  ['Building a skills-first culture', 'Key ideas for building a culture where people keep learning.'],
  ['Onboarding that sticks: why it matters more than ever', 'How to design a first ninety days that welcomes new starters properly.'],
  ['Skills audit', 'Map the skills you have today and the ones you need next.'],
  ['The learning budget', 'Make the most of every pound in your learning budget.'],
  ['Measuring learning impact: a practical guide', 'How to connect learning activity to real business results.'],
  ['Feedback that lands in five steps', 'Practical tips for running feedback conversations that people genuinely find useful and kind.'],
].map(([title, text]) => ({ title, text, href: '#' }))
const FEATURED = { title: 'The future of work', text: 'Work keeps changing. See how learning teams can stay ahead.', href: '#' }

// /resources/guides (fixed 16px root; oldest Webflow system). The original opens with an empty
// .top-space-30px block (30px) between the nav and the .s section.
export default function GuidesPage() {
  return (
    <div>
      <div aria-hidden data-sec="top-space" className="h-[1.875rem]" />
      <GuidesIndex featured={FEATURED} guides={GUIDES} />
    </div>
  )
}
