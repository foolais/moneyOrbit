"use client";

import { IFilterAnalytic } from "@/lib/type";
import { useState } from "react";
import AstronoutBagMoney from "@/public/astronout-bag-money.webp";
import AstronoutSquat from "@/public/astronout-squat-money.webp";
import AstronoutMoney from "@/public/astronout-money.webp";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const WealthAnalytic = () => {
  const [filter, setFilter] = useState<IFilterAnalytic>("all");

  const data = {
    income: 15000000,
    expense: 8000000,
  };

  const net = data.income - data.expense;

  const currentValue =
    filter === "income"
      ? data.income
      : filter === "expense"
        ? data.expense
        : net;

  const wealthImage =
    filter === "income"
      ? AstronoutSquat
      : filter === "expense"
        ? AstronoutMoney
        : AstronoutBagMoney;

  const colorMap = {
    income: "text-green-500",
    expense: "text-red-500",
    all: "text-secondary",
  };

  const bgMap = {
    income: "bg-green-100",
    expense: "bg-red-100",
    all: "bg-secondary",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" className="rounded-xl" size="sm">
          wealth analysis
        </Button>
        <div className="bg-card flex items-center rounded-full p-1">
          {["all", "income", "expense"].map((value) => (
            <Button
              key={value}
              variant={filter === value ? "default" : "ghost"}
              size="sm"
              className="rounded-full capitalize"
              onClick={() => setFilter(value as IFilterAnalytic)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
      <Card className="rounded-2xl shadow-md transition-all duration-300 hover:scale-105">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-4">
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-full ${bgMap[filter]}`}
            >
              <Image
                src={wealthImage}
                alt="wealth"
                fill
                sizes="auto"
                loading="eager"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                {filter === "all" ? "net wealth" : filter}
              </span>
              <div className="flex items-center gap-1">
                <h2 className={`text-2xl font-bold ${colorMap[filter]}`}>
                  {formatPrice(currentValue)}
                </h2>
                <Sparkles className={`size-5 ${colorMap[filter]}`} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t pt-2">
            <div>
              <p className="text-muted-foreground text-xs">income</p>
              <p className="font-semibold text-green-500">
                {formatPrice(data.income)}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">expense</p>
              <p className="font-semibold text-red-500">
                {formatPrice(data.expense)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WealthAnalytic;
