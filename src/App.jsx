import ClosedPopup from './components/ClosedPopup'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import CakeStory from './components/CakeStory'
import About from './components/About'
import Process from './components/Process'
import SelectedWork from './components/SelectedWork'
import BrandStatement from './components/BrandStatement'
import Cennik from './components/Cennik'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ClosedPopup />
      <Navbar />
      <Hero />
      {/* Shared parent so Manifesto, Wedding, Custom/02 and Custom/03 all pin/overlap
          together as one editorial stacked-scroll sequence, cleanly releasing into About. */}
      <section className="relative" aria-label="Historia marki w czterech odsłonach">
        <Manifesto />
        <CakeStory />
      </section>
      <About />
      <Process />
      <SelectedWork />
      <BrandStatement />
      <Cennik />
      <FinalCTA />
      <Footer />
    </>
  )
}
