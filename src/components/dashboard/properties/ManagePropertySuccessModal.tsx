import Button from "../../ui/Button";
import { ModalFooter } from "@nextui-org/modal";
import { SuccessIcon } from "../../svgs";

import { useNavigate } from "react-router-dom";

function ManagementModal({
  onClose,
  message,
}: {
  onClose: () => void;
  message: string;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center gap-7">
        <div>
          <SuccessIcon />
        </div>
        <p className="my-15">{message}</p>

        <ModalFooter className="border-t justify-center w-full">
          <Button
            className="px-10"
            onPress={() => {
              onClose();
              navigate(-1);
            }}
          >
            DONE
          </Button>
        </ModalFooter>
      </div>
    </>
  );
}

export default ManagementModal;
