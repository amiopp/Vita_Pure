import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "Comment passer une commande ?",
    answer:
      "Choisissez un produit puis cliquez sur Commander. Vous serez redirigé vers WhatsApp avec un message prêt à envoyer.",
  },
  {
    question: "Est-ce que je peux payer en ligne ?",
    answer: "Non, les commandes sont confirmées directement via WhatsApp avec l'équipe PUREVITA.",
  },
  {
    question: "Puis-je demander conseil avant de commander ?",
    answer:
      "Oui, vous pouvez contacter PUREVITA sur WhatsApp pour obtenir des informations sur les produits disponibles.",
  },
  {
    question: "Les produits sont-ils toujours disponibles ?",
    answer: "La disponibilité peut changer. Chaque commande est confirmée via WhatsApp avant la livraison.",
  },
  {
    question: "Est-ce que les compléments remplacent une alimentation équilibrée ?",
    answer:
      "Non, les compléments sont conçus pour accompagner une routine équilibrée et ne remplacent pas une alimentation variée.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <span className="section-kicker">Questions fréquentes</span>
          <h2 className="section-title">FAQ</h2>
          <p className="mt-4 text-base leading-7 text-pure-ink/75">
            Les commandes PUREVITA se font simplement par WhatsApp avec confirmation directe.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <details
              key={item.question}
              className="group rounded-[1.25rem] border border-pure-line bg-white p-5 shadow-sm open:border-pure-green/40"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-pure-black">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-pure-green transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm leading-6 text-pure-ink/75">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

