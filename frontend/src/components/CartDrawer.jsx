import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

import logo from "../assets/purevita-logo.jpg";
import { getCartWhatsAppUrl } from "../lib/whatsapp.js";

const imageModules = import.meta.glob("../assets/products/selected/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getProductImage(fileName) {
  return imageModules[`../assets/products/selected/${fileName}`] || logo;
}

const priceFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

export default function CartDrawer({ isOpen, items, onClose, onQuantityChange, onRemove, onClear }) {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  function handleOrderCart() {
    if (items.length === 0) return;
    window.location.href = getCartWhatsAppUrl(items, customerName, address);
  }

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-pure-black/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-premium transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-pure-line px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pure-mint text-pure-green">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-pure-black">Votre panier</h2>
              <p className="text-sm text-pure-ink/60">{items.length} produit(s)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pure-line text-pure-black transition hover:border-pure-green hover:text-pure-green"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-pure-line bg-pure-gray p-8 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-pure-green" />
              <p className="mt-4 font-semibold text-pure-black">Votre panier est vide</p>
              <p className="mt-2 text-sm leading-6 text-pure-ink/65">
                Ajoutez plusieurs produits, puis envoyez une seule commande sur WhatsApp.
              </p>
              <a href="#produits" onClick={onClose} className="btn-primary mt-5">
                Voir les produits
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="rounded-[1.25rem] border border-pure-line bg-white p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={getProductImage(item.product.image_url)}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-pure-green">{item.product.category}</p>
                      <h3 className="mt-1 truncate font-semibold text-pure-black">{item.product.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-pure-black">
                        {priceFormatter.format(item.product.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item.product.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-pure-ink/55 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Retirer ${item.product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-pure-line bg-pure-gray">
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center text-pure-black"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-pure-black">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center text-pure-black"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-pure-black">
                      {priceFormatter.format(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="grid gap-3 rounded-[1.25rem] border border-pure-line bg-pure-gray p-4">
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Nom"
                  className="h-12 rounded-full border border-pure-line bg-white px-4 text-sm outline-none transition focus:border-pure-green"
                />
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Adresse"
                  className="h-12 rounded-full border border-pure-line bg-white px-4 text-sm outline-none transition focus:border-pure-green"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-pure-line bg-white px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold text-pure-black">Total estimé</span>
            <span className="text-xl font-semibold text-pure-black">{priceFormatter.format(total)}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              type="button"
              onClick={handleOrderCart}
              disabled={items.length === 0}
              className="btn-primary disabled:cursor-not-allowed disabled:bg-pure-ink/35"
            >
              <ShoppingBag className="h-4 w-4" />
              Commander le panier
            </button>
            <button type="button" onClick={onClear} disabled={items.length === 0} className="btn-secondary">
              Vider
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
