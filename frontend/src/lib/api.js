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
    let message = `API error: ${response.status}`;
    try {
      const data = await response.json();
      if (Array.isArray(data.detail)) {
        message = data.detail
          .map((item) => {
            const field = item.loc?.filter((part) => part !== "body").join(".");
            return field ? `${field}: ${item.msg}` : item.msg;
          })
          .join(" | ");
      } else if (data.detail) {
        message = data.detail;
      }
    } catch (err) {
      // Keep the status-based message if the API did not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
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

function adminHeaders(adminKey) {
  return {
    "X-Admin-Key": adminKey,
  };
}

export function getAdminProducts(adminKey) {
  return request("/api/admin/products", {
    headers: adminHeaders(adminKey),
  });
}

export function createAdminProduct(adminKey, product) {
  return request("/api/admin/products", {
    method: "POST",
    headers: adminHeaders(adminKey),
    body: JSON.stringify(product),
  });
}

export function updateAdminProduct(adminKey, productId, product) {
  return request(`/api/admin/products/${productId}`, {
    method: "PUT",
    headers: adminHeaders(adminKey),
    body: JSON.stringify(product),
  });
}

export function deleteAdminProduct(adminKey, productId) {
  return request(`/api/admin/products/${productId}`, {
    method: "DELETE",
    headers: adminHeaders(adminKey),
  });
}
