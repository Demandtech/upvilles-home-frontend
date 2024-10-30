import {
  TotalHousesIconSvg,
  TotalTenantsIconSvg,
  OccupiedUnitsIconSvg,
  VacantUnitIconSvg,
} from "../../svgs";


export default function Summary() {
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
        <div className="space-y-3 col-span-3 lg:col-span-1 text-white p-4 rounded-xl bg-[#8BB6A2]">
          <TotalHousesIconSvg />
          <p className="text-xs text-[#f0e7e7]">Total Houses</p>
          <p className="font-medium text-xl">10</p>
        </div>
        <div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#4D4E8E]">
          <TotalTenantsIconSvg />
          <p className="text-xs text-[#f0e7e7]">Total Tenants</p>
          <p className="font-medium text-xl">10</p>
        </div>
        <div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#636D79]">
          <OccupiedUnitsIconSvg />
          <p className="text-xs text-[f0e7e7]">Occupied Units</p>
          <p className="font-medium text-xl">8</p>
        </div>
        <div className="space-y-3 col-span-3 lg:col-span-1 p-4 text-white rounded-xl bg-[#284B63]">
          <VacantUnitIconSvg />
          <p className="text-xs text-[#f0e7e7]">Vacant Units</p>
          <p className="font-medium text-xl">2</p>
        </div>
        {/* <div className="lg:col-span-1"></div> */}
      </div>
    </div>
  );
}
