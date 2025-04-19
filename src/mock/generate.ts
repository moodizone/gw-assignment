import { Product } from "@/services/type";

import { faker } from "@faker-js/faker";

export function generateItems(count = 10_000): Product[] {
  const categories = ["Electronics", "Books", "Clothing", "Sports", "Home"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    category: faker.helpers.arrayElement(categories),
    date: faker.date
      .between({ from: "2022-01-01", to: "2024-12-31" })
      .toISOString(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 0, max: 500 }),
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
  }));
}
