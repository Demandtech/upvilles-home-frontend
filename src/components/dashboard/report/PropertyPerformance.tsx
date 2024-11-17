import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const items = [
	{
		label: "Red",
		value: 3,
		color: "#e74c3c",
		percentage: 2.7,
	},
	{
		label: "Yellow",
		value: 12,
		color: "#f1c40f",
		percentage: 26.7,
	},
	{
		label: "Green",
		value: 10,
		color: "#2ecc71",
		percentage: 6.7,
	},
	{
		label: "Blue",
		value: 19,
		color: "#3498db",
		percentage: 42.2,
	},
	{
		label: "Others",
		value: 1,
		color: "grey",
		percentage: 1.3,
	},
];

function PropertyPerformance({ propertyReport }: { propertyReport: any }) {
	const labels = items.map((item) => item.label);
	const data = items.map((item) => item.value);
	const backgroundColor = items.map((item) => item.color);

	const sortedData = items.sort((a, b) => b.value - a.value);

	// console.log(sortedData);

	return (
		<div className="lg:w-[55%] flex flex-col justify-center bg-white rounded-lg px-5 py-10">
			<h5 className="font-semibold text-lg sm:text-xl mb-8 text-center md:text-start">
				Property Performance Report
			</h5>
			<div className="flex flex-col md:flex-row items-center gap-8">
				<div className="relative w-full max-w-[180px] rounded-full">
					<Doughnut
						className="max-w-[180px] max-h-[180px]"
						data={{
							labels: labels || [],
							datasets: [
								{
									label: "# of votes",
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
						<p className="text-darkGrey pb-1 text-xs">Total Properties</p>
						<p className="font-semibold text-sm sm:text-base">14</p>
					</div>
				</div>
				<div className="w-full">
					{labels.length > 0 &&
						sortedData.map((label, index) => {
							// const percentage = ((data[index] / total) * 100).toFixed(1);

							return (
								<div
									key={index}
									className="text-[#475367] flex border-b-2 border-dotted py-3 text-sm w-full last-of-type:border-b-0"
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
									<p className="ml-auto text-xs">
										{label.percentage}% Income Earnings
									</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default PropertyPerformance;
