export type ITransaction = {
  type: "income" | "expense";
  style: "travel" | "gaming";
  activity: string;
  amount: number;
  date: string;
  merchant: string;
};

export type GroupedTransactions = Record<string, ITransaction[]>;

export type IFilterAnalytic = "all" | "income" | "expense";
