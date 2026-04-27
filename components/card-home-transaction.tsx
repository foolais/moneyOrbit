"use client";

import { ITransaction } from "@/lib/type";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { styleTransactionConfig } from "@/lib/data";
import DialogFormTransaction from "./dialog-form-transaction";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const CardHomeTransaction = ({
  id,
  type,
  style,
  activity,
  amount,
  merchant,
  date,
}: ITransaction) => {
  const [initialData, setInitialData] = useState<ITransaction>({
    id,
    type,
    style,
    activity,
    amount,
    merchant,
    date,
  });

  const fetchTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setInitialData(data);
      }
    } catch (error) {
      console.log("error fetching transaction", error);
      toast.error("error fetching transaction");
    }
  };

  return (
    <DialogFormTransaction
      mode="edit"
      initialData={initialData}
      trigger={
        <button
          type="button"
          className="w-full"
          onClick={() => fetchTransaction()}
        >
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
