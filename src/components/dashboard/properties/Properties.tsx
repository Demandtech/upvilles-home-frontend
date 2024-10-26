import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import PropertyList from "./PropertyList";
import { RootState } from "../../../redux/store";


const Properties = () => {
	const { properties } = useSelector((state: RootState) => state.account);
	return (
		<div className="bg-[#fafafa] px-3 py-5 sm:px-5 h-full">
			<div className="flex items-center mb-5 justify-between">
				<p>All Properties</p>
				<Button
					startContent={<p className="text-lg">+</p>}
					type="button"
					color="primary"
					size="sm"
					className="rounded-sm"
				>
					Add Property
				</Button>
			</div>
			<div>
				<PropertyList data={properties} />
			</div>
		</div>
	);
};

export default Properties;
