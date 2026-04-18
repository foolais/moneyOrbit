import ContainerTransaction from "@/components/container-transaction";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import AstronoutStyle from "@/public/astronout-style.webp";
import { History, Plus } from "lucide-react";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <main className="w-full">
      <header className="sm:hidden">
        <Title />
      </header>
      <div className="my-4 grid gap-10 md:my-4 md:grid-cols-2">
        <section className="grid">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="rounded-xl" size="sm">
                Recent Transactions <History className="size-5" />
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
          <ContainerTransaction />
        </section>
        <section className="hidden rounded-xl bg-red-200 p-4 md:grid">
          Sidebar content
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
