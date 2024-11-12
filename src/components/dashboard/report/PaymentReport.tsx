import Table from "../../common/Table";

const columns = [
	{ name: "Tenant Name", uid: "name", sortable: true },
	{ name: "Rent", uid: "rent", sortable: true },
	{ name: "Outstanding Balance", uid: "balance", sortable: true },
	{ name: "Payment Status", uid: "payment_status" },
	{ name: "Payment Method", uid: "method", sortable: true },
	{ name: "Payment Date", uid: "date", sortable: true },
];
function PaymentReport() {
	return (
		<div className="bg-lightBg/80 p-5 shadow-lg shadow-default-100 rounded-[20px] mb-5">
			<h4 className="font-semibold text-lg md:text-xl text-nowrap pb-4">
				Tenant Payment Report
			</h4>
			<Table columns={columns} rows={[]} />
		</div>
	);
}

export default PaymentReport;
