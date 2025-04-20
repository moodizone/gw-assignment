"use client";
import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/services/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/product";

interface Props {
  id: Product["id"];
}

export function RowAction({ id }: Props) {
  //================================
  // Init
  //================================
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  //================================
  // Handlers
  //================================
  const { isPending, mutateAsync } = useMutation({
    async mutationFn() {
      return deleteProduct(id);
    },
    onSuccess() {
      // invalidate the "products" query (out of sync)
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  async function onDelete() {
    await mutateAsync();
    setOpen(false);
    toast("Product deleted successfully", {
      description: `${new Date().toLocaleTimeString()}`,
    });
  }

  //================================
  // Render
  //================================
  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => navigate(`/product/${id}`)}>
            {"Details"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/product/edit/${id}`)}>
            {"Update"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setOpen(true)}>
            {"Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={open}
        onOpenChange={() => {
          if (!isPending) {
            setOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{"Warning!"}</DialogTitle>
            <DialogDescription>
              {
                "Are you sure you want to delete this product? This action cannot be undone."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              className="min-w-[100px]"
              onClick={onDelete}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
