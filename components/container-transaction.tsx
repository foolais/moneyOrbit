import { GroupedTransactions, ITransaction } from "@/lib/type";
import CardTransaction from "./card-transaction";
import { Button } from "./ui/button";
import AstronoutStyle from "@/public/astronout-style.webp";
import Image from "next/image";
import { Plus } from "lucide-react";

export const dummyData: ITransaction[] = [
  // TODAY
  {
    type: "expense",
    style: "travel",
    activity: "Booking Hotel",
    amount: 1200000,
    date: "2026-04-18T10:30:00",
    merchant: "Traveloka",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 75000,
    date: "2026-04-18T14:10:00",
    merchant: "Indomaret",
  },
  {
    type: "expense",
    style: "gaming",
    activity: "Train Ticket",
    amount: 350000,
    date: "2026-04-18T18:45:00",
    merchant: "KAI",
  },
  {
    type: "expense",
    style: "gaming",
    activity: "Graduation",
    amount: 1700000,
    date: "2026-04-18T18:45:00",
    merchant: "KAI",
  },

  // YESTERDAY
  {
    type: "expense",
    style: "travel",
    activity: "Train Ticket",
    amount: 90000,
    date: "2026-04-17T09:20:00",
    merchant: "KAI",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 110000,
    date: "2026-04-17T20:15:00",
    merchant: "Alfamart",
  },

  // 2 DAYS AGO
  {
    type: "income",
    style: "gaming",
    activity: "Top Up Game",
    amount: 150000,
    date: "2026-04-16T13:00:00",
    merchant: "Google Play",
  },
  {
    type: "expense",
    style: "travel",
    activity: "Flight Ticket",
    amount: 300000,
    date: "2026-04-16T08:10:00",
    merchant: "Garuda Indonesia",
  },

  // 3 DAYS AGO
  {
    type: "expense",
    style: "travel",
    activity: "Restaurant",
    amount: 80000,
    date: "2026-04-15T19:25:00",
    merchant: "Pizza Hut",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 95000,
    date: "2026-04-15T11:40:00",
    merchant: "Alfamart",
  },

  // 4 DAYS AGO
  {
    type: "expense",
    style: "gaming",
    activity: "Top Up Game",
    amount: 60000,
    date: "2026-04-14T16:30:00",
    merchant: "Google Play",
  },
  {
    type: "expense",
    style: "travel",
    activity: "Coffee Shop",
    amount: 30000,
    date: "2026-04-14T09:50:00",
    merchant: "Starbucks",
  },

  // 5 DAYS AGO
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 200000,
    date: "2026-04-13T21:10:00",
    merchant: "Indomaret",
  },
];

const ContainerTransaction = () => {
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

  const sortedData = [...dummyData].sort(
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
          <Button className="cursor-pointer rounded-xl" size="sm">
            NEW <Plus className="size-5" />
          </Button>
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
                    <CardTransaction
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

export default ContainerTransaction;
