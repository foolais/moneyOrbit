import { ITransaction } from "@/lib/type";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { styleTransactionConfig } from "@/lib/data";

type IProps = Omit<ITransaction, "date">;

const CardHomeTransaction = ({
  type,
  style,
  activity,
  amount,
  merchant,
}: IProps) => {
  return (
    <Card className="cursor-pointer py-1 transition-all duration-300 hover:scale-105">
      <CardContent className="flex items-center justify-between">
        <div className="flex w-full items-center gap-2">
          <Image
            src={styleTransactionConfig[style].image}
            alt="Astronout"
            width={50}
            height={50}
            className="object-cover"
            loading="eager"
          />
          <div className="grid w-full grid-cols-2 items-center gap-x-4 gap-y-1">
            <h2 className="font-semibold tracking-wider">{activity}</h2>

            <p
              className={`justify-self-end font-bold ${
                type === "expense" ? "text-destructive" : "text-black"
              }`}
            >
              {type === "expense" ? "-" : "+"}
              {formatPrice(amount)}
            </p>
            <span className="text-sm font-semibold text-slate-400">
              {merchant}
            </span>
            <span
              className={`justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold ${styleTransactionConfig[style].textColor} ${styleTransactionConfig[style].bgColor}`}
            >
              {style}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardHomeTransaction;
