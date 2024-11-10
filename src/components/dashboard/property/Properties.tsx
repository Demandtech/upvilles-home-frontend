import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import PropertyList from "./PropertyList";
import { PlusIcon } from "../../svgs";
import { useNavigate } from "react-router-dom";
import PropertyCardSkeleton from "../../ui/skeletons/PropertyCardSkeleton";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import { setProperties } from "../../../redux/slices/property";

const Properties = () => {
	const navigate = useNavigate();
	const { allProperties } = useProperty();
	const dispatch = useDispatch();

	const {
		data: propertiesData,
		isLoading,
		isSuccess,
	} = useQuery<AxiosResponse, Error>({
		queryKey: ["properties"],
		queryFn: allProperties,
	} as UseQueryOptions<AxiosResponse, Error>);

	useEffect(() => {
		if (!isSuccess || !propertiesData.data) return;

		dispatch(
			setProperties({
				properties: propertiesData.data.properties,
				meta: propertiesData.data.meta,
			})
		);
	}, [isSuccess, dispatch]);

	return (
		<div className="bg-[#fafafa] px-3 py-5 sm:px-5 h-full">
			<div className="flex items-center mb-5 justify-between">
				<h4 className="font-bold text-lg md:text-xl">All Properties</h4>
				<Button
					startContent={<PlusIcon size={20} />}
					type="button"
					color="primary"
					size="sm"
					className="rounded-sm"
					onPress={() => navigate("/dashboard/properties/add")}
				>
					Add Property
				</Button>
			</div>
			<div>
				{isLoading ? (
					<div className="grid lg:grid-cols-4 gap-4">
						{["", "", "", ""].map((_, index) => (
							<PropertyCardSkeleton isLoaded={!isLoading} key={index} />
						))}
					</div>
				) : (
					<PropertyList data={propertiesData?.data.properties} />
				)}
			</div>
		</div>
	);
};

export default Properties;
