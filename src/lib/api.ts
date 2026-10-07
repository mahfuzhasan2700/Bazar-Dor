import { Category, Product } from "@/types";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch {
    // Fallback to secondary API
    const fallbackRes = await fetch(`${BASE_URL_2}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!fallbackRes.ok) {
      throw new Error(`API fetch failed on both endpoints for ${endpoint}`);
    }
    return await fallbackRes.json();
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchFromApi<Category[]>("/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>("/products");
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  try {
    // If it's numeric, directly fetch /products/:id
    if (!isNaN(Number(idOrSlug))) {
      return await fetchFromApi<Product>(`/products/${idOrSlug}`);
    }
    // If it's a slug, find from products list
    const all = await getAllProducts();
    const found = all.find((p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug));
    return found || null;
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    return null;
  }
}
