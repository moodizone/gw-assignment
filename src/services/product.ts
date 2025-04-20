import { appFetch } from "@/utils/fetch";
import { Product } from "@/services/type";

export function getProducts(query: string) {
  const base = "/api/product";
  const newURL = query ? `${base}?${query}` : base;
  return appFetch<{ data: Product[]; total: number }>(newURL);
}

export function createProduct(item: Omit<Product, "id" | "date">) {
  return appFetch<Product>("/api/product", {
    method: "PATCH",
    body: JSON.stringify(item),
  });
}

export function updateProduct(id: number, item: Partial<Product>) {
  return appFetch<Product>(`/api/product/${id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
  });
}

export function deleteProduct(id: number) {
  return appFetch<{ success: true }>(`/api/product/${id}`, {
    method: "DELETE",
  });
}
