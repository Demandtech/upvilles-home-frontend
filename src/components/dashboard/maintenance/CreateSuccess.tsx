import Button from "../../ui/Button";
import { ModalFooter } from "@nextui-org/modal";
import { SuccessIcon } from "../../svgs";

function CreateSuccess({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="px-10 text-center mb-10 flex flex-col gap-2 items-center">
        <SuccessIcon />
        <p className="font-bold text-xl">Successful!</p>
        <p>Maintenance Schedule created successfully</p>
      </div>
      <ModalFooter className="border-t justify-center">
        <Button className="px-10" onPress={() => onClose()}>
          DONE
        </Button>
      </ModalFooter>
    </>
  );
}

export default CreateSuccess;
