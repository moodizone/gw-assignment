import * as React from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/services/type";
import { productSchema } from "@/validation/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/pages/product/listProvider/toolbar";

interface Props {
  mode: string | null;
  product?: Product;
}
type ProductFormValues = z.infer<typeof productSchema>;

function ProductForm({ mode, product }: Props) {
  //================================
  // Init
  //================================
  const isReadOnly = mode === "details";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      title: "",
      category: "",
      price: 0,
      description: "",
      stock: 0,
    },
  });

  //================================
  // Handlers
  //================================
  function onSubmit(data: ProductFormValues) {
    if (isCreateMode) {
      console.log("Creating product:", data);
      // Add your create logic here
    } else if (isEditMode) {
      console.log("Updating product:", data);
      // Add your update logic here
    }
  }

  //================================
  // Render
  //================================
  return (
    <React.Fragment>
      <div className="p-4 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Title"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="title"
                      readOnly={isReadOnly}
                      placeholder="Enter product title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem id="category">
                  <FormLabel>{"Category"}</FormLabel>
                  <Select
                    disabled={isReadOnly}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Price"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      readOnly={isReadOnly}
                      placeholder="Enter product price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Stock"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="stock"
                      type="number"
                      readOnly={isReadOnly}
                      placeholder="Enter product stock"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Rating"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="rating"
                      type="number"
                      readOnly={isReadOnly}
                      placeholder="Enter product rate"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Description"}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      readOnly={isReadOnly}
                      placeholder="Enter product description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <DrawerFooter>
        {!isReadOnly && (
          <Button type="submit">
            {isCreateMode ? "Create Product" : "Update Product"}
          </Button>
        )}
        <Link
          to="/product"
          className={buttonVariants({
            variant: !isReadOnly ? "ghost" : "default",
          })}
        >
          {"Back to list"}
        </Link>
      </DrawerFooter>
    </React.Fragment>
  );
}

export default ProductForm;
