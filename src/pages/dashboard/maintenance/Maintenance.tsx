import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { Schedule, Metrics } from "../../../components/dashboard/maintenance";

const Maintenance = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle({ title: "Maintenance", showIcon: false }));
  }, []);

  return (
    <div>
      <Metrics />
      <Schedule />
    </div>
  );
};

export default Maintenance;
