import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useEffect } from "react";

function ManageMaintenance() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle({ title: "Create Maintenance", showIcon: true }));
  }, []);
  return <div>ManageMaintenance</div>;
}

export default ManageMaintenance;
