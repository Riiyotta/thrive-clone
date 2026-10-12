import CompanyPage from './CompanyPage.jsx'
import WhyNimbusPage from './WhyNimbusPage.jsx'
import WhatsIncludedPage from './WhatsIncludedPage.jsx'
import ContactPage from './ContactPage.jsx'
import EventsPage from './EventsPage.jsx'
import BlogPage from './BlogPage.jsx'
import GuidesPage from './GuidesPage.jsx'
import GlossaryPage from './GlossaryPage.jsx'

// Company + resources family: one component per single-route template.
export const pages = {
  '/company': CompanyPage,
  '/company/why-nimbus': WhyNimbusPage,
  '/whats-included': WhatsIncludedPage,
  '/contact-us': ContactPage,
  '/resources/events-webinars': EventsPage,
  '/resources/blog-and-news': BlogPage,
  '/resources/guides': GuidesPage,
  '/resources/lms-glossary': GlossaryPage,
}
