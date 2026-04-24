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
import StarrySky from "@/public/sky.gif";
import { Card, CardContent } from "./ui/card";

const WealthAnalytic = () => {
  const [filter, setFilter] = useState<IFilterAnalytic>("all");
  const onChangeFilter = (value: IFilterAnalytic) => {
    setFilter(value);
  };

  const wealthImage =
    filter === "income"
      ? AstronoutSquat
      : filter === "expense"
        ? AstronoutMoney
        : AstronoutBagMoney;

  const wealthColor =
    filter === "income"
      ? "accent"
      : filter === "expense"
        ? "destructive"
        : "secondary";

  return (
    <div>
      <section className="grid items-center gap-2">
        <div className="mb-2 flex items-center gap-2">
          <Button variant="secondary" className="rounded-xl" size="sm">
            wealth analysis
          </Button>
          <div className="flex items-center rounded-full bg-white px-2 py-1">
            {["all", "income", "expense"].map((value: string) => {
              return (
                <Button
                  key={value}
                  variant={filter === value ? "default" : "ghost"}
                  className="cursor-pointer rounded-full transition-all duration-300 ease-in-out"
                  size="sm"
                  onClick={() => onChangeFilter(value as IFilterAnalytic)}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
        <Card className="transition-all duration-300 hover:scale-105">
          <CardContent className="flex items-center gap-4">
            <div
              className={`bg-${wealthColor} relative h-20 w-20 rounded-full`}
            >
              <Image
                src={wealthImage}
                alt="Astronout bag money"
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold md:text-xl">wealth</span>
              <div className="flex gap-1">
                <h2
                  className={`text-lg font-bold md:text-2xl text-${wealthColor}`}
                >
                  {formatPrice(100000000)}
                </h2>
                <Sparkles className={`size-5 text-${wealthColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="border-secondary relative my-4 h-36 w-full rounded-xl border-2">
          <Image
            src={StarrySky}
            alt="Starry sky"
            fill
            loading="eager"
            unoptimized
            className="rounded-xl object-cover object-top"
          />
        </div>
      </section>
    </div>
  );
};

export default WealthAnalytic;
