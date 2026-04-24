import FormSearchTransaction from "@/components/form-search-transaction";
import TableTransaction from "@/components/table-transaction";

const AllTransactionPage = () => {
  return (
    <main className="mx-auto max-w-4xl space-y-2 md:mt-8">
      <FormSearchTransaction />
      <TableTransaction />
    </main>
  );
};

export default AllTransactionPage;
