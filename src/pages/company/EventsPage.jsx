import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import EventsUpcoming from '../../components/sections/EventsUpcoming.jsx'
import WebinarsUpcoming from '../../components/sections/WebinarsUpcoming.jsx'
import EventsFilter from '../../components/sections/EventsFilter.jsx'

// /resources/events-webinars (fluid root, legacy "green" theme). The upcoming-webinars CMS list was
// empty at measurement time, so WebinarsUpcoming shows its "No items found." state, as on the original.
export default function EventsPage() {
  return (
    <div>
      <Layout2Hero variant="events" />
      <EventsUpcoming />
      <WebinarsUpcoming />
      <EventsFilter />
    </div>
  )
}
