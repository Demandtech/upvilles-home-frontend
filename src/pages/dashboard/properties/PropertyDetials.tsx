import { useEffect, useState, FC, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import {
	useParams,
	Params,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import {
	TopWrapper,
	BottomWrapper,
} from "../../../components/dashboard/property/propertyDetails";
import useProperty from "../../../hooks/useProperty";
import { setPropertyDetails } from "../../../redux/slices/property";
import { Helmet } from "react-helmet-async";
import useTenant from "../../../hooks/useTenant";
import { setTenants } from "../../../redux/slices/tenant";
import { RootState } from "../../../redux/store";

const PropertyDetials: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id }: Readonly<Params<string>> = useParams();
	const { tenants, meta } = useSelector((state: RootState) => state.tenant);
	const [searchParams] = useSearchParams();

	const { getSingleProperty } = useProperty();
	const { allTenantsHandler } = useTenant();

	const [page, setPage] = useState(1);
	const limit = 5;
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const search = searchParams.get("q");

	const {
		data: singleProperty,
		isSuccess,
		isLoading: isPropertyLoading,
	} = getSingleProperty(id as string);

	const {
		data: propertyTenants,
		isSuccess: isTenantSuccess,
		isLoading: isTenantsLoading,
	} = allTenantsHandler(
		singleProperty?.data._id as string,
		page,
		sortBy.column,
		sortBy.direction,
		search as string,
		limit
	);

	useEffect(() => {
		if (isTenantSuccess) {
			dispatch(setTenants(propertyTenants.data));
		}
	}, [propertyTenants, isTenantSuccess]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setPropertyDetails(singleProperty.data));
		}
	}, [isSuccess, dispatch, singleProperty]);

	useLayoutEffect(() => {
		dispatch(setTitle({ title: "Property Details", showIcon: true }));
	}, []);

	if (!singleProperty && !isPropertyLoading) {
		return (
			<div className="flex flex-col items-center pt-20 gap-5 px-3">
				<h3 className="text-4xl font-bold text-darkGrey text-center">
					Property not found!{" "}
					<button
						className="text-primary opacity-70 hover:opacity-100 transition-opacity duration-300 ease-linear"
						onClick={() => navigate(-1)}
					>
						{" "}
						Go Back?
					</button>
				</h3>
			</div>
		);
	}

	return (
		<div className="px-3 flex flex-col py-3 gap-10  sm:px-5">
			<Helmet>
				<title>Upvillehomes | Property Details</title>
			</Helmet>
			<TopWrapper
				thumbnails={
					singleProperty?.data.images.map((image: string) =>
						JSON.parse(image)
					) || []
				}
				id={id || ""}
				isLoading={isPropertyLoading}
			/>
			<BottomWrapper
				page={page}
				setPage={setPage}
				tenants={tenants}
				isLoading={isTenantsLoading}
				totalPage={meta?.total_page}
				setSortBy={setSortBy}
				currentPropertyId={id as string}
				isVacant={singleProperty?.data.available_units.length > 0}
			/>
		</div>
	);
};

export default PropertyDetials;
