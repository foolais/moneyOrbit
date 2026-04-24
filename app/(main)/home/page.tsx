import ContainerHomeTransaction from "@/components/container-home-transaction";
import SidebarAnalytic from "@/components/sidebar-analytic";
import WealthAnalytic from "@/components/wealth-analytic";

const DashboardPage = () => {
  return (
    <main className="mx-auto grid gap-10 md:my-4 md:grid-cols-2 xl:w-11/12 2xl:max-w-7xl">
      <section>
        <div className="md:hidden">
          <WealthAnalytic />
        </div>
        <ContainerHomeTransaction />
      </section>
      <section className="hidden rounded-xl p-4 md:block md:w-sm lg:w-lg">
        <WealthAnalytic />
        <SidebarAnalytic />
      </section>
    </main>
  );
};

export default DashboardPage;
