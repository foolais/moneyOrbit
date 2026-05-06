import FormSearchTransaction from "@/components/form-search-transaction";
import TableSummary from "@/components/table-summary";
import TableTransaction from "@/components/table-transaction";

const AllTransactionPage = () => {
  return (
    <main className="mx-auto max-w-4xl space-y-2 md:mt-8">
      <FormSearchTransaction />
      <TableTransaction />
      <TableSummary />
    </main>
  );
};

export default AllTransactionPage;
