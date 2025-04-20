export enum CategoryEnum {
  Electronics = "Electronics",
  Books = "Books",
  Clothing = "Clothing",
  Sports = "Sports",
  Home = "Home",
}
export interface Product {
  id: number;
  title: string;
  category: CategoryEnum;
  date: string; // ISO format
  price: number;
  description?: string;
  stock: number;
  rating: number;
}
