import { MessageCircle } from "lucide-react";

import { getWhatsAppUrl } from "../lib/whatsapp.js";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl("Bonjour PUREVITA, je souhaite passer une commande.");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition duration-300 hover:-translate-y-1 hover:bg-pure-green focus:outline-none focus:ring-4 focus:ring-[#25D366]/25"
      aria-label="Contacter PUREVITA sur WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

