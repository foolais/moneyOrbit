import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { randomInt } from "crypto";

const AnalyticDateSpending = () => {
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
                {format(new Date(), "dd MMM yyyy")}
              </p>
            </div>
            <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              🔥 highest
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">total spending</p>
            <p className="text-2xl font-bold">
              {formatPrice(randomInt(1000000, 10000000))}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">transactions</p>
            <p className="text-2xl font-bold">120</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticDateSpending;
