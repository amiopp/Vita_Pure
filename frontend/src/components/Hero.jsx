import { ArrowRight, Leaf, MessageCircle, Sparkles } from "lucide-react";

import bComplex from "../assets/products/selected/b-complex.jpeg";
import collagen from "../assets/products/selected/collagen-up.jpeg";
import creatine from "../assets/products/selected/creatine.jpeg";
import omega from "../assets/products/selected/mega-omega-3.jpeg";
import { getWhatsAppUrl } from "../lib/whatsapp.js";

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl("Bonjour PUREVITA, je souhaite commander des produits.");

  return (
    <section id="accueil" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute left-0 top-16 h-56 w-28 -rotate-12 rounded-[100%_0_100%_0] bg-pure-mint/90" />
      <div className="absolute right-0 top-36 h-72 w-36 rotate-12 rounded-[0_100%_0_100%] bg-pure-green/10" />

      <div className="section-shell relative grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="min-w-0 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pure-line bg-white px-4 py-2 text-sm font-semibold text-pure-green shadow-sm">
            <Leaf className="h-4 w-4" />
            PUREVITA - Vivez en plein santé
          </div>
          <h1 className="max-w-full break-words text-4xl font-semibold leading-tight tracking-normal text-pure-black sm:text-5xl lg:text-6xl">
            Des compléments de qualité pour votre bien-être
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pure-ink/80">
            PUREVITA vous accompagne avec une sélection de compléments pensés pour votre routine sportive,
            votre énergie et votre équilibre quotidien.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" />
              Commander sur WhatsApp
            </a>
            <a href="#produits" className="btn-secondary">
              Voir les produits
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {["Commande rapide", "Conseil humain", "Produits sélectionnés"].map((item) => (
              <div key={item} className="rounded-2xl border border-pure-line bg-white px-4 py-3 shadow-sm">
                <span className="text-sm font-semibold text-pure-black">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] min-w-0 overflow-hidden sm:min-h-[520px]">
          <div className="absolute inset-x-8 bottom-0 top-6 rounded-[4rem] bg-pure-mint" />
          <div className="absolute left-4 top-0 h-28 w-16 rotate-45 rounded-[100%_0_100%_0] bg-pure-leaf/25" />
          <div className="absolute right-10 top-8 h-20 w-12 -rotate-45 rounded-[0_100%_0_100%] bg-pure-green/20" />

          <div className="absolute left-0 top-12 w-[46%] overflow-hidden rounded-[2rem] bg-white shadow-premium ring-1 ring-pure-line">
            <img src={creatine} alt="Creatine PUREVITA" className="h-80 w-full object-cover object-center" />
          </div>
          <div className="absolute right-0 top-0 w-[52%] overflow-hidden rounded-[2rem] bg-white shadow-premium ring-1 ring-pure-line">
            <img src={collagen} alt="CollagenUP PUREVITA" className="h-96 w-full object-cover object-center" />
          </div>
          <div className="absolute bottom-0 left-[18%] w-[46%] overflow-hidden rounded-[2rem] bg-white shadow-premium ring-1 ring-pure-line">
            <img src={omega} alt="Omega 3 PUREVITA" className="h-80 w-full object-cover object-center" />
          </div>
          <div className="absolute bottom-12 right-4 w-[34%] overflow-hidden rounded-[2rem] bg-white shadow-premium ring-1 ring-pure-line">
            <img src={bComplex} alt="B-Complex PUREVITA" className="h-60 w-full object-cover object-center" />
          </div>

          <div className="absolute bottom-6 right-1 rounded-3xl border border-white/70 bg-pure-black px-5 py-4 text-white shadow-premium">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-pure-leaf" />
              Nos essentiels
            </div>
            <p className="mt-1 text-xs text-white/70">Sport, énergie, équilibre</p>
          </div>
        </div>
      </div>
    </section>
  );
}
