import { Select, SelectItem } from "@nextui-org/select";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	Chart,
} from "chart.js";
import { useRef } from "react";
import { PropertyType } from "../../../types/property";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

// export const options = {
// 	responsive: true,
// 	plugins: {
// 		legend: {
// 			display: false,
// 		},
// 	},
// 	scales: {
// 		x: {
// 			grid: {
// 				display: false,
// 			},
// 			ticks: {
// 				display: false,
// 			},
// 		},
// 		y: {
// 			grid: {
// 				display: false,
// 			},
// 			ticks: {
// 				stepSize: 1,
// 				callback: (value: string) => `Unit ${value}`,
// 				color: "#667185",
// 				font: {
// 					size: 15,
// 				},
// 			},
// 		},
// 	},
// };

export const options: ChartOptions<"bar"> = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},

	backgroundColor: "#E6E5FB",

	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
		y: {
			grid: {
				display: false,
				drawTicks: true,
			},
			ticks: {
				display: false,
				stepSize: 1,
				callback: (value: string | number) => `Unit ${value}`,
				color: "#667185",
				// minRotation: 10,
				font: {
					size: 15,
				},
			},
			beginAtZero: false,

			// borderColor: "transparent", // Remove bottom border
			// borderWidth: 0,
		},
	},
};

const labels = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
];

function RentTrend({ properties = [] }: { properties: PropertyType[] }) {
	const chartRef = useRef<Chart<"bar", number[]>>(null);

	const data = {
		labels,
		datasets: [
			{
				label: "Units trend",
				data: [1, 2, 3, 4, 3, 3, 2, 4, 5, 6],
			},
		],
	};

	const roundedBarsPlugin = {
		id: "roundedBars",
		afterDatasetDraw(chart: ChartJS) {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);

			const stripeWidth = 2; // Width of each stripe
			const patternCanvas = document.createElement("canvas");
			const patternCtx = patternCanvas.getContext("2d");

			patternCanvas.width = stripeWidth * 2;
			patternCanvas.height = chart.height;

			if (!patternCtx) return;

			patternCtx.fillStyle = "rgba(128, 97, 219, 0.1)";
			patternCtx.fillRect(0, 0, stripeWidth, patternCanvas.height);
			patternCtx.fillStyle = "#E6E5FB";
			patternCtx.fillRect(stripeWidth, 0, stripeWidth, patternCanvas.height);

			const stripePattern = ctx.createPattern(patternCanvas, "repeat");

			const gradientBackground = ctx.createLinearGradient(
				0,
				0,
				0,
				chart.height
			);
			gradientBackground.addColorStop(0.17, "rgba(128, 97, 219, 0.38)");
			gradientBackground.addColorStop(0.7527, "#0077B6");

			meta.data.forEach((bar: any) => {
				const { x, y, base, width } = bar;
				const radius = 5;

				if (!bar) return;

				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x - width / 2, chart.chartArea.bottom);
				ctx.lineTo(x - width / 2, chart.chartArea.top);
				ctx.arcTo(
					x - width / 2,
					chart.chartArea.top,
					x + width / 2,
					chart.chartArea.top,
					radius
				);

				ctx.arcTo(
					x + width / 2,
					chart.chartArea.top,
					x + width / 2,
					chart.chartArea.top + radius,
					radius
				);
				ctx.lineTo(x + width / 2, chart.chartArea.bottom);
				ctx.closePath();
				ctx.fillStyle = stripePattern || "#ffffff";
				ctx.fill();
				ctx.restore();

				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x - width / 2, base);
				ctx.lineTo(x - width / 2, y + radius);
				ctx.arcTo(x - width / 2, y, x + width / 2, y, radius);
				ctx.arcTo(x + width / 2, y, x + width / 2, y + radius, radius);
				ctx.lineTo(x + width / 2, base);
				ctx.closePath();
				ctx.fillStyle = gradientBackground;
				ctx.fill();
				ctx.restore();
			});
		},
	};

	return (
		<div className="lg:w-[45%] bg-white p-5 rounded-lg flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="font-semibold text-lg sm:text-xl">Rental Trend</h5>
				</div>
				<div className="w-1/2">
					<Select
						color="primary"
						aria-label="Property selector"
						variant="bordered"
						className="w-full"
						placeholder="Select Property"
						radius="sm"
						items={properties?.map((item: { _id: string; title: string }) => ({
							key: item._id,
							label: item.title,
						}))}
					>
						{properties?.map((property) => {
							return (
								<SelectItem
									className="text-nowrap w-full line-clamp-1 overflow-x-hidden"
									color="primary"
									key={property._id}
								>
									{property.title}
								</SelectItem>
							);
						})}
					</Select>
				</div>
			</div>
			<div className="my-5">
				<p className="mb-3 text-darkGrey">Units trend</p>
				<h1 className="font-medium text-lg">5 Bedroom Detached Duplex</h1>
			</div>
			<Bar
				className="mt-auto"
				options={options}
				data={data}
				ref={chartRef}
				plugins={[roundedBarsPlugin]}
			/>
		</div>
	);
}

export default RentTrend;
