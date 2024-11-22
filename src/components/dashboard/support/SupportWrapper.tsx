import { useState } from "react";
import Assistance from "./Assistance";
import ContactUs from "./ContactUs";
import SupportChat from "./SupportChat";

export default function SupportWrapper() {
  const [startChat, setStartChat] = useState<boolean>(false);
  return (
    <div className="px-3 pt-5 overflow-autob pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-136px)]">
      <div className="flex w-full  gap-5">
        <div className="flex flex-grow flex-col gap-5">
          <Assistance startChat={startChat} setStartChat={setStartChat} />
          <ContactUs />
        </div>
        {startChat && (
          <div className="w-full lg:min-w-[381px] max-w-[381px] fixed lg:static bottom-0 left-0 right-0 top-0 z-40 lg:z-0">
            <SupportChat setStartChat={setStartChat} />
          </div>
        )}
      </div>
    </div>
  );
}
