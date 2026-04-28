"use client";

import { styleTransactionConfig } from "@/lib/data";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface IStyleTransactionData {
  travel: number;
  gaming: number;
  foodie: number;
  coffee: number;
  entertainment: number;
  shopping: number;
  salary: number;
  other: number;
}

const SidebarAnalytic = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [styleTransactionData, setStyleTransactionData] = useState({
    travel: 0,
    gaming: 0,
    foodie: 0,
    coffee: 0,
    entertainment: 0,
    shopping: 0,
    salary: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchStyleTransactionData = async () => {
      try {
        setIsFetching(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: transactions, error } = await supabase
          .from("transactions")
          .select("amount, style")
          .eq("user_id", user?.id);
        if (error) throw error;

        const totals = transactions.reduce(
          (
            acc: IStyleTransactionData,
            curr: { style: keyof IStyleTransactionData; amount: number },
          ) => {
            acc[curr.style] = (acc[curr.style] || 0) + curr.amount;
            return acc;
          },
          { ...styleTransactionData },
        );

        setStyleTransactionData(totals);
        setIsFetching(false);
      } catch (error) {
        console.log("error fetching wealth data", error);
        setIsFetching(false);
      }
    };

    fetchStyleTransactionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        spending style
      </Button>
      {isFetching ? (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`bg-card flex animate-pulse items-center justify-between px-4 py-2 ${index === 0 && "rounded-tl-xl rounded-tr-xl"} ${index === 7 && "rounded-br-xl rounded-bl-xl"}`}
            >
              <div className="flex items-center gap-2">
                <div className="bg-muted h-10 w-10 rounded-full" />
                <div className="bg-muted h-5 w-20 rounded" />
              </div>
              <div className="bg-muted h-5 w-32 rounded" />
            </div>
          ))}
        </>
      ) : (
        <Card className="p-0">
          <CardContent className="p-0">
            {Object.entries(styleTransactionData).map(([style, amount]) => {
              const styleKey = style as keyof IStyleTransactionData;
              const config = styleTransactionConfig[styleKey];

              return (
                <div
                  className={`flex items-center justify-between px-2 transition-all duration-300 hover:scale-105 ${config.bgColor}`}
                  key={style}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={config.image}
                      alt={style}
                      width={50}
                      height={50}
                    />
                    <span
                      className={`justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold ${config.textColor} ${config.bgColor}`}
                    >
                      {style}
                    </span>
                  </div>
                  <p className="font-bold">{formatPrice(amount)}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default SidebarAnalytic;
