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
import { format, isValid, parse } from "date-fns";
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
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { ITransaction } from "@/lib/type";

const TableTransaction = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = +(searchParams.get("page") || 1);
  const searchUrl = searchParams.get("search") || "";
  const typeUrl = searchParams.get("type") || "all";
  const styleUrl = searchParams.get("style") || "all";
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);
  const pages = getPagination(page, totalPages);

  const isShowMd = "hidden md:table-cell";
  const isShowLg = "hidden lg:table-cell";

  const fetchTransactions = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) toast.error("You must be logged in to view transactions");

      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("transactions")
        .select("*", { count: "exact" })

        .eq("user_id", user?.id);

      if (searchUrl) {
        query.or(`activity.ilike.%${searchUrl}%,merchant.ilike.%${searchUrl}%`);
      }
      if (typeUrl !== "all") query = query.eq("type", typeUrl);
      if (styleUrl !== "all") query = query.eq("style", styleUrl);
      if (fromUrl) query = query.gte("date", fromUrl);
      if (toUrl) query = query.lte("date", toUrl);

      const { data, count, error } = await query
        .order("date", {
          ascending: false,
        })
        .range(from, to);

      if (error) throw error;

      setTransactions(data as ITransaction[]);
      setTotalData(count || 0);
    } catch (error) {
      console.log("error fetching transaction", error);
    }
  };

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
    let isMounted = true;
    const load = async () => {
      setIsFetching(true);
      await fetchTransactions();
      if (isMounted) setIsFetching(false);
    };
    load();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchUrl, typeUrl, styleUrl, fromUrl, toUrl]);

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
          {transactions.map((item, index) => (
            <DialogFormTransaction
              key={(page - 1) * ITEMS_PER_PAGE + index + 1}
              mode="edit"
              transactionId={item.id}
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
                ? "pointer-events-none text-white opacity-50"
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
