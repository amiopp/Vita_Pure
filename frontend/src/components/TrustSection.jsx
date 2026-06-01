import { Handshake, MessageCircle, PackageCheck, Truck } from "lucide-react";

const trustItems = [
  {
    icon: PackageCheck,
    title: "Produits sélectionnés",
    text: "Une sélection claire pour compléter vos routines sportives et quotidiennes.",
  },
  {
    icon: Handshake,
    title: "Conseil personnalisé",
    text: "Une équipe disponible pour répondre à vos questions sur les produits.",
  },
  {
    icon: MessageCircle,
    title: "Commande rapide via WhatsApp",
    text: "Un parcours simple, direct et sans paiement en ligne.",
  },
  {
    icon: Truck,
    title: "Livraison disponible",
    text: "Les détails de livraison sont confirmés avec vous avant l'envoi.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.5rem] border border-pure-line bg-white p-6 shadow-sm">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pure-mint text-pure-green">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-pure-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-pure-ink/75">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

