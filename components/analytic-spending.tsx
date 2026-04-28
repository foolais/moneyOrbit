import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { styleTransactionConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { ITransaction } from "@/lib/type";
import Tesa from "@/public/tesa.png";

const AnalyticSpending = ({
  transaction,
  type,
}: {
  transaction: ITransaction;
  type: "expense" | "income";
}) => {
  return (
    <div>
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        top {type === "expense" ? "spending" : "earning"}
      </Button>
      <Card className="w-full rounded-2xl shadow-md transition-all duration-300 hover:scale-105 xl:w-sm">
        <CardContent className="flex flex-col gap-2">
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <p>{format(transaction?.date, "dd MMM yyyy")}</p>
            <Button
              variant={type === "expense" ? "destructive" : "default"}
              size="sm"
              className="rounded-full px-2 text-xs"
            >
              {type === "expense" ? "expense" : "income"}
            </Button>
          </div>
          <p className="text-xl font-semibold">{transaction.activity}</p>
          <p className={`text-2xl font-bold`}>
            {formatPrice(transaction.amount)}
          </p>
          <div className="my-2 flex items-center gap-1">
            <div
              className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${styleTransactionConfig[transaction.style].bgColor}`}
            >
              <Image
                src={styleTransactionConfig[transaction.style].image}
                alt={transaction.style}
                fill
                loading="eager"
                sizes="auto"
              />
            </div>
            <div className="flex flex-col">
              <p
                className={`rounded-full px-2 py-0.5 text-sm font-medium ${styleTransactionConfig[transaction.style].textColor} ${styleTransactionConfig[transaction.style].bgColor}`}
              >
                {transaction.style}
              </p>
              <span className="text-muted-foreground px-2 py-0.5 text-xs">
                AirAsia
              </span>
            </div>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            Flight ticket to Bali with additional baggage and priority boarding.
            This includes airport tax and insurance coverage.
          </p>
          {transaction.image && (
            <div className="h-40 w-full overflow-hidden rounded-xl border">
              <Image
                src={transaction.image}
                alt="Transaction proof"
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="h-40 w-full overflow-hidden rounded-xl border">
            <Image
              src={Tesa}
              alt="Transaction proof"
              width={400}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticSpending;
