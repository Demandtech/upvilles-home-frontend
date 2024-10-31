import Counter from "../../common/Counter";
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
          <div className="flex-1 w-full space-y-3 bg-white p-4 rounded-xl shadow-sm">
            <FacilityIcon />
            <p className="text-nowrap text-sm text-darkGrey">
              Total Facilities Being Maintained
            </p>

            <Counter labelColor="#212121" targetNumber={10} />
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl shadow-sm">
            <UpcomingMaintenance />
            <p className="text-sm text-darkGrey text-nowrap">
              Upcoming Maintenance
            </p>
            <Counter labelColor="#212121" targetNumber={10} />
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl shadow-sm">
            <OverDueIcon />
            <p className="text-sm text-darkGrey text-nowrap">Overdue Tasks</p>
            <Counter labelColor="#212121" targetNumber={8} />
          </div>
          <div className="flex-1 w-full space-y-3 p-4 bg-white rounded-xl shadow-sm">
            <CompletedTask />
            <p className="text-sm text-darkGrey">Completed Tasks</p>
            <Counter labelColor="#212121" targetNumber={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
