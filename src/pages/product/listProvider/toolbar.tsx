"use client";
import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Plus, Star } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, OptionType } from "@/pages/product/listProvider/filters";
import { ViewOptions } from "@/pages/product/listProvider/viewOptions";
import { CategoryEnum, Product } from "@/services/type";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  table: Table<Product>;
}

export const categories: OptionType[] = [
  {
    label: CategoryEnum.Books,
    value: CategoryEnum.Books,
  },
  {
    label: CategoryEnum.Electronics,
    value: CategoryEnum.Electronics,
  },
  {
    label: CategoryEnum.Clothing,
    value: CategoryEnum.Clothing,
  },
  {
    label: CategoryEnum.Home,
    value: CategoryEnum.Home,
  },
  {
    label: CategoryEnum.Sports,
    value: CategoryEnum.Sports,
  },
];
const ratings: OptionType[] = new Array(5).fill(1).map((_, index) => {
  const label = (
    <div className="flex flex-nowrap gap-x-1">
      {new Array(index + 1).fill(1).map((_, ii) => (
        <Star key={ii} />
      ))}
    </div>
  );
  return { label, value: `${index + 1}` };
});

export function Toolbar({ table }: Props) {
  const filters = table.getState().columnFilters;
  // need to check value since all filters are registered
  // irrespective to their own value
  const isFiltered = React.useMemo(() => {
    return filters.some((filter) => {
      const { value } = filter;
      if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "string") {
        return Boolean(value);
      } else if (typeof value === "number") {
        return !isNaN(value);
      } else if (value && typeof value === "object") {
        return Object.keys(value).length > 0;
      }
      return false;
    });
  }, [filters]);

  return (
    <div className="flex items-start md:items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <Filter
            column={table.getColumn("category")}
            title="Category"
            options={categories}
          />
        )}
        {table.getColumn("rating") && (
          <Filter
            column={table.getColumn("rating")}
            title="Rating"
            options={ratings}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {"Reset"}
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <ViewOptions table={table} />
      <Link
        className={cn(buttonVariants({ variant: "default" }), "h-[32px] ml-2")}
        to="/product/create"
      >
        <Plus />
      </Link>
    </div>
  );
}
