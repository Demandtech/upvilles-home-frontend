import {
	TotalHousesIconSvg,
	TotalTenantsIconSvg,
	OccupiedUnitsIconSvg,
	VacantUnitIconSvg,
} from "../../svgs";

import { Stats } from "../../../types/user";
import Counter from "../../common/Counter";

export default function Summary({ stats }: { stats: Stats }) {
	return (
		<div className="py-5 sm:py-8 px-3 sm:px-5">
			<div className="grid grid-cols-6 gap-2 items-center">
				<div className="col-span-6 lg:col-span-2">
					<h3 className="font-semibold text-2xl mb-3">Quick Summary</h3>
					<p className="text-xs text-[#667185] mb-5 lg:mb-0 pr-6">
						Get a comprehensive snapshot of your property management activities,
						accessing key information about properties, tenants, and maintenance
						schedules.
					</p>
				</div>
				<div className="space-y-3 col-span-3 lg:col-span-1 text-white p-4 rounded-xl bg-[#8BB6A2] shadow-sm">
					<TotalHousesIconSvg />
					<p className="text-xs text-[#f0e7e7]">Total Houses</p>

					<Counter labelColor="white" targetNumber={stats?.total_properties} />
				</div>
				<div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#4D4E8E] shadow-sm">
					<TotalTenantsIconSvg />
					<p className="text-xs text-[#f0e7e7]">Total Tenants</p>
					<Counter labelColor="white" targetNumber={stats?.total_tenants} />
				</div>
				<div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#636D79] shadow-sm">
					<OccupiedUnitsIconSvg />
					<p className="text-xs text-[f0e7e7]">Occupied Units</p>
					<Counter labelColor="white" targetNumber={stats?.occupied_units} />
				</div>
				<div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#284B63] shadow-sm">
					<VacantUnitIconSvg />
					<p className="text-xs text-[#f0e7e7]">Vacant Units</p>
					<Counter labelColor="white" targetNumber={stats?.empty_units} />
				</div>
			</div>
		</div>
	);
}
