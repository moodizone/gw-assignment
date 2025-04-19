import { Product } from "@/services/type";
import { generateItems } from "./generate";

const STORAGE_KEY = "gw_mock_items";

function seedData(): Product[] {
  const data = generateItems();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function getData(): Product[] {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json) return JSON.parse(json);
  return seedData();
}

function setData(data: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export { seedData, getData, setData };
