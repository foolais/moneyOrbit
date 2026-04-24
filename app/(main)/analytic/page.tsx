import AnalyticSpending from "@/components/analytic-spending";
import SidebarAnalytic from "@/components/sidebar-analytic";
import { dummyDataTransaction } from "@/lib/data";

const AnalyticPage = () => {
  return (
    <main className="mx-auto grid sm:gap-5 md:my-4 md:grid-cols-2 xl:w-11/12 xl:gap-10 2xl:max-w-7xl">
      <section className="">
        <SidebarAnalytic />
      </section>
      <section className="space-y-4 py-4">
        <AnalyticSpending
          transaction={dummyDataTransaction[2]}
          type="expense"
        />
        <AnalyticSpending transaction={dummyDataTransaction[5]} type="income" />
      </section>
      <div className="py-6" />
    </main>
  );
};

export default AnalyticPage;
