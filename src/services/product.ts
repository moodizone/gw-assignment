import { appFetch } from "@/utils/fetch";
import { Product } from "@/services/type";

export function getProducts(query: string) {
  const base = "/api/product";
  const newURL = query ? `${base}?${query}` : base;
  return appFetch<{ data: Product[]; total: number }>(newURL);
}
export function getProductById(id: number) {
  return appFetch<Product>(`/api/product/${id}`, {
    method: "GET",
  });
}
export function createProduct(product: Omit<Product, "id" | "date">) {
  return appFetch<Product>("/api/product", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateProduct(id: number, product: Partial<Product>) {
  return appFetch<Product>(`/api/product/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id: number) {
  return appFetch<{ success: true }>(`/api/product/${id}`, {
    method: "DELETE",
  });
}
