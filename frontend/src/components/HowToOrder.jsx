import { CheckCircle2, MessageCircle, PackagePlus } from "lucide-react";

const steps = [
  {
    icon: PackagePlus,
    title: "Choisissez vos produits",
    text: "Parcourez le catalogue et sélectionnez les compléments adaptés à votre routine.",
  },
  {
    icon: MessageCircle,
    title: "Envoyez votre commande sur WhatsApp",
    text: "Le message est préparé automatiquement avec le produit et la quantité.",
  },
  {
    icon: CheckCircle2,
    title: "Confirmez la livraison avec l'équipe PUREVITA",
    text: "L'équipe vérifie la disponibilité et confirme les détails directement avec vous.",
  },
];

export default function HowToOrder() {
  return (
    <section id="commander" className="bg-pure-gray py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Commande WhatsApp</span>
          <h2 className="section-title">Comment commander ?</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-[1.75rem] border border-pure-line bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pure-mint text-pure-green">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-6 inline-block text-sm font-semibold text-pure-green">Étape {index + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-pure-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-pure-ink/75">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
