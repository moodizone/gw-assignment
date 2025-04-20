import { useNavigate } from "react-router-dom";

import { Drawer } from "@/components/ui/drawer";
import FormProvider from "@/pages/product/formProvider";

function FormDrawer() {
  const navigate = useNavigate();

  return (
    <Drawer
      direction="right"
      open
      onOpenChange={() => {
        navigate("/product");
      }}
    >
      <FormProvider />
    </Drawer>
  );
}

export default FormDrawer;
