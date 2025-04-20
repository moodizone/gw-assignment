"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/services/type";

interface Props {
  id: Product["id"];
}

export function RowAction({ id }: Props) {
  const navigate = useNavigate();

  return (
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
        <DropdownMenuItem variant="destructive">{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
