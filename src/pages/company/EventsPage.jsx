import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import EventsUpcoming from '../../components/sections/EventsUpcoming.jsx'
import WebinarsUpcoming from '../../components/sections/WebinarsUpcoming.jsx'
import EventsFilter from '../../components/sections/EventsFilter.jsx'
import { PAST_WEBINARS } from './eventsData.js'

// Callout heading sized to the original's line counts (2L at 1440 / 1280, 4L at 390).
const SUBSCRIBE = {
  heading: 'For fresh learning insight, product news and invites to upcoming events',
  sub: 'Join the list',
  headingWrapClass: 'max-w-[36rem]',
  subClass: 'text-body xs:text-body-xs',
}

// /resources/events-webinars (fluid root, legacy "green" theme). The upcoming-webinars CMS list was
// empty at measurement time, so WebinarsUpcoming shows its "No items found." state, as on the original.
export default function EventsPage() {
  return (
    <div>
      <Layout2Hero variant="events" />
      <EventsUpcoming subscribe={SUBSCRIBE} />
      <WebinarsUpcoming />
      <EventsFilter items={PAST_WEBINARS} />
    </div>
  )
}
