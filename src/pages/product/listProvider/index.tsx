import * as React from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "@/services/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "@/pages/product/listProvider/columns";
import { Toolbar } from "@/pages/product/listProvider/toolbar";
import { Pagination } from "@/pages/product/listProvider/pagination";
import { Mask } from "@/components/mask";
import { CategoryEnum } from "@/services/type";

function ListProvider() {
  //================================
  // Init
  //================================
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const spRef = React.useRef(searchParams.toString());
  const stringifySP = searchParams.toString();
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["products"],
    async queryFn() {
      return getProducts(searchParams.toString());
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const pageIndex = parseInt(searchParams.get("page") || "1", 10) - 1;
  const rowCount = data?.total || 0;
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const sort = searchParams.get("sort") || "date";
  const order = searchParams.get("order") || "asc";
  const categories = searchParams.getAll("category");
  const search = searchParams.get("search");
  const rating = searchParams.get("maxRating");
  const columnFilters = [
    // multi-select filter
    { id: "category", value: categories },
    // single filters
    { id: "rating", value: rating },
    { id: "title", value: search },
  ];
  const table = useReactTable({
    data: data?.data,
    columns,
    state: {
      columnVisibility,
      pagination: {
        pageSize,
        pageIndex,
      },
      columnFilters,
      sorting: [{ id: sort, desc: order === "desc" }],
    },
    onPaginationChange(updater) {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: pageIndex, pageSize })
          : updater;

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", (newPagination.pageIndex + 1).toString());
        params.set("pageSize", newPagination.pageSize.toString());
        return params;
      });
    },
    onSortingChange(updater) {
      const newSort =
        typeof updater === "function"
          ? updater([{ id: sort, desc: order === "desc" }])
          : updater;

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", newSort[0].id);
        params.set("order", newSort[0].desc ? "desc" : "asc");
        return params;
      });
    },
    onColumnFiltersChange(updater) {
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("category");
        params.delete("maxRating");
        params.delete("search");

        newFilters.forEach((filter) => {
          if (filter.id === "category") {
            const values = filter.value as CategoryEnum[];
            values.forEach((v) => {
              params.append("category", v);
            });
          }

          if (filter.id === "rating") {
            const values = filter.value as number[];
            params.set("maxRating", `${values[values.length - 1]}`);
          }

          if (filter.id === "title") {
            const value = filter.value as string;
            params.set("search", value);
          }
        });

        return params;
      });
    },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount,
  });

  //================================
  // Handlers
  //================================
  React.useEffect(() => {
    // console.log(111, stringifySP);
    if (spRef.current !== stringifySP) {
      spRef.current = stringifySP;
      qc.invalidateQueries({
        queryKey: ["products"],
      });
    }
  }, [stringifySP, qc]);

  //================================
  // Render
  //================================
  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <div className="rounded-md border p-2 relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {"No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Mask show={isFetching} blur />
      </div>
      <Pagination table={table} />
    </div>
  );
}

export default ListProvider;
