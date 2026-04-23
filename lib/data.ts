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
  // TODAY
  {
    type: "expense",
    activity: "Booking Hotel",
    amount: 1200000,
    date: "2026-04-29T10:30:00",
    merchant: "Traveloka",
    style: "travel",
  },
  {
    type: "income",
    style: "salary",
    activity: "Monthly Salary",
    amount: 6500000,
    date: "2026-04-18T09:00:00",
    merchant: "Company",
  },
  {
    type: "expense",
    style: "foodie",
    activity: "Lunch",
    amount: 45000,
    date: "2026-04-18T12:15:00",
    merchant: "Warung Makan",
  },
  {
    type: "expense",
    style: "other",
    activity: "Graduation",
    amount: 30000,
    date: "2026-05-02T15:20:00",
    merchant: "Binus",
  },

  // YESTERDAY
  {
    type: "expense",
    style: "gaming",
    activity: "Top Up Game",
    amount: 150000,
    date: "2026-04-17T20:15:00",
    merchant: "Google Play",
  },
  {
    type: "expense",
    style: "entertainment",
    activity: "Cinema Ticket",
    amount: 50000,
    date: "2026-04-17T19:00:00",
    merchant: "CGV",
  },

  // 2 DAYS AGO
  {
    type: "expense",
    style: "shopping",
    activity: "Buy T-Shirt",
    amount: 120000,
    date: "2026-04-16T14:10:00",
    merchant: "Shopee",
  },
  {
    type: "income",
    style: "other",
    activity: "Freelance Project",
    amount: 500000,
    date: "2026-04-16T10:00:00",
    merchant: "Client",
  },

  // 3 DAYS AGO
  {
    type: "expense",
    style: "travel",
    activity: "Train Ticket",
    amount: 90000,
    date: "2026-04-15T09:20:00",
    merchant: "KAI",
  },
  {
    type: "expense",
    style: "foodie",
    activity: "Dinner",
    amount: 80000,
    date: "2026-04-15T19:25:00",
    merchant: "Restaurant",
  },

  // 4 DAYS AGO
  {
    type: "expense",
    style: "coffee",
    activity: "Morning Coffee",
    amount: 25000,
    date: "2026-04-14T08:30:00",
    merchant: "Kopi Kenangan",
  },
  {
    type: "income",
    style: "salary",
    activity: "Bonus",
    amount: 1000000,
    date: "2026-04-14T17:00:00",
    merchant: "Company",
  },

  // 5 DAYS AGO
  {
    type: "expense",
    style: "entertainment",
    activity: "Spotify Subscription",
    amount: 55000,
    date: "2026-04-13T21:10:00",
    merchant: "Spotify",
  },
  {
    type: "expense",
    style: "shopping",
    activity: "Buy Shoes",
    amount: 350000,
    date: "2026-04-13T16:45:00",
    merchant: "Tokopedia",
  },
  {
    type: "expense",
    style: "other",
    activity: "Parking Fee",
    amount: 5000,
    date: "2026-04-13T12:00:00",
    merchant: "Parking Area",
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

export const ITEMS_PER_PAGE = 5;
