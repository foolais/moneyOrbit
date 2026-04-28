import AnalyticSpending from "./analytic-spending";
import { createClient } from "@/lib/supabase-server";

const ContainerAnalyticSpending = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: expenseTransaction } = await supabase
    .from("transactions")
    .select("*")
    .order("amount", { ascending: false })
    .eq("type", "expense")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  const { data: incomeTransaction } = await supabase
    .from("transactions")
    .select("*")
    .order("amount", { ascending: false })
    .eq("type", "income")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  return (
    <>
      <AnalyticSpending
        transaction={expenseTransaction ? expenseTransaction : null}
        type="expense"
      />
      <AnalyticSpending
        transaction={incomeTransaction ? incomeTransaction : null}
        type="income"
      />
    </>
  );
};

export default ContainerAnalyticSpending;
