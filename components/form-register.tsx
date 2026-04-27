"use client";

import { RegisterSchema, RegisterSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const FormRegister = ({
  onSubmitting,
}: {
  onSubmitting: (val: boolean) => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      onSubmitting(true);
      const { email, password } = data;
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      form.reset();

      toast.success("Registration successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!");
      onSubmitting(false);
    } finally {
      onSubmitting(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      id="register-form"
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
                autoFocus
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
                  type={isShowPassword.password ? "text" : "password"}
                  {...field}
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
                <InputGroupAddon align="inline-end">
                  {isShowPassword.password ? (
                    <EyeIcon
                      className="cursor-pointer"
                      onClick={() =>
                        setIsShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    />
                  ) : (
                    <EyeOffIcon
                      className="cursor-pointer"
                      onClick={() =>
                        setIsShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type={isShowPassword.confirmPassword ? "text" : "password"}
                  {...field}
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                  autoComplete="confirm-password"
                  disabled={isSubmitting}
                />
                <InputGroupAddon align="inline-end">
                  {isShowPassword.confirmPassword ? (
                    <EyeIcon
                      className="cursor-pointer"
                      onClick={() =>
                        setIsShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    />
                  ) : (
                    <EyeOffIcon
                      className="cursor-pointer"
                      onClick={() =>
                        setIsShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
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

export default FormRegister;
