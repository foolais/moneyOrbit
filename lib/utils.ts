import { clsx, type ClassValue } from "clsx";
import { format, isSameDay, isValid, parse } from "date-fns";
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

  const from = range.from;
  const to = range.to;

  if (!to || isSameDay(from, to)) {
    return format(from, "dd MMM yyyy");
  }

  return `${format(from, "dd MMM yyyy")} - ${format(to, "dd MMM yyyy")}`;
};

export const parseSafeDate = (value: string | null) => {
  if (!value) return undefined;

  const iso = new Date(value);
  if (isValid(iso)) return iso;

  const parsed = parse(value, "dd-MM-yyyy", new Date());

  return isValid(parsed) ? parsed : undefined;
};

export const getPagination = (current: number, total: number) => {
  if (total <= 0) return [1];
  if (total === 1) return [1];

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
