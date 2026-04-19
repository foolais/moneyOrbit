import { ITransaction } from "@/lib/type";
import { Card, CardContent } from "./ui/card";
import AstronoutGame from "@/public/astronout-game.webp";
import AstronoutRocket from "@/public/astronout-rocket.webp";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type IProps = Omit<ITransaction, "date">;

const CardTransaction = ({
  type,
  style,
  activity,
  amount,
  merchant,
}: IProps) => {
  return (
    <Card className="cursor-pointer py-1 transition-all duration-300 hover:scale-105">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={style === "gaming" ? AstronoutGame : AstronoutRocket}
            alt="Astronout"
            width={50}
            height={50}
            className="object-cover"
            loading="eager"
          />
          <div>
            <h2 className="w-full font-semibold tracking-wider">{activity}</h2>
            <span className="text-sm font-semibold text-slate-400">
              {merchant}
            </span>
          </div>
        </div>
        <p
          className={`text-${type === "expense" ? "destructive" : "black"} w-max min-w-25 text-right font-bold`}
        >
          {type === "expense" ? "-" : "+"}
          {formatPrice(amount)}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardTransaction;
