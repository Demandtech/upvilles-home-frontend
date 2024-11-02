import { Card, CardBody } from "@nextui-org/card";
import { PropertyType } from "../../../types/dashboard";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowTopSvg } from "../../svgs";
import { Image } from "@nextui-org/image";

const PropertyItem = ({ item }: { item: PropertyType }) => {
  const navigate = useNavigate();
  return (
    <Card className="">
      <CardBody className="p-0 flex flex-col">
        <div className="h-[240px] w-full relative rounded-b-xl overflow-hidden">
          <Image
            className="object-cover object-center h-full w-full"
            src={item?.images_url[0]}
            width={"100%"}
            height={240}
          />
        </div>
        <div className="space-y-2 p-3 sm:p-4">
          <div>
            <h6 className="font-bold mb-1">{item.title}</h6>
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
            onPress={() => navigate(`/dashboard/properties/${item._id}`)}
            endContent={<ArrowTopSvg />}
          >
            <Link to={`/dashboard/properties/${item._id}`}>More Details</Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PropertyItem;
