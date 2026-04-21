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

const SidebarAnalyticHeader = () => {
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

  const textColor =
    filter === "income"
      ? "text-accent"
      : filter === "expense"
        ? "text-destructive"
        : "text-white";

  return (
    <header className="mt-1">
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
        <div className="flex items-center gap-1">
          <Image
            src={wealthImage}
            alt="Astronout bag money"
            width={80}
            height={80}
            className="object-cover"
            loading="eager"
          />
          <div className="flex gap-1">
            <h2 className={`text-2xl font-semibold lg:text-3xl ${textColor}`}>
              {formatPrice(100000000)}
            </h2>
            <Sparkles className={`size-5 ${textColor}`} />
          </div>
        </div>
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
    </header>
  );
};

export default SidebarAnalyticHeader;
