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
import { CalendarIcon, Search } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { formatRangeDate } from "@/lib/utils";

const FormSearchTransaction = () => {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    "filter",
  );

  const form = useForm<FilterTransactionSchemaType>({
    resolver: zodResolver(FilterTransactionSchema),
    defaultValues: {
      search: "",
      type: "income",
      rangeDate: {
        from: undefined,
        to: undefined,
      },
      style: "all",
    },
  });

  const onSubmit = (data: FilterTransactionSchemaType) => {
    console.log(data);
  };

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
                              {["income", "expense"].map((item) => (
                                <SelectItem key={item} value={item}>
                                  <span
                                    className={`${item === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} py-.5 rounded-xl px-2 font-semibold`}
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
                      className="col-span-2 flex cursor-pointer items-center justify-center font-semibold"
                    >
                      search <Search />
                    </Button>
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
