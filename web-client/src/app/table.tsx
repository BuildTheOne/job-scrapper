"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function JobTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const totalPage = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const paginationSize = table.getState().pagination.pageSize;
  const currentPage =
    totalPage === 0 ? 0 : table.getState().pagination.pageIndex + 1;
  const currentStartRow =
    totalPage === 0 ? "0" : currentPage * paginationSize - (paginationSize - 1);
  const currentLastRow =
    currentPage * paginationSize > totalRows
      ? totalRows
      : currentPage * paginationSize;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <Select
          onValueChange={(e) => {
            table.setPageSize(Number.parseInt(e));
          }}
          defaultValue={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className="md:w-36">
            <SelectValue placeholder={10} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50].map((i) => (
              <SelectItem key={i} value={i.toString()}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Cari..."
          className="md:w-64"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-8 md:w-16"></TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  <TableCell>
                    <div className="text-center">{row.index + 1}</div>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center md:justify-between items-center">
        <div className="hidden md:block">
          <span className="">
            Menampilkan {currentStartRow} - {currentLastRow} dari {totalRows}{" "}
            item
          </span>
        </div>

        <div className="hidden md:flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="text-2xl">&#8249;</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
          >
            <span>1</span>
          </Button>

          {totalPage > 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentPage < 4) {
                  table.setPageIndex(1);
                }
              }}
            >
              {totalPage < 6 ? "2" : currentPage < 4 ? "2" : "..."}
            </Button>
          )}

          {totalPage > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentPage < 4) {
                  table.setPageIndex(2);
                } else if (currentPage > totalPage - 3) {
                  table.setPageIndex(totalPage - 3);
                }
              }}
            >
              <span>
                {totalPage <= 5
                  ? "3"
                  : currentPage <= 3
                    ? "3"
                    : currentPage > totalPage - 3
                      ? totalPage - 2
                      : currentPage}
              </span>
            </Button>
          )}

          {totalPage > 4 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentPage > totalPage - 3) {
                  table.setPageIndex(totalPage - 2);
                }
              }}
            >
              {totalPage <= 5
                ? "4"
                : currentPage > totalPage - 3
                  ? totalPage - 1
                  : "..."}
            </Button>
          )}

          {totalPage > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(totalPage - 1)}
            >
              {totalPage}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="text-2xl">&#8250;</span>
          </Button>
        </div>

        <div className="flex md:hidden items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="text-2xl">&#171;</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="text-2xl">&#8249;</span>
          </Button>
          <Button variant="outline" size="sm">
            {currentPage} dari {totalPage}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="text-2xl">&#8250;</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(totalPage - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="text-2xl">&#187;</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobTable;
