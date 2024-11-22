import Table from "../../common/Table";
import { Tenant } from "../../../types/tenant";

const columns = [
  { name: "Tenant Name", uid: "name", sortable: true },
  { name: "Rent", uid: "rent_paid", sortable: true },
  { name: "Outstanding Balance", uid: "balance", sortable: true },
  { name: "Payment Status", uid: "status" },
  { name: "Payment Date", uid: "start_date", sortable: true },
];
function PaymentReport({
  tenants,
  isLoading,
  setPage,
  setSortBy,
  totalPage,
  page,
}: {
  tenants: Tenant[];
  isLoading: boolean;
  setPage: (number: number) => void;
  setSortBy: (args: { column: string; direction: string }) => void;
  page: number;
  totalPage: number;
}) {
//   console.log(tenants);
  return (
    <div className="bg-lightBg/80 p-5 shadow-lg shadow-default-100 rounded-[20px] mb-5">
      <h4 className="font-semibold text-lg md:text-xl text-nowrap pb-4">
        Tenant Payment Report
      </h4>
      <Table
        columns={columns}
        isLoading={isLoading}
        rows={tenants}
        setPage={setPage}
        setSortBy={setSortBy}
        totalPage={totalPage}
        page={page}
      />
    </div>
  );
}

export default PaymentReport;
