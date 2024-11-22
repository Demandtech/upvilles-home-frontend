import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import SupportWrapper from "../../components/dashboard/support/SupportWrapper";
import { Helmet } from "react-helmet-async";

const Support = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle({ title: "Support", showIcon: false }));
  }, []);
  return (
    <>
      <Helmet>
        <title>Upvillehomes || Support - Dashboard</title>
      </Helmet>
      <SupportWrapper />
    </>
  );
};

export default Support;
