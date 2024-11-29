import moment from "moment";
import { Tenant } from "../../../../types/tenant";
import {
  TenantAssignedProperty,
  TenantStartDate,
  TenantEndDate,
  TenantUnit,
  TenantName,
  TenantPhone,
} from "../../../svgs";
import { Skeleton } from "@nextui-org/skeleton";

const TenantInformation = ({
  tenant,
  loading,
}: {
  tenant: Tenant;
  loading: boolean;
}) => {
  return (
    <div className="bg-white shadow-lg shadow-default-100 rounded-lg py-10 px-5">
      <div className="text-center max-w-[600px] mx-auto mb-7">
        <h3 className="text-default font-bold text-xl mb-2">
          Tenant Information
        </h3>
        <p className="text-darkGrey text-xs sm:text-sm lg:text-base">
          To make the most out of your Upville Homes account, you can easily
          customize your experience by turning settings on or off whenever
          needed.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-7 max-w-[700px] mx-auto">
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantName className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-nowrap">Tenant Name</h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {tenant?.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantPhone className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-nowrap">Phone Number</h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {tenant?.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantUnit className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-nowrap">Unit Number</h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {tenant?.assigned_unit}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantAssignedProperty className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-nowrap">
              Assigned Property
            </h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {tenant?.assigned_property.title}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantStartDate className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-nowrap">Start Date</h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {moment(tenant?.start_date).format("MMMM DD, YYYY")}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div>
            <TenantEndDate className="w-10 h-10" />
          </div>
          <div>
            <h5 className="font-semibold text-sm">End Date</h5>
            {loading ? (
              <TenantSkeleton isLoaded={!loading} />
            ) : (
              <p className="text-sm text-[#344054] text-nowrap">
                {moment(tenant?.end_date).format("MMMM DD, YYYY")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantSkeleton = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <Skeleton isLoaded={isLoaded}>
      <div className="h-[16px] rounded-md bg-default-100" />
    </Skeleton>
  );
};

export default TenantInformation;
