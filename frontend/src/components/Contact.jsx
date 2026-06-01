import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { getWhatsAppUrl } from "../lib/whatsapp.js";

const contactItems = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@pure_vita2",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+212 705545390",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Adresse à confirmer",
  },
];

export default function Contact() {
  const whatsappUrl = getWhatsAppUrl("Bonjour PUREVITA, je souhaite parler avec votre équipe.");

  return (
    <section id="contact" className="bg-pure-black py-16 text-white sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-pure-leaf">
            Contact
          </span>
          <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">Parlez avec PUREVITA sur WhatsApp</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Une question sur un produit ou une disponibilité ? L'équipe PUREVITA vous répond directement.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8 bg-pure-leaf hover:bg-white hover:text-pure-black">
            <MessageCircle className="h-4 w-4" />
            Parlez avec PUREVITA sur WhatsApp
          </a>
        </div>

        <div className="grid gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.08] p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-pure-leaf">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-sm text-white/60">{item.label}</span>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
