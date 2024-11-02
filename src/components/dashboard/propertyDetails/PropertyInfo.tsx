import { useNavigate } from "react-router-dom";
import { CheckIconSvg, LocationIconSvg, DescriptionIconSvg } from "../../svgs";
import Button from "../../ui/Button";
import DeleteModal from "../properties/DeleteModal";
import { CustomModal } from "../../ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";

const sideAttractions: string[] | [] = [
  "24-hour Electricity",
  "Hot Water",
  "Kitchen Shelf",
  "Air Conditioning",
  "Kitchen Cabinets",
  "Microwave",
];
const PropertyInfo = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  function handleNavigate() {
    navigate(`/dashboard/properties/manage?id=${id}`);
  }

  return (
    <div className="w-full lg:w-3/6 flex flex-col gap-4 lg:px-5">
      <div>
        <h4 className="text-darkGrey font-semibold mb-2">
          Property Information
        </h4>
        <h3 className="font-bold text-default mb-1 text-2xl">
          Goshen Honey Apartment
        </h3>
        <div className="flex items-center gap-2 mb-1">
          <LocationIconSvg />
          <p className="text-darkGrey text-sm">
            Caterpillar Estate, Opic Berger, Lagos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DescriptionIconSvg />
          <p className="text-sm">1 Unit of 3 bedroom all ensuite duplex</p>
        </div>
      </div>
      <div>
        <h4 className="text-darkGrey font-semibold mb-2">
          Property Description
        </h4>
        <p className="text-darkGrey text-sm">
          This is a spacious lovely 3bedroom semi-detached duplex in a well in a
          well-secured and located estate. It also comes with BQ.
        </p>
      </div>
      <div>
        <h4 className="text-darkGrey font-semibold mb-2">Side Attraction</h4>
        <ul className="grid grid-cols-2 gap-2">
          {sideAttractions.map((item) => {
            return (
              <li className="text-sm flex items-center gap-2" key={item}>
                <CheckIconSvg />
                <p>{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onPress={handleNavigate}
          type="button"
          size="md"
          className="w-full rounded-md"
        >
          Edit Property Details
        </Button>
        <Button
          type="button"
          size="md"
          variant="bordered"
          color="danger"
          className="w-full rounded-md"
          onPress={() => onOpen()}
        >
          Delete Property
        </Button>
      </div>
      <CustomModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DeleteModal onClose={onClose} id={id} />
      </CustomModal>
    </div>
  );
};

export default PropertyInfo;
