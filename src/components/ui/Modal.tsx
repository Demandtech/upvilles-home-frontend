import { Modal, ModalContent, ModalBody, ModalProps } from "@nextui-org/modal";

interface CustomModalProps extends Omit<ModalProps, "children"> {
	children: React.ReactNode;
}

export function CustomModal({
	isOpen,
	onOpenChange,
	children,
}: CustomModalProps) {
	return (
		<Modal
			backdrop="opaque"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			radius="lg"
			classNames={{
				body: "px-0",
				closeButton: "p-5 text-xl",
			}}
			className="px rounded-none sm:rounded-xl"
			size="xl"
		>
			<ModalContent className="pt-10 px-0">
				{() => <ModalBody> {children}</ModalBody>}
			</ModalContent>
		</Modal>
	);
}
