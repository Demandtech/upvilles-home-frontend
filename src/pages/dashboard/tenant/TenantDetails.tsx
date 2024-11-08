import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/spinner";
import useTenant from "../../../hooks/useTenant";
import { setTenantDetails } from "../../../redux/slices/tenant";

export default function TenantDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { singleTenantHandler } = useTenant();

	const {
		data: singleTenant,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ["tenant_details", id],
		queryFn: () => singleTenantHandler(id as string),
		enabled: !!id,
	});

	useEffect(() => {
		if (singleTenant && isSuccess) {
			dispatch(setTenantDetails(singleTenant.data));
		}
	}, [isSuccess, singleTenant]);

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Tenant Details" }));
	}, [id]);

	return (
		<div>
			{isLoading ? (
				<div className="w-full h-full flex flex-col items-center justify-center gap-5 pt-20">
					<Spinner label="Loading..." color="primary" size="lg" />
				</div>
			) : (
				<p>Tenant Details</p>
			)}
		</div>
	);
}
