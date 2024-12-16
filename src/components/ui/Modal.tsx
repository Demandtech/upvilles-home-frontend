import { ModalProps } from "@nextui-org/modal";
import { lazy, Suspense } from "react";

const LazyModal = lazy(() =>
	import("@nextui-org/modal").then((module) => ({
		default: module.Modal,
	}))
);

const LazyModalContent = lazy(() =>
	import("@nextui-org/modal").then((module) => ({
		default: module.ModalContent,
	}))
);

const LazyModalBody = lazy(() =>
	import("@nextui-org/modal").then((module) => ({
		default: module.ModalBody,
	}))
);

interface CustomModalProps extends Omit<ModalProps, "children"> {
	children: React.ReactNode;
}

export function CustomModal({
	isOpen,
	onOpenChange,
	children,
}: CustomModalProps) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LazyModal
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
				<LazyModalContent className="pt-10 px-0">
					{() => <LazyModalBody> {children}</LazyModalBody>}
				</LazyModalContent>
			</LazyModal>
		</Suspense>
	);
}
