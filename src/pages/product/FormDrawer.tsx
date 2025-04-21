import { useNavigate, useSearchParams } from "react-router-dom";

import { Drawer } from "@/components/ui/drawer";
import FormProvider from "@/pages/product/formProvider";

function FormDrawer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Drawer
      direction="right"
      open
      onOpenChange={() => {
        navigate(`/product?${searchParams.toString()}`);
      }}
    >
      <FormProvider />
    </Drawer>
  );
}

export default FormDrawer;
