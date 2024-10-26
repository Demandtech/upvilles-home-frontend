import { Card, CardBody } from "@nextui-org/card";
import { PropertyType } from "../../../types/account";
import Button from "../../ui/Button";
import imgTemp from "../../../assets/images/exp-img1.png";
import { useNavigate } from "react-router-dom";
import { ArrowTopSvg } from "../../svgs";

const PropertyItem = ({ item }: { item: PropertyType }) => {
	const navigate = useNavigate();
	return (
		<Card className="">
			<CardBody className="p-0 flex flex-col">
				<div className="h-[240px] w-full relative rounded-b-xl overflow-hidden">
					<img
						className="object-cover object-center h-full w-full"
						src={imgTemp}
					/>
				</div>
				<div className="space-y-2 p-3 sm:p-4">
					<div>
						<h6 className="font-bold mb-1">{item.name}</h6>
						<p className="text-xs text-[#667185] line-clamp-1">
							{item.address}
						</p>
					</div>
					<p className=" line-clamp-1 text-sm text-default">
						{item.description}
					</p>
					<Button
						size="sm"
						type="button"
						className="px-0 py-0 text-base"
						variant="light"
						onPress={() => navigate(`/dashboard/properties/${item.id}`)}
						endContent={<ArrowTopSvg />}
					>
						More Details
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default PropertyItem;
