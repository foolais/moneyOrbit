import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const TransactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "must be either 'income' or 'expense'" }),
  }),
  activity: z.string().min(3, "must be at least 3 characters long"),
  amount: z
    .number()
    .min(100, "must be at least 100")
    .positive("must be a positive number"),
  style: z.enum([
    "travel",
    "gaming",
    "food & beverage",
    "coffee",
    "entertainment",
    "shopping",
    "salary",
    "other",
  ]),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  merchant: z.string().min(2, "must be at least 2 characters long"),
  description: z
    .string()
    .min(5, "must be at least 5 characters")
    .max(150, "must be at most 150 characters")
    .optional()
    .or(z.literal("")),
  image: z.any().optional(),
});

export type TransactionSchemaType = z.infer<typeof TransactionSchema>;

export const FilterTransactionSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum(["all", "income", "expense"], {
      errorMap: () => ({
        message: "must be either 'all', 'income' or 'expense'",
      }),
    })
    .optional(),
  style: z
    .enum([
      "all",
      "travel",
      "gaming",
      "food & beverage",
      "coffee",
      "entertainment",
      "shopping",
      "salary",
      "other",
    ])
    .optional(),
  rangeDate: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});

export type FilterTransactionSchemaType = z.infer<
  typeof FilterTransactionSchema
>;
