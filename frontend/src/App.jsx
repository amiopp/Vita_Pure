import { useMemo, useState } from "react";

import AdminPage from "./components/AdminPage.jsx";
import About from "./components/About.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
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
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminPage />;
  }

  return <Storefront />;
}

function Storefront() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  function addToCart(product) {
    setCartItems((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      setCartItems((items) => items.filter((item) => item.product.id !== productId));
      return;
    }

    setCartItems((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  }

  return (
    <div className="min-h-screen overflow-hidden text-pure-ink">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <ProductCatalog onAddToCart={addToCart} />
        <HowToOrder />
        <TrustSection />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQuantityChange={updateCartQuantity}
        onRemove={removeFromCart}
        onClear={() => setCartItems([])}
      />
    </div>
  );
}
