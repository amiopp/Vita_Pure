import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import logo from "../assets/purevita-logo.jpg";
import { getWhatsAppUrl } from "../lib/whatsapp.js";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Comment commander", href: "#commander" },
  { label: "À propos", href: "#apropos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ cartCount = 0, onCartOpen }) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl("Bonjour PUREVITA, je souhaite passer une commande.");

  return (
    <header className="sticky top-0 z-50 border-b border-pure-line/80 bg-white/90 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between gap-4">
        <a href="#accueil" className="flex min-w-0 items-center gap-3" aria-label="PUREVITA accueil">
          <img
            src={logo}
            alt="Logo PUREVITA"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-pure-line"
          />
          <div className="min-w-0 leading-tight">
            <span className="block text-xl font-semibold tracking-normal text-pure-black">PUREVITA</span>
            <span className="text-xs uppercase tracking-[0.18em] text-pure-green">Vivez en plein santé</span>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-pure-ink transition hover:text-pure-green"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={onCartOpen} className="btn-secondary px-5">
            <ShoppingBag className="h-4 w-4" />
            Panier
            {cartCount > 0 && (
              <span className="ml-1 rounded-full bg-pure-green px-2 py-0.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" />
            Commander sur WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pure-line bg-white text-pure-black shadow-sm lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-pure-line bg-white lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-semibold text-pure-ink transition hover:bg-pure-mint hover:text-pure-green"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              Commander sur WhatsApp
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setOpen(false);
                onCartOpen?.();
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Voir le panier
              {cartCount > 0 && (
                <span className="ml-1 rounded-full bg-pure-green px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
