import {
  FacilityIcon,
  UpcomingMaintenance,
  OverDueIcon,
  CompletedTask,
} from "../../svgs";

export default function App() {
  return (
    <div className="py-5 sm:py-8 px-3 sm:px-5">
      <div className="bg-lightBg p-5">
        <h4 className="font-bold sm:font-lg mb-5">Maintenance Metrics</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 w-full space-y-3 bg-white p-4 rounded-xl ">
            <FacilityIcon />
            <p className="text-nowrap text-sm text-darkGrey">
              Total Facilities Being Maintained
            </p>
            <p className="font-medium text-2xl text-default">10</p>
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl">
            <UpcomingMaintenance />
            <p className="text-sm text-darkGrey text-nowrap">
              Upcoming Maintenance
            </p>
            <p className="font-medium text-2xl text-default">10</p>
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl ">
            <OverDueIcon />
            <p className="text-sm text-darkGrey text-nowrap">Overdue Tasks</p>
            <p className="font-medium text-2xl text-default">8</p>
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl ">
            <CompletedTask />
            <p className="text-sm text-darkGrey">Completed Tasks</p>
            <p className="font-medium text-2xl text-default">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
