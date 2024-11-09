import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useTenant from "../../../hooks/useTenant";
import { setTenantDetails } from "../../../redux/slices/tenant";
import TenantInformation from "../../../components/dashboard/tenant/tenantDetails/TenantInformation";
import TenantHistory from "../../../components/dashboard/tenant/tenantDetails/TenantHistory";

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
		dispatch(setTitle({ showIcon: true, title: "Tenant Profile" }));
	}, [id]);

	return (
		<div>
			<div className="bg-lightBg space-y-7 py-8 px-3 md:px-5">
				<TenantInformation isLoading={isLoading} tenant={singleTenant?.data} />
				<TenantHistory isLoading={isLoading} tenant={singleTenant?.data} />
			</div>
		</div>
	);
}
