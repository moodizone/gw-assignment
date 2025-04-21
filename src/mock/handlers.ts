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
      categories,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      sort,
      order,
      page,
      pageSize,
    } = getQueryParams(url);

    let data = getData();

    // search in title/description
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    // category filter
    if (categories.length > 0) {
      data = data.filter((item) => categories.includes(item.category));
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
        return order === "asc"
          ? valA! > valB!
            ? 1
            : -1
          : valA! < valB!
          ? 1
          : -1;
      });
    }

    const total = data.length;
    const paginated = data.slice((page - 1) * pageSize, page * pageSize);

    await sleep(rndDelay());
    return HttpResponse.json({ data: paginated, total });
  }),
  http.get("/api/product/:id", async ({ params }) => {
    const id = Number(params.id);
    const data = getData();
    const product = data.find((item) => item.id === id);

    if (!product) {
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await sleep(rndDelay());
    return HttpResponse.json(product);
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

    setData([item, ...data]);
    await sleep(rndDelay());
    return HttpResponse.json(item);
  }),

  //================================
  // PATCH
  //================================
  http.patch("/api/product/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const updated = (await request.json()) as Partial<Product>;
    const data = getData();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1)
      return HttpResponse.json({ error: "Not found" }, { status: 404 });

    data[index] = { ...data[index], ...updated };
    setData(data);
    await sleep(rndDelay());
    return HttpResponse.json(data[index]);
  }),

  //================================
  // DELETE
  //================================
  http.delete("/api/product/:id", async ({ params }) => {
    const id = Number(params.id);
    const filtered = getData().filter((i) => i.id !== id);
    setData(filtered);
    await sleep(rndDelay());
    return HttpResponse.json({ success: true });
  }),
];
