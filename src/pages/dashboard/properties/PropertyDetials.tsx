import { FC } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useParams, Params } from "react-router-dom";
import {
	TopWrapper,
	BottomWrapper,
} from "../../../components/dashboard/propertyDetails";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useProperty from "../../../hooks/useProperty";
import { setPropertyDetails } from "../../../redux/slices/dashboard";
import { Helmet } from "react-helmet-async";

const PropertyDetials: FC = () => {
	const dispatch = useDispatch();
	const { id }: Readonly<Params<string>> = useParams();
	const { getSingleProperty } = useProperty();

	const { data: singleProperty, isSuccess } = useQuery<AxiosResponse, Error>({
		queryKey: ["single_property", id],
		queryFn: () => getSingleProperty(id as string),
		enabled: !!id,
	} as UseQueryOptions<AxiosResponse, Error>);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setPropertyDetails(singleProperty.data));
		}
	}, [isSuccess, dispatch, singleProperty]);

	useEffect(() => {
		dispatch(setTitle({ title: "Property Details", showIcon: true }));
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="px-3 flex flex-col py-3 gap-10  sm:px-5">
			<Helmet>
				<title>Upvillehomes | Property Details</title>
			</Helmet>
			<TopWrapper
				thumbnails={singleProperty?.data.images_url || []}
				id={id || ""}
			/>
			<BottomWrapper />
		</div>
	);
};

export default PropertyDetials;
