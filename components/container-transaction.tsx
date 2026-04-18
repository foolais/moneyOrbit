import { GroupedTransactions, Transaction } from "@/lib/type";
import CardTransaction from "./card-transaction";

export const dummyData: Transaction[] = [
  // TODAY
  {
    type: "expense",
    style: "travel",
    activity: "Booking Hotel",
    amount: 1200000,
    date: "2026-04-18T10:30:00",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 75000,
    date: "2026-04-18T14:10:00",
  },
  {
    type: "expense",
    style: "gaming",
    activity: "Top Up Game",
    amount: 50000,
    date: "2026-04-18T18:45:00",
  },

  // YESTERDAY
  {
    type: "expense",
    style: "travel",
    activity: "Train Ticket",
    amount: 90000,
    date: "2026-04-17T09:20:00",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 110000,
    date: "2026-04-17T20:15:00",
  },

  // 2 DAYS AGO
  {
    type: "income",
    style: "gaming",
    activity: "Top Up Game",
    amount: 150000,
    date: "2026-04-16T13:00:00",
  },
  {
    type: "expense",
    style: "travel",
    activity: "Flight Ticket",
    amount: 300000,
    date: "2026-04-16T08:10:00",
  },

  // 3 DAYS AGO
  {
    type: "expense",
    style: "travel",
    activity: "Restaurant",
    amount: 80000,
    date: "2026-04-15T19:25:00",
  },
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 95000,
    date: "2026-04-15T11:40:00",
  },

  // 4 DAYS AGO
  {
    type: "expense",
    style: "gaming",
    activity: "Top Up Game",
    amount: 60000,
    date: "2026-04-14T16:30:00",
  },
  {
    type: "expense",
    style: "travel",
    activity: "Coffee Shop",
    amount: 30000,
    date: "2026-04-14T09:50:00",
  },

  // 5 DAYS AGO
  {
    type: "income",
    style: "gaming",
    activity: "QRIS Payment",
    amount: 200000,
    date: "2026-04-13T21:10:00",
  },
];

const ContainerTransaction = () => {
  const groupTransactions = (data: Transaction[]): GroupedTransactions => {
    const groups: GroupedTransactions = {};

    data.forEach((item: Transaction) => {
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
                  />
                </article>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ContainerTransaction;
