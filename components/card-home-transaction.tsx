"use client";

import { ITransaction } from "@/lib/type";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { styleTransactionConfig } from "@/lib/data";
import DialogFormTransaction from "./dialog-form-transaction";

const CardHomeTransaction = ({
  id,
  type,
  style,
  activity,
  amount,
  merchant,
}: ITransaction) => {
  return (
    <DialogFormTransaction
      mode="edit"
      transactionId={id}
      onSuccess={() => window.location.reload()}
      trigger={
        <button type="button" className="w-full">
          <Card
            className={`cursor-pointer py-1 transition-all duration-300 hover:scale-105 ${styleTransactionConfig[style].bgColor}`}
          >
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
                  <h2 className="truncate text-left font-semibold tracking-wider">
                    {activity}
                  </h2>
                  <p
                    className={`justify-self-end truncate font-bold ${
                      type === "expense" ? "text-destructive" : "text-black"
                    }`}
                  >
                    {type === "expense" ? "-" : "+"}
                    {formatPrice(amount)}
                  </p>
                  <span className="text-left text-sm font-semibold text-slate-400">
                    {merchant}
                  </span>
                  <span
                    className={`justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold ${styleTransactionConfig[style].textColor} bg-white`}
                  >
                    {style}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>
      }
    />
  );
};

export default CardHomeTransaction;
