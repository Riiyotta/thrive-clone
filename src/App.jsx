import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import ProductTabs from './components/ProductTabs.jsx'
import KikiTabs from './components/KikiTabs.jsx'
import EnterpriseSlider from './components/EnterpriseSlider.jsx'
import Results from './components/Results.jsx'
import Statement from './components/Statement.jsx'
import QuoteHighlight from './components/QuoteHighlight.jsx'
import CaseStudyCarousel from './components/CaseStudyCarousel.jsx'
import VideoSection from './components/VideoSection.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="bg-page pt-[64px]">
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <ProductTabs />
        <KikiTabs />
        <EnterpriseSlider />
        <Results />
        <Statement />
        <QuoteHighlight />
        <CaseStudyCarousel />
        <VideoSection />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
