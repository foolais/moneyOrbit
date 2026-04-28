"use client";

import AstronoutBagMoney from "@/public/astronout-bag-money.webp";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const WealthAnalytic = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [wealthData, setWealthData] = useState({
    income: 0,
    expense: 0,
  });

  const netWorth = useMemo(
    () => wealthData.income - wealthData.expense,
    [wealthData],
  );

  useEffect(() => {
    const fetchWealthData = async () => {
      try {
        setIsFetching(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: transactions, error } = await supabase
          .from("transactions")
          .select("amount, type")
          .eq("user_id", user?.id);

        if (error) throw error;

        const totals = transactions.reduce(
          (acc, curr) => {
            if (curr.type === "income") acc.income += curr.amount;
            if (curr.type === "expense") acc.expense += curr.amount;
            return acc;
          },
          { income: 0, expense: 0 },
        );

        setWealthData(totals);
      } catch (error) {
        console.log("error fetching wealth data", error);
        setWealthData({ income: 0, expense: 0 });
        setIsFetching(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchWealthData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" className="rounded-xl" size="sm">
          wealth analysis
        </Button>
      </div>
      {isFetching ? (
        <div className="bg-card animate-pulse rounded-xl p-4">
          <div className="mb-4 flex items-center gap-4">
            <div className="bg-muted relative flex h-16 w-16 items-center justify-center rounded-full" />
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-sm">net worth</span>
              <div className="bg-muted h-6 w-60 animate-pulse rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t pt-2">
            <div>
              <p className="text-muted-foreground text-xs">income</p>
              <p className="bg-muted h-4 w-36 animate-pulse rounded"></p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">expense</p>
              <p className="bg-muted h-4 w-36 animate-pulse rounded"></p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="rounded-2xl py-0 shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-4">
              <div className="bg-secondary relative flex h-16 w-16 items-center justify-center rounded-full">
                <Image
                  src={AstronoutBagMoney}
                  alt="wealth"
                  fill
                  sizes="auto"
                  loading="eager"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">net worth</span>
                <div className="flex items-center gap-1">
                  <h2 className="text-secondary text-2xl font-bold">
                    {formatPrice(netWorth)}
                  </h2>
                  <Sparkles className="text-secondary size-5" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t pt-2">
              <div>
                <p className="text-muted-foreground text-xs">income</p>
                <p className="font-semibold text-green-500">
                  {formatPrice(wealthData.income)}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">expense</p>
                <p className="font-semibold text-red-500">
                  {formatPrice(wealthData.expense)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WealthAnalytic;
