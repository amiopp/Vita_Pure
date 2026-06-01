import { AlertCircle, Leaf } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { createWhatsAppOrderLink, getCategories, getProducts } from "../lib/api.js";
import { getProductWhatsAppUrl } from "../lib/whatsapp.js";
import CategoryFilter from "./CategoryFilter.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      try {
        const [productData, categoryData] = await Promise.all([getProducts(), getCategories()]);
        if (!mounted) return;
        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        if (mounted) setError("Impossible de charger les produits pour le moment.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Tous") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  async function handleOrder(product) {
    try {
      const result = await createWhatsAppOrderLink(product.id, 1);
      window.open(result.whatsapp_url, "_blank", "noopener,noreferrer");
    } catch (err) {
      window.open(getProductWhatsAppUrl(product.name, 1), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <section id="produits" className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">
              <Leaf className="mr-2 h-4 w-4" />
              Catalogue PUREVITA
            </span>
            <h2 className="section-title">Nos compléments sélectionnés</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-pure-ink/75">
              Choisissez vos essentiels, puis confirmez votre commande directement avec l'équipe PUREVITA sur WhatsApp.
            </p>
          </div>
          <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {featuredProducts.length > 0 && (
          <div className="mb-14">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-normal text-pure-black">Nos essentiels</h3>
              <a href="#commander" className="text-sm font-semibold text-pure-green hover:text-pure-black">
                Comment commander
              </a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} product={product} onOrder={handleOrder} compact />
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[520px] animate-pulse rounded-[1.75rem] bg-pure-gray" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOrder={handleOrder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

