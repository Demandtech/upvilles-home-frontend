import { FC } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useParams, Params } from "react-router-dom";
import {
  TopWrapper,
  BottomWrapper,
} from "../../../components/dashboard/propertyDetails";

const PropertyDetials: FC = () => {
  const dispatch = useDispatch();
  const { id }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    dispatch(setTitle({ title: "Property Details", showIcon: true }));
  }, []);

  return (
    <div className="px-3 flex flex-col py-3 gap-3  sm:px-5">
      <TopWrapper id={id ? id : ""} />
      <BottomWrapper />
    </div>
  );
};

export default PropertyDetials;
