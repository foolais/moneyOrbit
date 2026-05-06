"use client";

import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { se } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TableSummary = () => {
  const searchParams = useSearchParams();

  const searchUrl = searchParams.get("search") || "";
  const typeUrl = searchParams.get("type") || "all";
  const styleUrl = searchParams.get("style") || "all";
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");

  const [isFetching, setIsFetching] = useState(false);
  const [transactions, setTransactions] = useState({
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsFetching(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("You must be logged in to view transactions");
          return;
        }
        let query = supabase
          .from("transactions")
          .select("type, amount", { count: "exact" })
          .eq("user_id", user?.id);

        if (searchUrl) {
          query.or(
            `activity.ilike.%${searchUrl}%,merchant.ilike.%${searchUrl}%`,
          );
        }
        if (typeUrl !== "all") query = query.eq("type", typeUrl);
        if (styleUrl !== "all") query = query.eq("style", styleUrl);
        if (fromUrl) query = query.gte("date", fromUrl);
        if (toUrl) query = query.lte("date", toUrl);

        const { data, error } = await query.order("date", {
          ascending: false,
        });

        if (error) throw error;

        const income = data.reduce((acc, transaction) => {
          if (transaction.type === "income") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0);

        const expense = data.reduce((acc, transaction) => {
          if (transaction.type === "expense") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0);

        setTransactions({ income, expense });
      } catch (error) {
        console.log("error fetching table summary", error);
        setTransactions({ income: 0, expense: 0 });
        setIsFetching(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();
  }, [searchUrl, typeUrl, styleUrl, fromUrl, toUrl]);

  return (
    <div className="mt-4">
      {isFetching ? (
        <div className="animate-pulse rounded-xl">
          <div className="w-full bg-green-100 p-6" />
          <div className="w-full bg-red-100 p-6" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-t-xl bg-green-100">
            <p className="px-4 py-2">total earning</p>
            <p className="px-4 py-2">{formatPrice(transactions.income)}</p>
          </div>
          <div className="flex items-center justify-between rounded-b-xl bg-red-100">
            <p className="px-4 py-2">total spending</p>
            <p className="px-4 py-2">{formatPrice(transactions.expense)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TableSummary;
