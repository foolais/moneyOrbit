import { dataStyleTransaction, styleTransactionConfig } from "@/lib/data";
import SidebarAnalyticHeader from "./sidebar-analytic-header";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { randomInt } from "crypto";

const SidebarAnalytic = () => {
  return (
    <main>
      <SidebarAnalyticHeader />
      <div>
        <Button variant="secondary" className="rounded-xl" size="sm">
          activity
        </Button>
        <div className="my-4 space-y-1">
          {dataStyleTransaction.map((style) => (
            <div className="flex items-center justify-between" key={style}>
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
              <p className="font-bold text-white">
                {formatPrice(randomInt(1000000, 10000000))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SidebarAnalytic;
