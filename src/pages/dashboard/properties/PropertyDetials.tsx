import { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useParams, Params } from "react-router-dom";
import {
	TopWrapper,
	BottomWrapper,
} from "../../../components/dashboard/property/propertyDetails";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useProperty from "../../../hooks/useProperty";
import { setPropertyDetails } from "../../../redux/slices/property";
import { Helmet } from "react-helmet-async";
import useTenant from "../../../hooks/useTenant";
import { setTenants } from "../../../redux/slices/tenant";
import { RootState } from "../../../redux/store";

const PropertyDetials: FC = () => {
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const dispatch = useDispatch();
	const { id }: Readonly<Params<string>> = useParams();
	const { getSingleProperty } = useProperty();
	const { allTenantsHandler } = useTenant();
	const { tenants, meta } = useSelector((state: RootState) => state.tenant);

	const {
		data: singleProperty,
		isSuccess,
		isLoading: isPropertyLoading,
	} = useQuery<AxiosResponse, Error>({
		queryKey: ["single_property", id],
		queryFn: () => getSingleProperty(id as string),
		enabled: !!id,
	} as UseQueryOptions<AxiosResponse, Error>);

	const {
		data: propertyTenants,
		isSuccess: isTenantSuccess,
		isLoading: isTenantsLoading,
	} = useQuery<AxiosResponse, Error>({
		queryKey: [
			"tenants",
			singleProperty?.data._id,
			page,
			sortBy.column,
			sortBy.direction,
		],
		queryFn: () =>
			allTenantsHandler(
				singleProperty?.data._id as string,
				page,
				sortBy.column,
				sortBy.direction
			),
		enabled: !!singleProperty?.data._id,
	} as UseQueryOptions<AxiosResponse, Error>);

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

	useEffect(() => {
		dispatch(setTitle({ title: "Property Details", showIcon: true }));
		window.scrollTo(0, 0);
	}, []);

	console.log(singleProperty?.data.available_units);

	return (
		<div className="px-3 flex flex-col py-3 gap-10  sm:px-5">
			<Helmet>
				<title>Upvillehomes | Property Details</title>
			</Helmet>
			<TopWrapper
				thumbnails={singleProperty?.data.images_url || []}
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
