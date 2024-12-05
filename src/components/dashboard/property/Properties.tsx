import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import PropertyList from "./PropertyList";
import { PlusIcon } from "../../svgs";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyCardSkeleton from "../../ui/skeletons/PropertyCardSkeleton";
import { useEffect, useState } from "react";
import useProperty from "../../../hooks/useProperty";
import { setProperties } from "../../../redux/slices/property";
import { Pagination } from "@nextui-org/pagination";
import { RootState } from "../../../redux/store";
import { Stats } from "../../../types/user";

const Properties = ({ stats }: { stats: Stats }) => {
	const navigate = useNavigate();
	const { allProperties } = useProperty();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const { properties, meta } = useSelector(
		(state: RootState) => state.property
	);
	const [searchParams] = useSearchParams();
	let limit = 8;
	let search = searchParams.get("q") as string;

	const {
		data: propertiesData,
		isSuccess,
		isLoading,
	} = allProperties(page, search, limit);

	useEffect(() => {
		dispatch(
			setProperties({
				properties: propertiesData?.data.properties,
				meta: propertiesData?.data.meta,
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
						{Array.from({ length: stats?.total_properties })
							.map((_, index) => (
								<PropertyCardSkeleton isLoaded={!isLoading} key={index} />
							))
							.slice(limit)}
					</div>
				) : (
					<PropertyList data={properties} />
				)}
			</div>
			{meta?.total_page > 1 && (
				<div className="pt-10 flex justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="primary"
						page={page}
						total={meta?.total_page}
						onChange={(page) => setPage && setPage(page)}
						size="md"
					/>
				</div>
			)}
		</div>
	);
};

export default Properties;
