import { Leaf, ShieldCheck } from "lucide-react";

import logo from "../assets/purevita-logo.jpg";
import magnesium from "../assets/products/selected/magnesium-malate.jpeg";

export default function About() {
  return (
    <section id="apropos" className="bg-pure-mint/50 py-16 sm:py-20">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-premium ring-1 ring-pure-line">
            <img src={magnesium} alt="Produit PUREVITA" className="h-[520px] w-full object-cover object-center" />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-3xl border border-pure-line bg-white p-5 shadow-premium">
            <img src={logo} alt="PUREVITA" className="h-16 w-16 rounded-full object-cover" />
          </div>
        </div>

        <div>
          <span className="section-kicker">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Marque bien-être
          </span>
          <h2 className="section-title">À propos de PUREVITA</h2>
          <p className="mt-6 text-lg leading-8 text-pure-ink/80">
            PUREVITA accompagne votre routine bien-être avec des compléments soigneusement sélectionnés, dans une
            approche simple, saine et accessible. Notre objectif est de vous aider à mieux organiser votre routine
            sportive, nutritionnelle et quotidienne avec des produits adaptés à un mode de vie actif.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Sélection premium", "Routine sportive", "Équilibre quotidien", "Commande humaine"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-pure-line bg-white px-5 py-4">
                <Leaf className="h-5 w-5 text-pure-green" />
                <span className="font-semibold text-pure-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

