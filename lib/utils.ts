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

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "expense-tracker");

  const res = await fetch("asjdaskjhsdgaskjhsdgaklink", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await res.json();
  return data.secure_url as string;
};

export const formatRangeDate = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from) return "Pick a date";

  if (!range.to) return format(range.from, "PP");

  if (isSameDay(range.from, range.to)) return format(range.from, "PP");

  return `${format(range.from, "PP")} - ${format(range.to, "PP")}`;
};
