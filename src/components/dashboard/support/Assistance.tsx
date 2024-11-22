import { Dispatch, SetStateAction } from "react";
import Button from "../../ui/Button";

function Assistance({
  setStartChat,
  startChat,
}: {
  startChat: boolean;
  setStartChat: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-white rounded-xl py-10 px-5 md:px-10 shadow-lg shadow-default-100 flex flex-col gap-5 md:gap-8">
      <h5 className="text-lg sm:text-xl font-semibold">
        Need Assistance? <br /> Welcome to the Help & Support Center!
      </h5>
      <p className="text-darkGrey text-sm md:text-base">
        Our Help & Support Center is here to assist you with any questions or
        issues you encounter on your dashboard. Connect directly with our
        support team via chat to resolve technical difficulties, receive
        guidance, or report any concerns.
      </p>
      <Button onPress={() => setStartChat(true)} size="sm" className="px-10">
        {startChat ? "Go back" : "Chat Now"}
      </Button>
    </div>
  );
}

export default Assistance;
