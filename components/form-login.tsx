"use client";

import { LoginSchema, LoginSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const FormLogin = ({
  onSubmitting,
}: {
  onSubmitting: (val: boolean) => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      onSubmitting(true);
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      form.reset();
      toast.success("Login successful!");
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
      onSubmitting(false);
    } finally {
      onSubmitting(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
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
                autoComplete="nope"
                disabled={isSubmitting}
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
              <InputGroup>
                <InputGroupInput
                  type={isShowPassword ? "text" : "password"}
                  {...field}
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
                <InputGroupAddon align="inline-end">
                  {isShowPassword ? (
                    <EyeIcon
                      className="cursor-pointer"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <EyeOffIcon
                      className="cursor-pointer"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                    />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};

export default FormLogin;
