import { FC } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";
import { useParams } from "react-router-dom";
import { TopWrapper } from "../../components/dashboard/propertyDetails";

const PropertyDetials: FC = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	console.log(id)

	useEffect(() => {
		dispatch(setTitle("Property Details"));
	}, []);
	return (
		<div className="px-3 py-3  sm:px-5">
			<TopWrapper />
		</div>
	);
};

export default PropertyDetials;
