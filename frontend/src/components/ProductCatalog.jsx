import { AlertCircle, Leaf, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getCategories, getProducts } from "../lib/api.js";
import CategoryFilter from "./CategoryFilter.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductCatalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
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
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "Tous" || product.category === activeCategory;
      const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesSearch = normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchTerm]);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);
  const showFeaturedProducts = featuredProducts.length > 0 && searchTerm.trim() === "" && activeCategory === "Tous";

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
          <div className="w-full space-y-4 lg:max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pure-ink/45" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher un produit..."
                className="h-[52px] w-full rounded-full border border-pure-line bg-white py-3 pl-12 pr-12 text-sm font-medium text-pure-black shadow-sm outline-none transition placeholder:text-pure-ink/45 focus:border-pure-green focus:ring-4 focus:ring-pure-green/10"
                aria-label="Rechercher un produit"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-pure-ink/55 transition hover:bg-pure-mint hover:text-pure-green"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {showFeaturedProducts && (
          <div className="mb-14">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-normal text-pure-black">Nos essentiels</h3>
              <a href="#commander" className="text-sm font-semibold text-pure-green hover:text-pure-black">
                Comment commander
              </a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} product={product} onAddToCart={onAddToCart} compact />
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
          <>
            {filteredProducts.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-pure-line bg-pure-gray px-6 py-12 text-center">
                <Search className="mx-auto h-10 w-10 text-pure-green" />
                <h3 className="mt-4 text-xl font-semibold text-pure-black">Aucun produit trouvé</h3>
                <p className="mt-2 text-sm leading-6 text-pure-ink/65">
                  Essayez un autre mot-clé ou choisissez une autre catégorie.
                </p>
                {(searchTerm || activeCategory !== "Tous") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("Tous");
                    }}
                    className="btn-secondary mt-5"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
