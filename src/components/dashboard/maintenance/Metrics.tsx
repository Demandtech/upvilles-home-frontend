import { Stats } from "../../../types/user";
import Counter from "../../common/Counter";
import {
  FacilityIcon,
  UpcomingMaintenance,
  OverDueIcon,
  CompletedTask,
} from "../../svgs";

export default function Metric({ stats }: { stats: Stats }) {
  return (
    <div className="py-5 sm:py-8 px-3 sm:px-5" id="metric">
      <div className="bg-lightBg p-5 rounded-lg shadow-lg shadow-default-100">
        <h4 className="font-bold text-lg md:text-xl mb-5">
          Maintenance Metrics
        </h4>
        <div className="flex gap-3 flex-wrap">
          <div className="min-w-36 flex-1 flex flex-col gap-1 sm:gap-2 bg-white py-2 px-3 sm:py-4 sm:px-4 rounded-xl shadow-lg shadow-default-100">
            <FacilityIcon className="w-7 sm:w-8 md:w-9" />
            <p className="text-sm text-darkGrey">Total Facilities Maintained</p>
            <div className="mt-auto">
              <Counter
                labelColor="#212121"
                targetNumber={stats ? stats?.total_maintenance : 0}
              />
            </div>
          </div>
          <div className="min-w-36 flex-1 flex flex-col gap-1 sm:gap-2  py-2 px-3 sm:py-4 sm:px-4 bg-white rounded-xl shadow-lg shadow-default-100">
            <UpcomingMaintenance className="w-7 sm:w-8 md:w-9" />
            <p className="text-sm text-darkGrey">Upcoming Maintenance</p>
            <div className="mt-auto">
              <Counter
                labelColor="#212121"
                targetNumber={stats ? stats.schedule_maintenance : 0}
              />
            </div>
          </div>
          <div className="min-w-36 flex-1 flex flex-col gap-1 sm:gap-2 py-2 px-3 sm:py-4 sm:px-4 bg-white rounded-xl shadow-lg shadow-default-100">
            <OverDueIcon className="w-7 sm:w-8 md:w-9" />
            <p className="text-sm text-darkGrey">Overdue Tasks</p>
            <div className="mt-auto">
              <Counter
                labelColor="#212121"
                targetNumber={stats ? stats.overdue_maintenance : 0}
              />
            </div>
          </div>
          <div className="min-w-36 flex-1 flex flex-col gap-1 sm:gap-2 py-2 px-3 sm:py-4 sm:px-4 bg-white rounded-xl shadow-lg shadow-default-100">
            <CompletedTask className="w-7 sm:w-8 md:w-9" />

            <p className="text-sm text-darkGrey">Completed Tasks</p>
            <div className="mt-auto">
              <Counter
                labelColor="#212121"
                targetNumber={stats ? stats.completed_maintenance : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
