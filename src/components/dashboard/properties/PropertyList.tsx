import PropertyItem from "./PropertyItem";
import { PropertyListType, PropertyType } from "../../../types/dashboard";

export default function PropertyList({ data }: { data: PropertyListType }) {
	return (
		<div className="">
			{data.length > 0 ? (
				<div className="gap-3 grid sm:grid-cols-2 lg:grid-cols-3">
					{data.map((item: PropertyType) => {
						return <PropertyItem key={item.id} item={item} />;
					})}
				</div>
			) : (
				<div>Property is empty</div>
			)}
		</div>
	);
}
