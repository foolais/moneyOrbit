import { dataStyleTransaction, styleTransactionConfig } from "@/lib/data";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { randomInt } from "crypto";
import { Card, CardContent } from "./ui/card";

const SidebarAnalytic = () => {
  return (
    <section>
      <Button variant="secondary" className="mb-4 rounded-xl" size="sm">
        spending style
      </Button>
      <Card className="p-0">
        <CardContent className="p-0">
          {dataStyleTransaction.map((style) => (
            <div
              className={`flex items-center justify-between px-2 transition-all duration-300 hover:scale-105 ${styleTransactionConfig[style].bgColor}`}
              key={style}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={styleTransactionConfig[style].image}
                  alt={style}
                  width={50}
                  height={50}
                />
                <span
                  className={`justify-self-end rounded-full px-2 py-0.5 text-sm font-semibold ${styleTransactionConfig[style].textColor} ${styleTransactionConfig[style].bgColor}`}
                >
                  {style}
                </span>
              </div>
              <p className="font-bold">
                {formatPrice(randomInt(1000000, 10000000))}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default SidebarAnalytic;
