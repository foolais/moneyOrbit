import ContainerHomeTransaction from "@/components/container-home-transaction";
import SidebarAnalytic from "@/components/sidebar-analytic";
import SidebarAnalyticHeader from "@/components/sidebar-analytic-header";
import Title from "@/components/title";
import Image from "next/image";
import AstronoutMoon from "@/public/astronout-moon.webp";

const DashboardPage = () => {
  return (
    <main className="mx-auto xl:w-11/12 2xl:max-w-7xl">
      <header className="flex items-center justify-between sm:hidden">
        <Title />
        <Image
          src={AstronoutMoon}
          alt="Astronout on the moon"
          width={70}
          height={70}
          loading="eager"
        />
      </header>
      <div className="my-4 grid gap-10 md:my-4 md:grid-cols-2">
        <section>
          <div className="md:hidden">
            <SidebarAnalyticHeader />
          </div>
          <ContainerHomeTransaction />
        </section>
        <section className="hidden rounded-xl p-4 md:grid">
          <SidebarAnalytic />
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
