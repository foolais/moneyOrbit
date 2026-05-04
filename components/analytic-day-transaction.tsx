import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { createClient } from "@/lib/supabase-server";
import { format } from "date-fns";

const AnalyticDayTransaction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, date, type", { count: "exact" })
    .eq("date", format(new Date(), "dd MMM yyyy"))
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) return null;

  const totalIncomeTransaction = data
    .filter((item) => item.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenseTransaction = data
    .filter((item) => item.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        today summary
      </Button>
      <Card className="rounded-2xl transition-all duration-300 hover:scale-105">
        <CardContent>
          <div>
            <p className="text-muted-foreground text-sm">total spending</p>
            <p className="text-2xl font-bold text-red-600">
              {formatPrice(totalExpenseTransaction)}
            </p>
          </div>
          <div className="my-4">
            <p className="text-muted-foreground text-sm">total earning</p>
            <p className="text-accent text-2xl font-bold">
              {formatPrice(totalIncomeTransaction)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">transactions</p>
            <p className="text-2xl font-bold">{data?.length || 0}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticDayTransaction;
