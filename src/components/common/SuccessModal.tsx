import Button from "../ui/Button";
import { ModalFooter } from "@nextui-org/modal";
import { SuccessIcon } from "../svgs";

export default function SuccessModal({
	onClose,
	title,
	message,
	buttonLabel,
}: {
	onClose: () => void;
	title: string;
	message: string;
	buttonLabel: string;
}) {
	return (
		<div className="flex flex-col items-center gap-7">
			<div className="text-center flex flex-col items-center mb-5">
				<div className="mb-4">
					<SuccessIcon />
				</div>
				<h6 className="text-xl mb-2 font-semibold">{title}</h6>
				<p className="my-15 text-darkGrey">{message}</p>
			</div>

			<ModalFooter className="border-t justify-center w-full">
				<Button className="px-10" onPress={onClose}>
					{buttonLabel}
				</Button>
			</ModalFooter>
		</div>
	);
}
