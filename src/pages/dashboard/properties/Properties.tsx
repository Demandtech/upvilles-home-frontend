import { FC, useEffect } from "react";
import { Summary, Properties } from "../../../components/dashboard/properties";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const { user , stats} = useSelector((state: RootState) => state.dashboard);


  console.log({ user , stats})

  useEffect(() => {
    dispatch(setTitle({ title: "Dashboard", showIcon: false }));
  }, []);

  return (
    <div>
      <Summary />
      <Properties />
    </div>
  );
};

export default Dashboard;
