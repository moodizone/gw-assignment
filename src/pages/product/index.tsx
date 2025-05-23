import * as React from "react";
import { Outlet } from "react-router-dom";

import ListProvider from "@/pages/product/listProvider";
import Fallback from "@/pages/product/fallback";
import ErrorBoundaryProvider from "@/components/errorBoundary";

export default function ProductList() {
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
      <ErrorBoundaryProvider>
        <React.Suspense fallback={<Fallback />}>
          <ListProvider />
        </React.Suspense>
      </ErrorBoundaryProvider>
      <Outlet />
    </div>
  );
}
