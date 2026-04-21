import FormSearchTransaction from "@/components/form-search-transaction";
import TableTransaction from "@/components/table-transaction";
import Title from "@/components/title";

const AllTransactionPage = () => {
  return (
    <main className="mx-auto w-4/5 md:w-3/4">
      <div className="sm:hidden">
        <Title />
      </div>
      <div className="space-y-4 sm:mt-8">
        <FormSearchTransaction />
        <TableTransaction />
      </div>
    </main>
  );
};

export default AllTransactionPage;
