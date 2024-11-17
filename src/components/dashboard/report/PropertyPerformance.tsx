import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PropertyReportProps = {
  label: string;
  color: string;
  value: number;
  percentage: string;
};

type PropertyPerformanceProps = {
  propertyReport: PropertyReportProps[];
  totalProperties: number;
};

function PropertyPerformance({
  propertyReport,
  totalProperties,
}: PropertyPerformanceProps) {
  const labels = propertyReport?.map((item) => item.label);
  const data = propertyReport?.map((item) => item.value);
  const backgroundColor = propertyReport?.map((item) => item.color);

  return (
    <div className="lg:w-[55%] flex flex-col justify-center bg-white rounded-lg px-5 py-10">
      <h5 className="font-semibold text-lg sm:text-xl mb-8 text-center md:text-start">
        Property Performance Report
      </h5>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-full max-w-[200px] rounded-full">
          <Doughnut
            aria-label="Property earning chart"
            className="max-w-[200px] w-full h-full max-h-[200px]"
            data={{
              labels: labels || [],
              datasets: [
                {
                  label: "Total Income earnings",
                  data: data,
                  backgroundColor: backgroundColor,
                  borderWidth: 1,
                  weight: 1,
                },
              ],
            }}
            options={{
              cutout: "75%",
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
          <div className="text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <p className="text-darkGrey pb-1 text-sm">Total Properties</p>
            <p className="font-semibold text-lg">{totalProperties || 0}</p>
          </div>
        </div>
        <div className="w-full">
          {labels?.length > 0 ? (
            propertyReport.map((label, index) => {
              return (
                <div
                  key={index}
                  className="text-[#475367] gap-4 flex border-b-2 border-dotted py-3 text-sm w-full last-of-type:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        background: label.color,
                      }}
                      className={`w-2.5 h-2.5 rounded-full`}
                    ></div>
                    <p>{label.label}</p>
                  </div>
                  <p className="ml-auto">{label.percentage}% Income Earnings</p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-center text-gray-500">
              No data available to display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyPerformance;
