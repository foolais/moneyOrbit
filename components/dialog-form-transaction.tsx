"use client";

import {
  CalendarIcon,
  Loader,
  Plus,
  Send,
  Sparkles,
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
import {
  Controller,
  ControllerRenderProps,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import Image from "next/image";
import AstronoutLaptop from "@/public/working-laptop.webp";
import AstronoutRocket from "@/public/astronout-rocket.webp";
import AstronoutRunMoney from "@/public/astronout-run-money.webp";
import { formatRupiahOnInput, uploadToCloudinary } from "@/lib/utils";
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
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { useEffect, useRef, useState } from "react";

type IDialogFormTransaction = {
  mode?: "create" | "edit";
  initialData?: Partial<TransactionSchemaType>;
  trigger?: React.ReactNode;
};

const DialogFormTransaction = ({
  mode = "create",
  initialData,
  trigger,
}: IDialogFormTransaction) => {
  const isEdit = mode === "edit";

  const [openDialog, setOpenDialog] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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
      ...initialData,
    },
  });

  const imageData = useWatch({ name: "image", control: form.control });
  const previewImage =
    imageData instanceof File
      ? URL.createObjectURL(imageData)
      : typeof imageData === "string"
        ? imageData
        : null;
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialData && openDialog) {
      form.reset({
        ...form.getValues(),
        ...initialData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, openDialog]);

  useEffect(() => {
    return () => {
      if (imageData instanceof File) {
        URL.revokeObjectURL(previewImage!);
      }
    };
  }, [imageData, previewImage]);

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
      form.setValue("amount", isEdit ? initialData?.amount || 0 : 0, {
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

  const resetForm = () => {
    form.reset();
    if (fileRef.current) fileRef.current.value = "";
  };

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TransactionSchemaType, "image">,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      if (file.type === "image/heic" || file.name.endsWith(".heic")) {
        try {
          const heic2any = (await import("heic2any")).default;

          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
          });

          const blob = Array.isArray(convertedBlob)
            ? convertedBlob[0]
            : convertedBlob;

          const convertedFile = new File(
            [blob as Blob],
            file.name.replace(".heic", ".jpg"),
            {
              type: "image/jpeg",
            },
          );

          field.onChange(convertedFile);
        } catch (error) {
          console.log("HEIC conversion failed", error);
        }
      } else {
        field.onChange(file);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data: TransactionSchemaType) => {
    try {
      // let imageUrl = "";

      // // 🔥 upload if File
      // if (data.image instanceof File) {
      //   imageUrl = await uploadToCloudinary(data.image);
      // }

      // const payload = {
      //   ...data,
      //   image: imageUrl
      // }

      // console.log({ imageUrl });

      if (isEdit) {
        console.log("UPDATE", data);
      } else {
        console.log("CREATE", data);
      }

      resetForm();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(onSubmit)(e);
  };

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = isEdit && !form.formState.isDirty;

  const isDisabled = isSubmitting;

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(val) => {
        if (!isSubmitting) {
          setOpenDialog(val);

          if (!val) resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <div onClick={() => setOpenDialog(true)}>
          {trigger ?? (
            <Button
              className="cursor-pointer rounded-xl transition-all duration-300 hover:scale-105"
              size="sm"
            >
              NEW <Plus className="size-5" />
            </Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="text-card-foreground bg-gray-200 sm:max-w-md">
        <form id="form-transaction" onSubmit={handleFormSubmit}>
          <div className="absolute -top-28 right-0 h-32 w-32 sm:-top-32 sm:w-40">
            <Image
              src={AstronoutLaptop}
              alt="Astronout on the moon"
              fill
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
                            {date ? format(date, "PP") : "Pick a date"}
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
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {isEdit && imageData
                        ? "image (click to change image)"
                        : "image"}
                    </FieldLabel>
                    <InputGroup className="cursor-pointer bg-white">
                      <InputGroupInput
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChangeImage(e, field)}
                        disabled={isDisabled}
                      />
                      <InputGroupAddon align="inline-end">
                        <Upload />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                )}
              />
              {isUploadingImage && (
                <div className="relative my-4 w-fit">
                  <Image
                    src={AstronoutRocket}
                    alt="uploading image"
                    width={100}
                    height={100}
                    className="animate-bounce object-cover"
                  />
                  <p className="text-muted-foreground animate-pulse text-xs">
                    Uploading image...
                  </p>
                </div>
              )}
              {previewImage && (
                <div className="relative w-fit">
                  <Image
                    src={previewImage}
                    alt="preview"
                    width={200}
                    height={200}
                    className="rounded-xl border-2 object-cover"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    size="xs"
                    onClick={() => {
                      form.setValue("image", undefined);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 cursor-pointer rounded-xl"
                  >
                    <XIcon />
                  </Button>
                </div>
              )}
            </FieldGroup>
          )}
          <div
            className={`flex items-center justify-end ${isSubmitting && "hidden"}`}
          >
            <Button
              type="submit"
              variant="secondary"
              className="mt-4 flex cursor-pointer items-center justify-center"
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
