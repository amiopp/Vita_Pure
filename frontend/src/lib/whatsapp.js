const DEFAULT_NUMBER = "+000000000000";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_NUMBER;

export function normalizeWhatsAppNumber(number = WHATSAPP_NUMBER) {
  const digits = String(number).replace(/\D/g, "");
  return digits || DEFAULT_NUMBER.replace(/\D/g, "");
}

export function buildProductMessage(productName, quantity = 1) {
  return `Bonjour PUREVITA, je veux commander: ${productName}. Quantité: ${quantity}. Nom: . Adresse: .`;
}

export function getWhatsAppUrl(message) {
  return `https://wa.me/${normalizeWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppUrl(productName, quantity = 1) {
  return getWhatsAppUrl(buildProductMessage(productName, quantity));
}

export function buildCartMessage(items, customerName = "", address = "") {
  const lines = items.map((item) => `- ${item.product.name} x ${item.quantity}`).join("\n");
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    "Bonjour PUREVITA, je veux commander:\n" +
    `${lines}\n` +
    `Total estimé: ${total.toFixed(0)} MAD.\n` +
    `Nom: ${customerName}. Adresse: ${address}.`
  );
}

export function getCartWhatsAppUrl(items, customerName = "", address = "") {
  return getWhatsAppUrl(buildCartMessage(items, customerName, address));
}
