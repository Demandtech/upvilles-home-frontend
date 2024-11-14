import { formatNaira } from "../../../utils/formatCurrency";
import Counter from "../../common/Counter";
import {
	TotalPropertyManage,
	AllMaintenanceCost,
	OverdueMaintenanceManage,
	UpcomingMaintenanceManage,
} from "../../svgs";
import PropertyPerformance from "./PropertyPerformance";
import RentTrend from "./RentTrend";

function ReportTopWrapper({
	properties,
	overdue_maintenance = 0,
	total_maintenance_cost = 0,
	occupancy_rate = "0%",
	total_properties = 0,
}: {
	properties: { _id: string; title: string }[];
	overdue_maintenance: number;
	total_maintenance_cost: number;
	occupancy_rate: string;
	total_properties: number;
}) {
	return (
		<div className="mb-5">
			<div className="mb-5 flex gap-3 flex-wrap">
				<div className="flex-1 bg-white gap-2 flex flex-col py-3 px-5 rounded-[10px] border border-[#E4E7EC] shadow-lg shadow-default-100">
					<TotalPropertyManage />
					<p className="text-nowrap text-darkGrey text-xs leading-5 font-normal">
						Total Properties Managed
					</p>
					<Counter
						labelColor="#212121"
						targetNumber={total_properties ? total_properties : 0}
					/>
					{/* <p className="text-xl font-medium">total_properties}</p> */}
				</div>
				<div className="flex-1 bg-white gap-2 flex flex-col py-3 px-5 rounded-[10px] border border-[#E4E7EC] shadow-lg shadow-default-100">
					<UpcomingMaintenanceManage />
					<p className="text-nowrap text-darkGrey text-xs leading-5 font-normal">
						Occupancy Rate
					</p>
					<p className="text-xl font-medium">{occupancy_rate}</p>
				</div>
				<div className="flex-1 bg-white gap-2 flex flex-col py-3 px-5 rounded-[10px] border border-[#E4E7EC] shadow-lg shadow-default-100">
					<OverdueMaintenanceManage />
					<p className="text-nowrap text-darkGrey text-xs leading-5 font-normal">
						Overdue Maintainance Task
					</p>
					<Counter labelColor="#212121" targetNumber={overdue_maintenance} />
					{/* <p className="text-xl font-medium">{overdue_maintenance}</p> */}
				</div>
				<div className="flex-1 bg-white gap-2 flex flex-col py-3 px-5 rounded-[10px] border border-[#E4E7EC] shadow-lg shadow-default-100">
					<AllMaintenanceCost />
					<p className="text-nowrap text-darkGrey text-xs leading-5 font-normal">
						{" "}
						Total Maintenance Costs
					</p>
					<p className="text-xl font-medium">
						{formatNaira(total_maintenance_cost)}
					</p>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row gap-5">
				<PropertyPerformance />
				<RentTrend properties={properties} />
			</div>
		</div>
	);
}

export default ReportTopWrapper;
