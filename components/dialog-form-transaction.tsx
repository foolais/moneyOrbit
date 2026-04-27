"use client";

import {
  CalendarIcon,
  Loader,
  Plus,
  Send,
  Sparkles,
  Trash,
  Upload,
  XIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import Image from "next/image";
import AstronoutLaptop from "@/public/working-laptop.webp";
import AstronoutRunMoney from "@/public/astronout-run-money.webp";
import { formatRupiahOnInput } from "@/lib/utils";
import {
  amountButton,
  dataStyleTransaction,
  styleTransactionConfig,
} from "@/lib/data";
import { TransactionSchema, TransactionSchemaType } from "@/lib/schema";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type IDialogFormTransaction = {
  mode?: "create" | "edit";
  trigger?: React.ReactNode;
  transactionId?: string;
};

const DialogFormTransaction = ({
  mode = "create",
  trigger,
  transactionId,
}: IDialogFormTransaction) => {
  const isEdit = mode === "edit";
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [initialAmount, setInitialAmount] = useState(0);

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: "income",
      activity: "",
      amount: 0,
      date: new Date().toISOString(),
      style: "other",
      merchant: "",
      description: "",
      image: undefined,
    },
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("id", transactionId)
          .single();

        if (error) throw error;

        if (data) {
          form.reset(data);
          setInitialAmount(data.amount);
        }
      } catch (error) {
        console.log("error fetching transaction", error);
        toast.error("error fetching transaction");
      }
    };

    if (isEdit && transactionId) {
      fetchTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const setColor = (label: string) => {
    return label.includes("+")
      ? "bg-accent text-white"
      : label.includes("-")
        ? "bg-destructive text-white"
        : "bg-muted";
  };

  const onClickAmount = (item: { label: string; value: number }) => {
    const current = form.getValues("amount") || 0;

    if (item.label === "reset") {
      form.setValue("amount", isEdit ? initialAmount || 0 : 0, {
        shouldDirty: true,
      });
      return;
    }

    if (item.label.includes("+")) {
      form.setValue("amount", current + item.value, { shouldDirty: true });
    } else if (item.label.includes("-")) {
      form.setValue("amount", Math.max(0, current - item.value), {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: TransactionSchemaType) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      if (isEdit) {
        try {
          console.log({ data });
          const { error } = await supabase
            .from("transactions")
            .update({
              ...data,
              description: data.description || null,
              image: data.image || null,
            })
            .eq("id", transactionId);

          if (error) throw error;

          toast.success("transaction updated successfully");
          form.reset();
          setOpenDialog(false);
          router.refresh();
        } catch (error) {
          console.log("Error updating transaction", error);
          toast.error("Error updating transaction");
        }
      } else {
        try {
          const { error } = await supabase.from("transactions").insert({
            user_id: user?.id,
            type: data.type,
            activity: data.activity,
            amount: data.amount,
            date: data.date,
            style: data.style,
            merchant: data.merchant,
            description: data.description || null,
            image: data.image || null,
          });

          if (error) throw error;

          toast.success("transaction created successfully");
          form.reset();
          setOpenDialog(false);
          router.refresh();
        } catch (error) {
          console.log("Error creating transaction", error);
          toast.error("Error creating transaction");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(onSubmit)(e);
  };

  const isSubmitting = form.formState.isSubmitting || isUploadingImage;
  const isDirty = isEdit && !form.formState.isDirty;

  const isDisabled = isSubmitting;

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(val) => {
        if (!isSubmitting) {
          setOpenDialog(val);

          if (!val) {
            form.reset();
          }
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            className="cursor-pointer rounded-xl transition-all duration-300 hover:scale-105"
            size="sm"
          >
            NEW <Plus className="size-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="text-card-foreground bg-gray-200 md:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form id="form-transaction" onSubmit={handleFormSubmit}>
          <div className="absolute -top-28 right-0 h-32 w-32 md:-top-32 md:w-40">
            <Image
              src={AstronoutLaptop}
              alt="Astronout on the moon"
              fill
              sizes="auto"
              loading="eager"
              className="object-cover"
            />
          </div>
          <DialogHeader>
            <DialogTitle className="stroke-text text-secondary flex gap-1 text-xl font-semibold">
              <span>
                {mode === "create" && "Add new transaction"}
                {mode === "edit" && "Edit transaction"}
              </span>{" "}
              <Sparkles className="size-5" />
            </DialogTitle>
            <DialogDescription>
              {mode === "create" && "fill the form to add new transaction"}
              {mode === "edit" && "fill the form to change your transaction"}
            </DialogDescription>
          </DialogHeader>
          {isSubmitting ? (
            <div className="flex min-h-[52vh] flex-col items-center justify-center">
              <Image
                src={AstronoutRunMoney}
                alt="Astronout on the moon"
                height={400}
                width={400}
                loading="eager"
                className="animate-bounce object-cover"
              />
              <span className="stroke-text text-accent animate-pulse text-xl font-semibold tracking-widest">
                {mode === "create"
                  ? "creating transaction..."
                  : "updating transaction..."}
              </span>
            </div>
          ) : (
            <FieldGroup className="max-h-[50vh] gap-2 overflow-y-scroll">
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <div className="flex w-full rounded-l-sm border bg-white">
                      {["income", "expense"].map((option) => {
                        const isActive = field.value === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => field.onChange(option)}
                            className={`flex-1 cursor-pointer rounded-md px-3 py-1 text-sm transition-all duration-300 ease-in-out disabled:cursor-not-allowed ${
                              isActive
                                ? option === "income"
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : "text-muted-foreground"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="activity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <FieldLabel htmlFor={field.name}>activity</FieldLabel>
                    <Input
                      {...field}
                      placeholder="activity name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      disabled={isDisabled}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <FieldLabel htmlFor={field.name}>amount</FieldLabel>
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {amountButton.map((amount, index) => {
                        return (
                          <Button
                            type="button"
                            key={index}
                            size="xs"
                            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${setColor(amount.label)}`}
                            onClick={() => onClickAmount(amount)}
                            disabled={isDisabled}
                          >
                            {amount.label}
                          </Button>
                        );
                      })}
                    </div>
                    <Input
                      {...field}
                      placeholder="amount spent"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, "");
                        field.onChange(+raw);
                      }}
                      value={formatRupiahOnInput(String(field.value || 0))}
                      autoComplete="off"
                      disabled={isDisabled}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => {
                  const date = field.value ? new Date(field.value) : undefined;

                  return (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                      <FieldLabel>date</FieldLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between disabled:opacity-100"
                            disabled={isDisabled}
                          >
                            {date ? format(date, "dd MMM yyyy") : "Pick a date"}
                            <CalendarIcon className="ml-2 size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            className="disabled:opacity-100"
                            selected={date}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                field.onChange(selectedDate.toISOString());
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
              <Controller
                name="style"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <FieldLabel>style</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="pick a style" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataStyleTransaction.map((style) => (
                          <SelectItem
                            key={style}
                            value={style}
                            className="flex items-center gap-2"
                          >
                            <Image
                              src={styleTransactionConfig[style].image}
                              alt={style}
                              width={30}
                              height={30}
                              className="object-cover"
                            />
                            <span
                              className={`${styleTransactionConfig[style].textColor} ${styleTransactionConfig[style].bgColor} justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold`}
                            >
                              {style}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="merchant"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <FieldLabel htmlFor={field.name}>merchant</FieldLabel>
                    <Input
                      {...field}
                      placeholder="merchant name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      disabled={isDisabled}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>description</FieldLabel>
                    <InputGroup className="bg-white">
                      <InputGroupTextarea
                        {...field}
                        id={field.name}
                        placeholder="description (optional)"
                        autoComplete="off"
                        className="resize-none"
                        aria-invalid={fieldState.invalid}
                        disabled={isDisabled}
                        value={field.value || ""}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length || 0}/150 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => {
                  const handleOpen = (open: () => void) => {
                    open();
                    document.body.style.pointerEvents = "auto";
                  };

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {field.value ? "image (change or remove)" : "Image"}
                      </FieldLabel>

                      {!field.value ? (
                        <CldUploadWidget
                          uploadPreset="money-orbit"
                          options={{
                            multiple: false,
                            maxFiles: 1,
                            resourceType: "image",
                            clientAllowedFormats: [
                              "jpg",
                              "jpeg",
                              "png",
                              "webp",
                              "heic",
                            ],
                            maxFileSize: 5000000,
                          }}
                          onUpload={() => setIsUploadingImage(true)}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onSuccess={(result: any) => {
                            field.onChange(result.info.secure_url);
                            setIsUploadingImage(false);
                          }}
                          onClose={() => setIsUploadingImage(false)}
                        >
                          {({ open }) => (
                            <Button
                              type="button"
                              onClick={() => handleOpen(open!)}
                              className="w-full cursor-pointer"
                              disabled={isDisabled}
                            >
                              <Upload className="mr-2" />
                              upload image
                            </Button>
                          )}
                        </CldUploadWidget>
                      ) : (
                        <div className="relative mt-3 h-60 w-full">
                          <Image
                            src={field.value}
                            alt="preview"
                            fill
                            sizes="auto"
                            loading="eager"
                            className="rounded-xl border-2 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <CldUploadWidget
                              uploadPreset="money-orbit"
                              options={{ multiple: false, maxFiles: 1 }}
                              onUpload={() => setIsUploadingImage(true)}
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              onSuccess={(result: any) => {
                                field.onChange(result.info.secure_url);
                                setIsUploadingImage(false);
                              }}
                              onClose={() => setIsUploadingImage(false)}
                            >
                              {({ open }) => (
                                <Button
                                  type="button"
                                  size="xs"
                                  onClick={() => handleOpen(open!)}
                                  className="cursor-pointer"
                                >
                                  change
                                </Button>
                              )}
                            </CldUploadWidget>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="destructive"
                              type="button"
                              size="xs"
                              onClick={() =>
                                form.setValue("image", undefined, {
                                  shouldDirty: true,
                                })
                              }
                              className="cursor-pointer"
                            >
                              <XIcon />
                            </Button>
                          </div>
                        </div>
                      )}
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          )}
          <div
            className={`mt-4 flex items-center justify-between ${isSubmitting && "hidden"}`}
          >
            <div>
              {isEdit && (
                <Button type="button" variant="destructive">
                  <span>delete</span>
                  <Trash />
                </Button>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="flex cursor-pointer items-center justify-center"
              disabled={isDisabled || isDirty}
            >
              {isEdit ? "update transaction" : "create transaction"}
              {isSubmitting ? <Loader className="animate-spin" /> : <Send />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormTransaction;
