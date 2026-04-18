"use client";

import { LoginSchema, LoginSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const FormLogin = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("aaa");
    console.log(data);
  };

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <FieldGroup className="gap-2">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                type="email"
                {...field}
                placeholder="Enter your email"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                autoFocus
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                type="password"
                {...field}
                placeholder="********"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};

export default FormLogin;
