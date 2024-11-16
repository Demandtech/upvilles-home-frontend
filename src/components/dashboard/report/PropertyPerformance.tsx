import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PropertyPerformance() {
  return (
    <div className="lg:w-[55%] bg-white rounded-lg px-5 py-10">
      <h5 className="font-medium text-lg mb-5">Property Performance Report</h5>
	  <div>
      <div className="bg-red-400 relative max-w-[150px] max-h-[150px] rounded-full">
        <Doughnut
          className="max-w-[150px] max-h-[150px]"
          data={{
            labels: ["Red", "Yellow", "Green", "Blue"],
            datasets: [
              {
                label: "# of votes",
                data: [12, 19, 3, 10],
                backgroundColor: ["#e74c3c", "#f1c40f", "#2ecc71", "#3498db"],
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
      </div>
	  </div>
    </div>
  );
}

export default PropertyPerformance;
