import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EditProduct from "@/pages/product/edit";
import CreateProduct from "@/pages/product/create";
import ProductDetails from "@/pages/product/details";
import ProductList from "@/pages/product";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/product"} />} />
        <Route path="/product" element={<ProductList />}>
          <Route path=":id" element={<ProductDetails />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
