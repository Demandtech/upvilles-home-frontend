import { Select, SelectItem } from "@nextui-org/select";

function RentTrend({
	properties = [],
}: {
	properties: { _id: string; title: string }[];
}) {
	console.log(properties);
	return (
		<div className="lg:w-[45%] bg-white p-5 rounded-lg">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="font-medium text-lg">Rental Trend</h5>
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
		</div>
	);
}

export default RentTrend;
