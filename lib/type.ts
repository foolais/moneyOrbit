export type ITransaction = {
  type: "income" | "expense";
  style: IStyleTransaction;
  activity: string;
  amount: number;
  date: string;
  merchant: string;
  description?: string;
  image?: string;
};

export type GroupedTransactions = Record<string, ITransaction[]>;

export type IFilterAnalytic = "all" | "income" | "expense";

export type IStyleTransaction =
  | "travel"
  | "gaming"
  | "foodie"
  | "coffee"
  | "entertainment"
  | "shopping"
  | "salary"
  | "other";
