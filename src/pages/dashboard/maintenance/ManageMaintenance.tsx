import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useEffect } from "react";
import MaintenanceForm from "../../../components/dashboard/maintenance/MaintenanceForm";

function ManageMaintenance() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle({ title: "Create Maintenance", showIcon: true }));
  }, []);
  return (
    <div className="px-3 md:px-6 py-5 bg-lightBg h-[calc(100vh-90px)]">
      <div className="bg-white rounded-xl mt-10 py-10 px-6 shadow-lg shadow-default-100">
        <MaintenanceForm />
      </div>
    </div>
  );
}

export default ManageMaintenance;
