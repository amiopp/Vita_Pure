import { MessageCircle } from "lucide-react";

import logo from "../assets/purevita-logo.jpg";
import { getWhatsAppUrl } from "../lib/whatsapp.js";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Comment commander", href: "#commander" },
  { label: "À propos", href: "#apropos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl("Bonjour PUREVITA, je souhaite contacter votre équipe.");

  return (
    <footer className="border-t border-pure-line bg-white py-10">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="PUREVITA" className="h-12 w-12 rounded-full object-cover ring-1 ring-pure-line" />
              <div>
                <span className="block text-xl font-semibold text-pure-black">PUREVITA</span>
                <span className="text-xs uppercase tracking-[0.18em] text-pure-green">Vivez en plein santé</span>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-pure-ink/70">
              Compléments sélectionnés pour accompagner une routine bien-être, sportive et quotidienne simple.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-pure-black">Navigation</h3>
            <div className="mt-4 grid gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-pure-ink/70 transition hover:text-pure-green">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-pure-black">Contact</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pure-green">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <p className="mt-3 text-sm text-pure-ink/70">Instagram: @pure_vita2</p>
            <p className="mt-2 text-sm text-pure-ink/70">Téléphone: +212 705545390</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-pure-gray px-5 py-4 text-sm leading-6 text-pure-ink/70">
          Les compléments alimentaires ne remplacent pas une alimentation variée et équilibrée ni un mode de vie sain.
        </div>
      </div>
    </footer>
  );
}

