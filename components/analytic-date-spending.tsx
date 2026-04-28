import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase-server";

const AnalyticDateSpending = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, date")
    .eq("user_id", user.id)
    .eq("type", "expense");
  if (error) return null;

  const grouped: Record<string, { total: number; count: number }> = {};

  data?.forEach((item) => {
    const day = format(new Date(item.date), "yyyy-MM-dd");

    if (!grouped[day]) {
      grouped[day] = { total: 0, count: 0 };
    }

    grouped[day].total += item.amount;
    grouped[day].count += 1;
  });

  let maxDay = null;
  let maxTotal = 0;

  for (const day in grouped) {
    if (grouped[day].total > maxTotal) {
      maxTotal = grouped[day].total;
      maxDay = day;
    }
  }

  const result = maxDay
    ? {
        date: maxDay,
        total: grouped[maxDay].total,
        count: grouped[maxDay].count,
      }
    : null;

  return (
    <div className="mb-4">
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        most spending day
      </Button>
      <Card className="rounded-2xl p-0 transition-all duration-300 hover:scale-105">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">date</p>
              <p className="text-lg font-semibold">
                {result?.date
                  ? format(new Date(result.date), "MMMM dd, yyyy")
                  : "N/A"}
              </p>
            </div>
            <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              🔥 highest
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">total spending</p>
            <p className="text-2xl font-bold">
              {result ? formatPrice(result.total) : formatPrice(0)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">transactions</p>
            <p className="text-2xl font-bold">{result?.count}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticDateSpending;
