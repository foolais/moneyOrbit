import AnalyticDateSpending from "@/components/analytic-date-spending";
import AnalyticSpending from "@/components/analytic-spending";
import SidebarAnalytic from "@/components/sidebar-analytic";
import WealthAnalytic from "@/components/wealth-analytic";
import { dummyDataTransaction } from "@/lib/data";

const AnalyticPage = () => {
  return (
    <main className="mx-auto flex flex-col md:my-4 md:flex-row md:justify-center md:gap-5 xl:w-11/12 xl:gap-10 2xl:max-w-7xl">
      <section className="mt-4 space-y-4 md:w-md lg:w-lg">
        <WealthAnalytic />
        <AnalyticDateSpending />
        <SidebarAnalytic />
      </section>
      <section className="mt-6 space-y-4">
        <AnalyticSpending
          transaction={dummyDataTransaction[2]}
          type="expense"
        />
        <AnalyticSpending transaction={dummyDataTransaction[5]} type="income" />
      </section>
    </main>
  );
};

export default AnalyticPage;
