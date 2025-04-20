import { CategoryEnum } from "@/services/type";
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.nativeEnum(CategoryEnum, {
    required_error: "Category is required",
  }),
  description: z.string().optional(),
  price: z.number().nonnegative("Price must be a non-negative number"),
  rating: z.number().min(0, "Rating is required").max(5),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});
