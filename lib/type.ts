export type Transaction = {
  type: "income" | "expense";
  style: "travel" | "gaming";
  activity: string;
  amount: number;
  date: string;
};

export type GroupedTransactions = Record<string, Transaction[]>;
