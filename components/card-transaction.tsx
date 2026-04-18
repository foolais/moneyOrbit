import { Card, CardContent } from "./ui/card";
import AstronoutGame from "@/public/astronout-game.webp";
import AstronoutRocket from "@/public/astronout-rocket.webp";
import Image from "next/image";

type IProps = {
  type: "expense" | "income";
  style: "gaming" | "travel";
  activity: string;
  amount: number;
};

const CardTransaction = ({ type, style, activity, amount }: IProps) => {
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
          <h2 className="w-full text-sm font-semibold tracking-wider">
            {activity}
          </h2>
        </div>
        <p
          className={`text-${type === "expense" ? "destructive" : "accent"} w-max min-w-25 text-right font-bold`}
        >
          {type === "expense" ? "-" : "+"}
          {amount.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardTransaction;
