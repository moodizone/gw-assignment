import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ProductForm from "@/pages/product/formProvider/form";
import { getProductById } from "@/services/product";
import Fallback from "@/pages/product/formProvider/fallback";
import ErrorBoundaryProvider from "@/components/errorBoundary";

interface LoaderProps {
  mode: string | null;
  id?: string;
}

function ProductLoader({ mode, id }: LoaderProps) {
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", id],
    async queryFn() {
      return getProductById(Number(id));
    },
    retry: 0,
  });

  return <ProductForm mode={mode} product={product} />;
}

function FormProvider() {
  //================================
  // Init
  //================================
  const { id } = useParams();
  const { pathname } = useLocation();
  const mode = React.useMemo(() => {
    if (pathname === `/product/${id}`) return "details";
    if (pathname === `/product/edit/${id}`) return "edit";
    if (pathname === `/product/create`) return "create";

    return null;
  }, [pathname, id]);
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  //================================
  // Subcomponents
  //================================
  const title = isCreateMode
    ? "Create New Product"
    : isEditMode
    ? "Edit Product"
    : "Product Details";
  const description = isCreateMode
    ? "Fill out the form below to create a new product."
    : isEditMode
    ? "Update the product details below."
    : "View the product details below.";

  //================================
  // Render
  //================================
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>

      {mode === "create" ? <ProductForm mode={mode} /> : null}
      {mode === "edit" || mode === "details" ? (
        <ErrorBoundaryProvider>
          <React.Suspense fallback={<Fallback />}>
            <ProductLoader id={id} mode={mode} />
          </React.Suspense>
        </ErrorBoundaryProvider>
      ) : null}
    </DrawerContent>
  );
}

export default FormProvider;
