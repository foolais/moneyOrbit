import { IStyleTransaction, ITransaction } from "./type";
import { StaticImageData } from "next/image";

import AstronoutTravel from "@/public/astronout-travel.webp";
import AstronoutGaming from "@/public/astronout-game.webp";
import AstronoutFood from "@/public/astronout-food.webp";
import AstronoutCoffee from "@/public/astronout-coffe.webp";
import AstronoutEntertainment from "@/public/astronout-entertainment.webp";
import AstronoutShopping from "@/public/astronout-shooping.webp";
import AstronoutSalary from "@/public/astronout-bag-money.webp";
import AstronoutOther from "@/public/astronout-style.webp";
import AstronoutMoon from "@/public/astronout-moon.webp";

type StyleConfig = {
  image: StaticImageData;
  bgColor: string;
  textColor: string;
};

export const styleTransactionConfig: Record<IStyleTransaction, StyleConfig> = {
  travel: {
    image: AstronoutTravel,
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  gaming: {
    image: AstronoutGaming,
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  foodie: {
    image: AstronoutFood,
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  coffee: {
    image: AstronoutCoffee,
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
  },
  entertainment: {
    image: AstronoutEntertainment,
    bgColor: "bg-pink-100",
    textColor: "text-pink-700",
  },
  shopping: {
    image: AstronoutShopping,
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
  salary: {
    image: AstronoutSalary,
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },

  other: {
    image: AstronoutOther,
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
  },
};

export const allStyleTransactionConfig: Record<
  IStyleTransaction | "all",
  StyleConfig
> = {
  all: {
    image: AstronoutMoon,
    bgColor: "bg-lime-100",
    textColor: "text-lime-700",
  },
  ...styleTransactionConfig,
};

export const dataAllStyleTransaction = Object.keys(
  allStyleTransactionConfig,
) as (IStyleTransaction | "all")[];

export const dummyDataTransaction: ITransaction[] = [
  {
    id: "trx-1",
    type: "expense",
    activity: "Booking Hotel",
    amount: 1200000,
    date: "2026-04-29T10:30:00",
    merchant: "Traveloka",
    style: "travel",
  },
  {
    id: "trx-2",
    type: "income",
    style: "salary",
    activity: "Monthly Salary",
    amount: 6500000,
    date: "2026-04-18T09:00:00",
    merchant: "Company",
  },
  {
    id: "trx-3",
    type: "expense",
    style: "foodie",
    activity: "Lunch",
    amount: 45000,
    date: "2026-04-18T12:15:00",
    merchant: "Warung Makan",
  },
];

export const dataStyleTransaction = Object.keys(
  styleTransactionConfig,
) as IStyleTransaction[];

export const amountButton = [
  {
    value: 1000,
    label: "+1k",
  },
  {
    value: 5000,
    label: "+5k",
  },
  {
    value: 10000,
    label: "+10k",
  },
  {
    value: 50000,
    label: "+50k",
  },
  {
    value: 1000,
    label: "-1k",
  },
  {
    value: 5000,
    label: "-5k",
  },
  {
    value: 10000,
    label: "-10k",
  },
  {
    value: 50000,
    label: "-50k",
  },
  {
    value: 0,
    label: "reset",
  },
];

export const ITEMS_PER_PAGE = 10;
