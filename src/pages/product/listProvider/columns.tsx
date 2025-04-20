import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/services/type";
import { ColumnHeader } from "@/pages/product/listProvider/columnHeader";
import { RowAction } from "./rowAction";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div>
          <div className="max-w-[420px] truncate font-medium">
            {row.getValue("title")}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.description}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <div>
        <Badge variant="outline">{row.getValue("category")}</Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => formatUserFriendlyDateTime(row.getValue("date")),
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <ColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("stock")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <ColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("rating")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction id={row.original.id} />,
  },
];

function formatUserFriendlyDateTime(date: string) {
  const safeDate = new Date(date);
  const datePart = safeDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timePart = safeDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="text-center">
      <div>{datePart}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{timePart}</div>
    </div>
  );
}
