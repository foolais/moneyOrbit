import FormSearchTransaction from "@/components/form-search-transaction";
import TableTransaction from "@/components/table-transaction";
import Title from "@/components/title";
import AstronoutMoon from "@/public/astronout-moon.webp";
import Image from "next/image";

const AllTransactionPage = () => {
  return (
    <main className="mx-auto w-full">
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
      <div className="mx-auto max-w-4xl space-y-2 sm:mt-8">
        <FormSearchTransaction />
        <TableTransaction />
      </div>
    </main>
  );
};

export default AllTransactionPage;
