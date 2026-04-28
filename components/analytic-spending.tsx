import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { styleTransactionConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { ITransaction } from "@/lib/type";

const AnalyticSpending = ({
  transaction,
  type,
}: {
  transaction: ITransaction | null;
  type: "expense" | "income";
}) => {
  return (
    <div>
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        top {type === "expense" ? "spending" : "earning"}
      </Button>
      {transaction ? (
        <Card className="w-full rounded-2xl shadow-md transition-all duration-300 hover:scale-105 xl:w-sm">
          <CardContent className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <p>
                {transaction?.date
                  ? format(new Date(transaction.date), "dd MMM yyyy")
                  : "N/A"}
              </p>
              <Button
                variant={type === "expense" ? "destructive" : "default"}
                size="sm"
                className="rounded-full px-2 text-xs"
              >
                {type === "expense" ? "expense" : "income"}
              </Button>
            </div>
            <p className="text-xl font-semibold">{transaction?.activity}</p>
            <p
              className={`text-2xl font-bold ${type === "expense" ? "text-red-600" : "text-green-600"}`}
            >
              {formatPrice(transaction.amount)}
            </p>
            <div className="my-2 flex items-center gap-1">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${styleTransactionConfig[transaction?.style].bgColor}`}
              >
                <Image
                  src={styleTransactionConfig[transaction?.style].image}
                  alt={transaction?.style}
                  fill
                  loading="eager"
                  sizes="auto"
                />
              </div>
              <div className="flex flex-col">
                <p
                  className={`w-max rounded-full px-2 py-0.5 text-sm font-medium ${styleTransactionConfig[transaction?.style]?.textColor} ${styleTransactionConfig[transaction?.style].bgColor}`}
                >
                  {transaction?.style}
                </p>
                <span className="text-muted-foreground px-2 py-0.5 text-xs">
                  {transaction?.merchant}
                </span>
              </div>
            </div>
            {transaction?.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {transaction.description}
              </p>
            )}
            {transaction?.image ? (
              <div className="h-50 w-full overflow-hidden rounded-xl border">
                <Image
                  src={transaction.image}
                  alt="Transaction proof"
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-muted flex h-50 w-full items-center justify-center rounded-xl">
                no image available
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              transaction not found
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default AnalyticSpending;
