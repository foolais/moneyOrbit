"use client";

import {
  dummyDataTransaction,
  ITEMS_PER_PAGE,
  styleTransactionConfig,
} from "@/lib/data";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatPrice, getPagination } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import DialogFormTransaction from "./dialog-form-transaction";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TableTransaction = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageFromUrl = +(searchParams.get("page") || 1);

  const [page, setPage] = useState(pageFromUrl);

  const totalPages = Math.ceil(dummyDataTransaction.length / ITEMS_PER_PAGE);
  const pages = getPagination(page, totalPages);

  const isShowMd = "hidden md:table-cell";
  const isShowLg = "hidden lg:table-cell";

  const pageRef = useRef(pageFromUrl);

  const paginatedData = dummyDataTransaction.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage: number | "next" | "previous") => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage === "next") {
      params.set("page", (page + 1).toString());
    } else if (newPage === "previous") {
      params.set("page", (page - 1).toString());
    } else {
      params.set("page", newPage.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (pageRef.current !== pageFromUrl) {
      setPage(pageFromUrl);
      pageRef.current = pageFromUrl;
    }
  }, [pageFromUrl]);

  return (
    <div className="w-full">
      <Button variant="secondary" className="rounded-xl" size="sm">
        table transaction
      </Button>
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">no</TableHead>
            <TableHead>date</TableHead>
            <TableHead>activity</TableHead>
            <TableHead className={isShowMd}>amount</TableHead>
            <TableHead className={isShowMd}>merchant</TableHead>
            <TableHead>type</TableHead>
            <TableHead className={isShowLg}>style</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <DialogFormTransaction
              key={(page - 1) * ITEMS_PER_PAGE + index + 1}
              mode="edit"
              initialData={item}
              trigger={
                <TableRow
                  className={`${styleTransactionConfig[item.style].bgColor} hover:${styleTransactionConfig[item.style].textColor.replace("text", "bg")} cursor-pointer`}
                >
                  <TableCell>
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell>{format(item.date, "dd MMM yyyy")}</TableCell>
                  <TableCell className="truncate">{item.activity}</TableCell>
                  <TableCell className={isShowMd}>
                    {formatPrice(item.amount)}
                  </TableCell>
                  <TableCell className={isShowMd}>{item.merchant}</TableCell>
                  <TableCell className="p-0">
                    <span
                      className={`${
                        item.type === "income" ? "bg-green-500" : "bg-red-500"
                      } py-.5 rounded-md px-2 text-white`}
                    >
                      {item.type}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`${isShowLg} items-center gap-1 lg:flex`}
                  >
                    <Image
                      src={styleTransactionConfig[item.style].image}
                      alt={item.style}
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                    {item.style}
                  </TableCell>
                </TableRow>
              }
            />
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              className={
                page === 1
                  ? "pointer-events-none text-white opacity-50"
                  : "cursor-pointer text-white"
              }
            />
          </PaginationItem>
          {pages.map((p, i) => {
            if (p === "...") {
              return (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => handlePageChange(+p)}
                  className={`cursor-pointer ${
                    page === p
                      ? "bg-secondary text-secondary-foreground"
                      : "text-white"
                  }`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer text-white"
            }
          >
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableTransaction;
