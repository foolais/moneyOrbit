import { clsx, type ClassValue } from "clsx";
import { format, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number) {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

export function formatRupiahOnInput(value: string) {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
}

export const formatRangeDate = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from) return "Pick a date";

  if (!range.to) return format(range.from, "dd MMM yyyy");

  if (isSameDay(range.from, range.to)) {
    return format(range.from, "dd MMM yyyy");
  }

  return `${format(range.from, "dd MMM yyyy")} - ${format(range.to, "dd MMM yyyy")}`;
};

export const getPagination = (current: number, total: number) => {
  const delta = 1;
  const range: (number | string)[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (current - delta > 2) {
    range.unshift("...");
  }

  if (current + delta < total - 1) {
    range.push("...");
  }

  return [1, ...range, total];
};
