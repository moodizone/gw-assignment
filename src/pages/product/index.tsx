import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ListProvider from "@/pages/product/listProvider";
import Fallback from "@/pages/product/fallback";
import { Drawer } from "@/components/ui/drawer";
import ProductForm from "@/pages/product/form";

export default function ProductList() {
  //================================
  // Init
  //================================
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isDrawerOpen = pathname !== "/product";
  const mode = React.useMemo(() => {
    if (!isDrawerOpen) return null;

    if (pathname === `/product/${id}`) return "details";
    if (pathname === `/product/edit/${id}`) return "edit";
    if (pathname === `/product/create`) return "create";

    return null;
  }, [pathname, id, isDrawerOpen]);

  //================================
  // Render
  //================================
  return (
    <div className=" h-full flex-1 flex-col space-y-4 p-4 md:p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {"Product list"}
          </h2>
          <p className="text-muted-foreground">
            {
              "Browse through the available products and manage your inventory efficiently."
            }
          </p>
        </div>
      </div>
      <React.Suspense fallback={<Fallback />}>
        <ListProvider />
      </React.Suspense>
      <Drawer
        direction="right"
        open={isDrawerOpen}
        onOpenChange={() => {
          navigate("/product");
        }}
      >
        <ProductForm mode={mode} />
      </Drawer>
    </div>
  );
}
