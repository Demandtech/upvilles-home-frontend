import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useTenant from "../../../hooks/useTenant";
import { setTenantDetails } from "../../../redux/slices/tenant";
import TenantInformation from "../../../components/dashboard/tenant/tenantDetails/TenantInformation";
import TenantHistory from "../../../components/dashboard/tenant/tenantDetails/TenantHistory";

export default function TenantDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleTenantHandler } = useTenant();
  const navigate = useNavigate();

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

  if (!singleTenant && !isLoading) {
    return (
      <div className="flex flex-col items-center pt-20 gap-5 px-3">
        <h3 className="text-4xl font-bold text-darkGrey text-center">
          Tenant not found!{" "}
          <button
            className="text-primary text-nowrap opacity-70 hover:opacity-100 transition-opacity duration-300 ease-linear"
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
    <div>
      <div className="bg-lightBg space-y-7 py-8 px-3 md:px-5">
        <TenantInformation loading={isLoading} tenant={singleTenant?.data} />
        <TenantHistory isLoading={isLoading} tenant={singleTenant?.data} />
      </div>
    </div>
  );
}
