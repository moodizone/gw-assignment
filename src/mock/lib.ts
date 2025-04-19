import { Item } from "@/services/type";
import { generateItems } from "./generate";

const STORAGE_KEY = "gw_mock_items";

function seedData(): Item[] {
  const data = generateItems();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function getData(): Item[] {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json) return JSON.parse(json);
  return seedData();
}

function setData(data: Item[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export { seedData, getData, setData };
