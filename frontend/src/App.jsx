import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import FAQ from "./components/FAQ.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import HowToOrder from "./components/HowToOrder.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductCatalog from "./components/ProductCatalog.jsx";
import TrustSection from "./components/TrustSection.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden text-pure-ink">
      <Navbar />
      <main>
        <Hero />
        <ProductCatalog />
        <HowToOrder />
        <TrustSection />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

