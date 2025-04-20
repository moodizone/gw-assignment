import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  rating: z.number().min(0, "Rating is required").max(5),
  stock: z.number().int().positive("Stock must be a positive integer"),
});
