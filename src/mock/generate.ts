import { Item } from "@/services/type";

// @ts-expect-error package discontinued
import { fa, Faker } from "@faker-js/faker";

export const faker = new Faker({
  locale: [fa],
});

export function generateItems(count = 10_000): Item[] {
  const categories = ["Electronics", "Books", "Clothing", "Sports", "Home"];
return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    category: faker.helpers.arrayElement(categories),
    date: faker.date
        .between({ from: "2022-01-01", to: "2024-12-31" })
        .toISOString(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    description: faker.lorem.sentence(),
    stock: faker.number.int({ min: 0, max: 500 }),
    rating: parseFloat(faker.number.float({ min: 1, max: 5, precision: 0.1 }).toFixed(1)),
}));
}