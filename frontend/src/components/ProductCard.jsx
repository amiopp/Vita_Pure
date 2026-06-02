import { PackageCheck, PackageX, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

import { getProductImage } from "../lib/productImages.js";

const priceFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product, onAddToCart, compact = false }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product.in_stock) return;
    onAddToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-pure-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className={`relative overflow-hidden bg-pure-gray ${compact ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
        <img
          src={getProductImage(product.image_url)}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-pure-green shadow-sm">
              <Star className="h-3 w-3 fill-pure-green" />
              Essentiel
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
              product.in_stock ? "bg-white/95 text-pure-green" : "bg-pure-black/90 text-white"
            }`}
          >
            {product.in_stock ? <PackageCheck className="h-3 w-3" /> : <PackageX className="h-3 w-3" />}
            {product.in_stock ? "Disponible" : "Sur demande"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-sm font-semibold text-pure-green">{product.category}</span>
        <h3 className="mt-2 text-xl font-semibold tracking-normal text-pure-black">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-pure-ink/75">{product.description}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-pure-black">{priceFormatter.format(product.price)}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pure-black px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-pure-green disabled:cursor-not-allowed disabled:bg-pure-ink/35"
          >
            <ShoppingBag className="h-4 w-4" />
            {added ? "Ajouté" : "Ajouter"}
          </button>
        </div>
      </div>
    </article>
  );
}
