const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function getProducts() {
  return request("/api/products");
}

export function getCategories() {
  return request("/api/categories");
}

export function createWhatsAppOrderLink(productId, quantity = 1) {
  return request("/api/orders/whatsapp-link", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });
}

export function createWhatsAppCartOrderLink(items, customerName = "", address = "") {
  return request("/api/orders/whatsapp-cart-link", {
    method: "POST",
    body: JSON.stringify({
      items: items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      customer_name: customerName,
      address,
    }),
  });
}
