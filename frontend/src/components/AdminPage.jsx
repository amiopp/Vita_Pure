import {
  CheckCircle2,
  ImagePlus,
  Edit,
  Eye,
  EyeOff,
  LogOut,
  PackagePlus,
  RefreshCcw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  getCategories,
  updateAdminProduct,
} from "../lib/api.js";
import { getProductImage } from "../lib/productImages.js";

const ADMIN_KEY_STORAGE = "purevita_admin_key";

const emptyProduct = {
  name: "",
  slug: "",
  category: "Sport & Fitness",
  description: "",
  price: "",
  image_url: "",
  in_stock: true,
  featured: false,
};

const priceFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Le fichier doit être une image."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1100;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => reject(new Error("Impossible de lire cette image."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Impossible de lire ce fichier."));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(ADMIN_KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState(adminKey);
  const [showKey, setShowKey] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAuthenticated = Boolean(adminKey);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return products;
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search),
    );
  }, [products, searchTerm]);

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((product) => product.in_stock).length,
      featured: products.filter((product) => product.featured).length,
    }),
    [products],
  );

  async function loadProducts(currentKey = adminKey) {
    if (!currentKey) return;
    setLoading(true);
    setError("");
    try {
      const [productData, categoryData] = await Promise.all([getAdminProducts(currentKey), getCategories()]);
      setProducts(productData);
      setCategories(categoryData);
    } catch (err) {
      setError("Clé admin invalide ou API indisponible.");
      setAdminKey("");
      localStorage.removeItem(ADMIN_KEY_STORAGE);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (adminKey) loadProducts(adminKey);
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    const trimmedKey = keyInput.trim();
    if (!trimmedKey) return;
    localStorage.setItem(ADMIN_KEY_STORAGE, trimmedKey);
    setAdminKey(trimmedKey);
    loadProducts(trimmedKey);
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKey("");
    setKeyInput("");
    setProducts([]);
    setForm(emptyProduct);
    setEditingId(null);
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleImageFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess("");
    try {
      const dataUrl = await resizeImageFile(file);
      updateForm("image_url", dataUrl);
      setSuccess("Image ajoutée. Elle sera enregistrée avec le produit.");
    } catch (err) {
      setError("Impossible d'ajouter cette image. Essayez une image JPG, PNG ou WebP.");
    } finally {
      event.target.value = "";
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      price: String(product.price),
      image_url: product.image_url,
      in_stock: product.in_stock,
      featured: product.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyProduct);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      slug: form.slug.trim() || null,
      price: Number(form.price),
    };

    try {
      if (editingId) {
        await updateAdminProduct(adminKey, editingId, payload);
        setSuccess("Produit modifié avec succès.");
      } else {
        await createAdminProduct(adminKey, payload);
        setSuccess("Produit ajouté avec succès.");
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      setError("Impossible d'enregistrer ce produit. Vérifiez les champs et la clé admin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Supprimer ${product.name} ?`)) return;
    setError("");
    setSuccess("");
    try {
      await deleteAdminProduct(adminKey, product.id);
      setSuccess("Produit supprimé.");
      if (editingId === product.id) resetForm();
      await loadProducts();
    } catch (err) {
      setError("Impossible de supprimer ce produit.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-pure-gray px-4 py-10">
        <div className="mx-auto max-w-md rounded-[1.5rem] border border-pure-line bg-white p-6 shadow-premium">
          <div className="mb-6">
            <span className="section-kicker">Administration</span>
            <h1 className="text-3xl font-semibold text-pure-black">PUREVITA Admin</h1>
            <p className="mt-3 text-sm leading-6 text-pure-ink/70">
              Connectez-vous pour gérer les produits, les prix et le stock.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold text-pure-black" htmlFor="admin-key">
              Clé admin
            </label>
            <div className="relative">
              <input
                id="admin-key"
                value={keyInput}
                onChange={(event) => setKeyInput(event.target.value)}
                type={showKey ? "text" : "password"}
                className="h-12 w-full rounded-full border border-pure-line px-4 pr-12 text-sm outline-none transition focus:border-pure-green focus:ring-4 focus:ring-pure-green/10"
                placeholder="Entrez la clé admin"
              />
              <button
                type="button"
                onClick={() => setShowKey((value) => !value)}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-pure-ink/60 hover:bg-pure-mint hover:text-pure-green"
                aria-label={showKey ? "Masquer la clé" : "Afficher la clé"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pure-gray">
      <div className="section-shell py-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-pure-line bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-sm font-semibold text-pure-green">Administration PUREVITA</span>
            <h1 className="mt-1 text-3xl font-semibold text-pure-black">Gestion des produits</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="btn-secondary">
              Voir le site
            </a>
            <button type="button" onClick={() => loadProducts()} className="btn-secondary">
              <RefreshCcw className="h-4 w-4" />
              Actualiser
            </button>
            <button type="button" onClick={handleLogout} className="btn-secondary">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Produits" value={stats.total} />
          <StatCard label="Disponibles" value={stats.inStock} />
          <StatCard label="Essentiels" value={stats.featured} />
        </div>

        {(error || success) && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold ${
              error ? "border border-red-100 bg-red-50 text-red-700" : "border border-green-100 bg-green-50 text-green-700"
            }`}
          >
            <CheckCircle2 className="h-5 w-5" />
            {error || success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[1.5rem] border border-pure-line bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-pure-black">
                  {editingId ? "Modifier le produit" : "Ajouter un produit"}
                </h2>
                <p className="mt-1 text-sm text-pure-ink/60">Les champs sont visibles directement sur le site.</p>
              </div>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-sm font-semibold text-pure-green">
                  Nouveau
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AdminInput label="Nom du produit" value={form.name} onChange={(value) => updateForm("name", value)} required />
              <AdminInput
                label="Slug"
                value={form.slug}
                onChange={(value) => updateForm("slug", value)}
                placeholder="Automatique si vide"
              />
              <label className="block">
                <span className="text-sm font-semibold text-pure-black">Catégorie</span>
                <input
                  list="admin-categories"
                  value={form.category}
                  onChange={(event) => updateForm("category", event.target.value)}
                  className="mt-2 h-12 w-full rounded-2xl border border-pure-line px-4 text-sm outline-none transition focus:border-pure-green"
                  required
                />
                <datalist id="admin-categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-pure-black">Description</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateForm("description", event.target.value)}
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-pure-line px-4 py-3 text-sm outline-none transition focus:border-pure-green"
                  required
                />
              </label>
              <AdminInput
                label="Prix MAD"
                value={form.price}
                onChange={(value) => updateForm("price", value)}
                type="number"
                min="0"
                step="1"
                required
              />
              <div>
                <span className="text-sm font-semibold text-pure-black">Image</span>
                <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-pure-line bg-pure-gray px-4 py-6 text-center transition hover:border-pure-green hover:bg-pure-mint/60">
                  <ImagePlus className="h-8 w-8 text-pure-green" />
                  <span className="mt-3 text-sm font-semibold text-pure-black">Choisir une image</span>
                  <span className="mt-1 text-xs leading-5 text-pure-ink/60">
                    JPG, PNG ou WebP. L'image est compressée automatiquement.
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageFile} className="sr-only" />
                </label>
                <details className="mt-3 rounded-2xl border border-pure-line bg-white px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-pure-green">
                    Option avancée: nom d'image ou URL
                  </summary>
                  <input
                    value={form.image_url}
                    onChange={(event) => updateForm("image_url", event.target.value)}
                    placeholder="nom-local.jpeg ou https://..."
                    className="mt-3 h-12 w-full rounded-2xl border border-pure-line px-4 text-sm outline-none transition focus:border-pure-green"
                    required
                  />
                </details>
              </div>
              <div className="overflow-hidden rounded-2xl border border-pure-line bg-pure-gray">
                <img
                  key={form.image_url || "preview"}
                  src={getProductImage(form.image_url)}
                  alt="Aperçu du produit"
                  className="h-48 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Toggle checked={form.in_stock} label="Disponible en stock" onChange={(value) => updateForm("in_stock", value)} />
                <Toggle checked={form.featured} label="Afficher en essentiel" onChange={(value) => updateForm("featured", value)} />
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:bg-pure-ink/35">
                {editingId ? <Save className="h-4 w-4" /> : <PackagePlus className="h-4 w-4" />}
                {saving ? "Enregistrement..." : editingId ? "Enregistrer les modifications" : "Ajouter le produit"}
              </button>
            </form>
          </section>

          <section className="rounded-[1.5rem] border border-pure-line bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-pure-black">Produits existants</h2>
              <div className="relative sm:w-72">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pure-ink/45" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher..."
                  className="h-11 w-full rounded-full border border-pure-line pl-10 pr-4 text-sm outline-none transition focus:border-pure-green"
                />
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="rounded-2xl bg-pure-gray p-6 text-center text-sm font-semibold text-pure-ink/65">
                  Chargement...
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-pure-line p-4">
                    <div className="flex gap-4">
                      <img
                        src={getProductImage(product.image_url)}
                        alt={product.name}
                        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-pure-mint px-3 py-1 text-xs font-semibold text-pure-green">
                            {product.category}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              product.in_stock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                            }`}
                          >
                            {product.in_stock ? "Disponible" : "Indisponible"}
                          </span>
                          {product.featured && (
                            <span className="rounded-full bg-pure-black px-3 py-1 text-xs font-semibold text-white">
                              Essentiel
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 truncate text-lg font-semibold text-pure-black">{product.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-pure-black">{priceFormatter.format(product.price)}</p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-pure-ink/65">{product.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => startEdit(product)} className="btn-secondary flex-1">
                        <Edit className="h-4 w-4" />
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-pure-line bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-pure-green">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-pure-black">{value}</p>
    </div>
  );
}

function AdminInput({ label, value, onChange, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-pure-black">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-pure-line px-4 text-sm outline-none transition focus:border-pure-green"
        {...props}
      />
    </label>
  );
}

function Toggle({ checked, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-pure-line px-4 py-3">
      <span className="text-sm font-semibold text-pure-black">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-pure-green" />
    </label>
  );
}
