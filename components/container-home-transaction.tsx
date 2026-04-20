import { GroupedTransactions, ITransaction } from "@/lib/type";
import { Button } from "./ui/button";
import AstronoutStyle from "@/public/astronout-style.webp";
import Image from "next/image";
import CardHomeTransaction from "./card-home-transaction";
import { dummyDataTransaction } from "@/lib/data";
import DialogFormTransaction from "./dialog-form-transaction";

const ContainerHomeTransaction = () => {
  const groupTransactions = (data: ITransaction[]): GroupedTransactions => {
    const groups: GroupedTransactions = {};

    data.forEach((item: ITransaction) => {
      const itemDate = new Date(item.date);

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const itemStart = new Date(itemDate);
      itemStart.setHours(0, 0, 0, 0);

      const diffTime = todayStart.getTime() - itemStart.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      let label: string;

      if (diffDays === 0) label = "Today";
      else if (diffDays === 1) label = "Yesterday";
      else {
        label = itemDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(item);
    });

    return groups;
  };

  const sortedData = [...dummyDataTransaction].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const groupedData = groupTransactions(sortedData);

  return (
    <div>
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="rounded-xl" size="sm">
            Recent Transactions
          </Button>
          <Image
            src={AstronoutStyle}
            alt="Astronout style"
            width={75}
            height={75}
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="flex justify-end">
          <DialogFormTransaction />
        </div>
      </header>
      <ul className="mx-auto mb-8 w-11/12 space-y-4">
        {Object.entries(groupedData).map(([label, items]) => (
          <li key={label}>
            <p className="mb-2 text-center text-sm font-semibold text-white">
              {label}
            </p>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  <article>
                    <CardHomeTransaction
                      type={item.type}
                      style={item.style}
                      activity={item.activity}
                      amount={item.amount}
                      merchant={item.merchant}
                    />
                  </article>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerHomeTransaction;
