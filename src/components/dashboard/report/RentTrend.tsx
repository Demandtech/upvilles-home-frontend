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
} from "chart.js";
import { PropertyType } from "../../../types/property";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import { SharedSelection } from "@nextui-org/system";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useTenant from "../../../hooks/useTenant";
import { Tenant } from "../../../types/tenant";
import { formatNaira } from "../../../utils/formatCurrency";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options: ChartOptions<"bar"> = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			displayColors: false,

			callbacks: {
				label: (tooltipItem) => {
					const value = tooltipItem.raw as number;
					return formatNaira(value);
				},
			},
		},
	},

	backgroundColor: "#E6E5FB",

	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			grid: {
				display: true,
			},
			ticks: {
				stepSize: 100000,
				callback: (value: number | string) => formatNaira(Number(value), 0),
				color: "#667185",

				font: {
					size: 12,
				},
			},
		},
	},
};

function RentTrend({ properties = [] }: { properties: PropertyType[] }) {
	const { allTenantsHandler } = useTenant();
	const [selectedProperty, setSelectedProperty] = useState<PropertyType>();
	const [value, setValue] = useState<SharedSelection>(
		new Set(properties[0]?._id ? [properties[0]._id] : [])
	);

	const items = properties?.map((item: { _id: string; title: string }) => ({
		key: item._id,
		label: item.title,
	}));

	const roundedBarsPlugin = {
		id: "roundedBars",
		afterDatasetDraw(chart: ChartJS) {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);

			const stripeWidth = 2;
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

	const { data: tenants, isLoading } = useQuery<AxiosResponse, Error>({
		queryKey: ["tenants", selectedProperty],
		queryFn: () =>
			allTenantsHandler(selectedProperty?._id as string, 1, "", "", 20),
		enabled: !!selectedProperty?._id,
	} as UseQueryOptions<AxiosResponse, Error>);

	const labels = tenants?.data?.tenants?.map(
		(tenant: Tenant) => `Unit ${tenant.assigned_unit}`
	);
	const units = tenants?.data?.tenants?.map(
		(tenant: Tenant) => tenant.rent_paid
	);

	const data = {
		labels,
		datasets: [
			{
				data: units,
			},
		],
	};

	const findProperty = useCallback(
		(key: string) => {
			return properties.find((item) => item._id === key);
		},
		[properties]
	);

	useEffect(() => {
		if (!items.length) return;

		const defaultValue = new Set([items[0]?.key]);
		setValue(defaultValue);

		const property = findProperty(items[0]?.key);

		if (property) {
			setSelectedProperty(property);
		}
	}, [properties]);

	useEffect(() => {
		const property = findProperty(value.anchorKey as string);

		if (property) {
			setSelectedProperty(property);
		}
	}, [value, properties]);

	return (
		<div className="lg:w-[45%] bg-white p-5 rounded-lg flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="font-semibold text-lg sm:text-xl">Rental Trend</h5>
				</div>
				<div className="w-1/2">
					<Select
						aria-label="Units rent trend"
						variant="bordered"
						placeholder="Select a property"
						selectedKeys={value}
						className="max-w-xs"
						onSelectionChange={setValue}
						isLoading={isLoading}
						selectionMode="single"
					>
						{items.map((property) => (
							<SelectItem color="primary" key={property.key}>
								{property.label}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>
			<div className="my-5">
				<p className="mb-5 text-darkGrey">Units trend</p>
				<h5 className="font-medium text-lg">{selectedProperty?.title}</h5>
			</div>
			<Bar
				className="mt-auto"
				options={options}
				data={data}
				plugins={[roundedBarsPlugin]}
				aria-label="Rent trend chart"
			/>
		</div>
	);
}

export default RentTrend;
