import logo from "../assets/purevita-logo.jpg";

const imageModules = import.meta.glob("../assets/products/selected/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function getProductImage(imageUrl) {
  if (!imageUrl) return logo;
  if (/^(https?:\/\/|\/|data:image\/)/i.test(imageUrl)) return imageUrl;
  return imageModules[`../assets/products/selected/${imageUrl}`] || logo;
}
