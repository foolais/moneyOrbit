"use client";

import NightFireflies from "@/public/night-fireflies.gif";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Controller, useForm } from "react-hook-form";
import {
  FilterTransactionSchema,
  FilterTransactionSchemaType,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { allStyleTransactionConfig, dataAllStyleTransaction } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, SearchIcon, TimerResetIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { formatRangeDate } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IStyleTransaction } from "@/lib/type";
import { format } from "date-fns";

const FormSearchTransaction = () => {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    "filter",
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchUrl = searchParams.get("search") || "";
  const typeUrl = searchParams.get("type") || "all";
  const styleUrl = searchParams.get("style") || "all";
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");

  const form = useForm<FilterTransactionSchemaType>({
    resolver: zodResolver(FilterTransactionSchema),
    defaultValues: {
      search: searchUrl,
      type: typeUrl as "all" | "income" | "expense",
      rangeDate: {
        from: fromUrl ? new Date(fromUrl) : undefined,
        to: toUrl ? new Date(toUrl) : undefined,
      },
      style: styleUrl as IStyleTransaction | "all",
    },
  });

  const onSubmit = (data: FilterTransactionSchemaType) => {
    const params = new URLSearchParams(searchParams.toString());

    if (data.search) {
      params.set("search", data.search);
    } else {
      params.delete("search");
    }

    if (data.type && data.type !== "all") {
      params.set("type", data.type);
    } else {
      params.delete("type");
    }

    if (data.style && data.style !== "all") {
      params.set("style", data.style);
    } else {
      params.delete("style");
    }

    if (data.rangeDate?.from) {
      params.set("from", format(data.rangeDate.from, "dd-MM-yyyy"));
    } else {
      params.delete("from");
    }

    if (data.rangeDate?.to) {
      params.set("to", format(data.rangeDate.to, "dd-MM-yyyy"));
    } else {
      params.delete("to");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset({
      search: "",
      type: "all",
      rangeDate: {
        from: undefined,
        to: undefined,
      },
      style: "all",
    });

    router.push(pathname);
  };

  const hasFilter =
    !!searchParams.get("page") ||
    !!searchParams.get("search") ||
    !!searchParams.get("from") ||
    !!searchParams.get("to") ||
    (searchParams.get("type") && searchParams.get("type") !== "all") ||
    (searchParams.get("style") && searchParams.get("style") !== "all");

  const isOpen = accordionValue === "filter";

  return (
    <header className="mx-auto w-11/12 max-w-xl">
      <Accordion
        type="single"
        collapsible
        defaultValue="filter"
        value={accordionValue}
        onValueChange={(val) => setAccordionValue(val)}
      >
        <AccordionItem value="filter">
          <AccordionTrigger className="cursor-pointer">
            {isOpen ? (
              <span>
                <span className="rounded-lg bg-red-500 px-2 py-0.5">close</span>{" "}
                transaction filter
              </span>
            ) : (
              <span>
                <span className="rounded-lg bg-green-500 px-2 py-0.5">
                  open
                </span>{" "}
                transaction filter
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-center gap-4">
              <div className="relative hidden h-36 w-52 object-cover md:block">
                <Image
                  src={NightFireflies}
                  alt="Night Fireflies"
                  fill
                  loading="eager"
                  unoptimized
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="w-full max-w-lg">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="grid grid-cols-5 gap-2">
                    <Controller
                      name="search"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          aria-invalid={fieldState.invalid}
                          className="col-span-5 w-full"
                        >
                          <Input
                            type="text"
                            {...field}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            placeholder="search activity here..."
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="type"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          aria-invalid={fieldState.invalid}
                          className="col-span-2 w-full"
                        >
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="pick a type" />
                            </SelectTrigger>
                            <SelectContent>
                              {["all", "income", "expense"].map((item) => (
                                <SelectItem key={item} value={item}>
                                  <span
                                    className={`${item === "income" ? "bg-green-100 text-green-600" : item == "expense" ? "bg-red-100 text-red-600" : "bg-lime-100 text-lime-700"} py-.5 rounded-xl px-2 font-semibold`}
                                  >
                                    {item}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                    <Controller
                      name="style"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-3 w-full"
                        >
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue placeholder="pick a style" />
                            </SelectTrigger>
                            <SelectContent>
                              {dataAllStyleTransaction.map((style) => (
                                <SelectItem
                                  key={style}
                                  value={style}
                                  className="flex items-center gap-2"
                                >
                                  <Image
                                    src={allStyleTransactionConfig[style].image}
                                    alt={style}
                                    width={30}
                                    height={30}
                                    className="object-cover"
                                  />
                                  <span
                                    className={`${allStyleTransactionConfig[style].textColor} ${allStyleTransactionConfig[style].bgColor} justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold`}
                                  >
                                    {style}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                    <Controller
                      name="rangeDate"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const dateRange = field.value;

                        return (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="col-span-3 overflow-hidden"
                          >
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between disabled:opacity-100"
                                >
                                  {formatRangeDate(dateRange)}
                                  <CalendarIcon className="ml-2 size-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto gap-0 p-0">
                                <Calendar
                                  mode="range"
                                  selected={
                                    field.value?.from
                                      ? {
                                          from: field.value.from,
                                          to: field.value.to,
                                        }
                                      : undefined
                                  }
                                  onSelect={field.onChange}
                                />
                                <Button
                                  className="w-full cursor-pointer"
                                  size="sm"
                                  type="button"
                                  onClick={() =>
                                    field.onChange({
                                      from: undefined,
                                      to: undefined,
                                    })
                                  }
                                >
                                  reset date
                                </Button>
                              </PopoverContent>
                            </Popover>
                          </Field>
                        );
                      }}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className={`${hasFilter ? "col-span-1" : "col-span-2"} flex cursor-pointer items-center justify-center gap-1 font-semibold`}
                    >
                      <span className="hidden md:block">search</span>
                      <SearchIcon className="size-4" />
                    </Button>
                    {hasFilter && (
                      <Button
                        type="button"
                        variant="outline"
                        className="flex cursor-pointer items-center justify-center gap-1 font-semibold"
                        onClick={handleReset}
                        disabled={!hasFilter}
                      >
                        <span className="hidden md:block">reset</span>
                        <TimerResetIcon className="size-4" />
                      </Button>
                    )}
                  </FieldGroup>
                </form>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </header>
  );
};

export default FormSearchTransaction;
