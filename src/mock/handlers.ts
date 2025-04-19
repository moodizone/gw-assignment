import { http, HttpResponse } from "msw";

import { getQueryParams } from "@/utils/params";
import { getData, setData } from "@/mock/lib";
import { Product } from "@/services/type";
import { sleep } from "@/utils/sleep";

const rndDelay = () => Math.random() * 2000;

export const handlers = [
  //================================
  // GET
  //================================
  http.get("/api/product", async ({ request }) => {
    const url = new URL(request.url);
    const {
      search,
      category,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      sort,
      order,
      page,
      limit,
    } = getQueryParams(url);

    let data = getData();

    // search in title/description
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // category filter
    if (category) {
      data = data.filter((item) => item.category === category);
    }

    // rating filter
    data = data.filter(
      (item) => item.rating >= minRating && item.rating <= maxRating
    );

    // price filter
    data = data.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    // date filter
    if (startDate && endDate) {
      data = data.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
    }

    // sorting
    if (
      sort === "date" ||
      sort === "price" ||
      sort === "stock" ||
      sort === "rating"
    ) {
      data.sort((a, b) => {
        const valA = a[sort as keyof Product];
        const valB = b[sort as keyof Product];
        return order === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }

    const total = data.length;
    const paginated = data.slice((page - 1) * limit, page * limit);

    await sleep(rndDelay());
    return HttpResponse.json({ data: paginated, total });
  }),

  //================================
  // POSt
  //================================
  http.post("/api/product", async ({ request }) => {
    const newItem = (await request.json()) as Omit<Product, "id">;
    const data = getData();
    const id = Math.max(...data.map((i) => i.id)) + 1;

    const item: Product = {
      id,
      title: newItem.title,
      category: newItem.category,
      date: new Date().toISOString(),
      price: newItem.price,
      description: newItem.description || "",
      stock: newItem.stock,
      rating: newItem.rating,
    };

    setData([...data, item]);
    return HttpResponse.json(item);
  }),

  //================================
  // PATCH
  //================================
  http.put("/api/product/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const updated = (await request.json()) as Partial<Product>;
    const data = getData();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1)
      return HttpResponse.json({ error: "Not found" }, { status: 404 });

    data[index] = { ...data[index], ...updated };
    setData(data);

    return HttpResponse.json(data[index]);
  }),

  //================================
  // DELETE
  //================================
  http.delete("/api/product/:id", ({ params }) => {
    const id = Number(params.id);
    const filtered = getData().filter((i) => i.id !== id);
    setData(filtered);
    return HttpResponse.json({ success: true });
  }),
];
