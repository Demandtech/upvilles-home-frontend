import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import PropertyList from "./PropertyList";
import { RootState } from "../../../redux/store";
import { PlusIcon } from "../../svgs";
import { useNavigate } from "react-router-dom";

const Properties = () => {
	const { properties } = useSelector((state: RootState) => state.dashboard);
	const navigate = useNavigate();
	
	return (
		<div className="bg-[#fafafa] px-3 py-5 sm:px-5 h-full">
			<div className="flex items-center mb-5 justify-between">
				<p className="font-bold sm:font-lg">All Properties</p>
				<Button
					startContent={<PlusIcon size={20} />}
					type="button"
					color="primary"
					size="sm"
					className="rounded-sm"
					onPress={() => navigate("/dashboard/properties/manage")}
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
