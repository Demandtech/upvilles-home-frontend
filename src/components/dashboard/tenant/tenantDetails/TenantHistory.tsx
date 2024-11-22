import moment from "moment";
import { Tenant } from "../../../../types/tenant";
import Table from "../../../common/Table";
import { TenantAmountIcon, NextPaymentIcon } from "../../../svgs";
import { formatNaira } from "../../../../utils/formatCurrency";

const columns = [
	{ name: "Date", uid: "date", sortable: true },
	{ name: "Amount", uid: "amount", sortable: true },
	{ name: "Payment Status", uid: "payment_status", sortable: true },
	// { name: "Payment Method", uid: "payment_method", sortable: true },
	{ name: "Reference Number", uid: "reference_number", sortable: false },
];

const TenantHistory = ({
	tenant,
	isLoading,
}: {
	tenant: Tenant;
	isLoading: boolean;
}) => {
	console.log(tenant);
	return (
		<div className="bg-white shadow-lg shadow-default-100 rounded-lg py-10 px-5">
			<div className="text-center max-w-[600px] mx-auto mb-7">
				<h3 className="text-default font-bold text-xl mb-2">
					Payment History{" "}
				</h3>
				<p className="text-darkGrey">Payment summary of {tenant?.name}</p>
			</div>
			<div>
				<div className="flex gap-5 flex-wrap mb-10">
					<div className="relative flex-1 py-7 px-5 md:px-10 rounded-md shadow-md shadow-default-100 bg-lightBg border border-[#EEEEEE]">
						<div>
							<h6 className="text-2xl font-semibold mb-1">
								{formatNaira(tenant?.rent_paid)}
							</h6>
							<p className="text-[#7b7777] text-sm text-nowrap">
								Total Amount Paid
							</p>
						</div>
						<div className="absolute right-4 top-4">
							<TenantAmountIcon className="fill-[#007AFF]" />
						</div>
					</div>
					<div className="relative flex-1 py-7 px-5 md:px-10 bg-lightBg shadow-md shadow-default-100 rounded-md border border-[#EEEEEE]">
						<div>
							<h6 className="text-2xl mb-1 font-semibold text-nowrap">
								{formatNaira(tenant?.balance || 0)}
							</h6>
							<p className="text-[#7b7777] text-sm text-nowrap">
								Outstanding Balance
							</p>
						</div>
						<div className="absolute right-4 top-4">
							<TenantAmountIcon className="fill-[#FF6B6B]" />
						</div>
					</div>
					<div className="bg-lightBg relative px-5 md:px-10 py-7 shadow-md shadow-default-100 rounded-md flex-1 border border-[#EEEEEE]">
						<div>
							<h6 className="text-2xl mb-1 font-semibold text-nowrap">
								{moment(tenant?.end_date).format("MMM DD, YYYY")}
							</h6>
							<p className=" text-[#7b7777] text-sm text-nowrap">
								Next Payment Due Date{" "}
							</p>
						</div>
						<div className="absolute right-4 top-4">
							<NextPaymentIcon />
						</div>
					</div>
				</div>
				<div>
					<h3 className="mb-3 text-xl font-bold">Payment History</h3>
					<Table rows={[]} columns={columns} isLoading={isLoading} />
				</div>
			</div>
		</div>
	);
};

export default TenantHistory;
