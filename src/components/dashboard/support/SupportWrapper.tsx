import { useState } from "react";
import Assistance from "./Assistance";
import ContactUs from "./ContactUs";
import SupportChat from "./SupportChat";

export default function SupportWrapper() {
	const [startChat, setStartChat] = useState<boolean>(false);
	return (
		<div className="px-3 pt-5 pb-3 overflow-autob sm:px-5 bg-lightBg h-[calc(100dvh-135px)] lg:h-[calc(100dvh-86px)]">
			<div className="flex w-full gap-5 h-full">
				<div className="h-full overflow-auto scrollbar-hide">
					<div className="flex flex-grow flex-col gap-5 h-full">
						<Assistance startChat={startChat} setStartChat={setStartChat} />
						<ContactUs startChat={startChat} />
					</div>
				</div>
				{startChat && (
					<div className="w-full sm:max-w-[350px] fixed lg:static bottom-0 right-0 top-0 z-40 lg:z-0">
						<SupportChat setStartChat={setStartChat} />
					</div>
				)}
			</div>
		</div>
	);
}
