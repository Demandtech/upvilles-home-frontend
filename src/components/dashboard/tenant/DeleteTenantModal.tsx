import Button from "../../ui/Button";
import { ModalFooter } from "@nextui-org/modal";
import { SuccessIcon, DeletePropertyIcon } from "../../svgs";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTenant from "../../../hooks/useTenant";

export default function DeleteTenantModal({
	onClose,
	id,
}: {
	onClose: () => void;
	id: string;
}) {
	const [isSuccess, setIsSuccess] = useState(false);
	const queryClient = useQueryClient();

	const { deleteTenantHandler } = useTenant();

	const mutation = useMutation({
		mutationKey: ["deleteTenant", id],
		mutationFn: deleteTenantHandler,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["tenants", data?.data.assigned_property],
			});
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			setIsSuccess(true);
		},
		onError: (error) => {
			console.error("Error: ", error);
		},
	});

	const handleDelete = async () => {
		mutation.mutate(id);
	};

	return (
		<>
			{isSuccess ? (
				<div className="flex flex-col items-center gap-5">
					<div>
						<SuccessIcon />
					</div>
					<div className="text-center">
						<h6 className="mb-2 font-semibold text-lg">Successful!</h6>
						<p className="text-darkGrey text-sm">Tenant deleted successfully</p>
					</div>
					<ModalFooter className="border-t justify-center w-full">
						<Button className="px-10" onPress={onClose}>
							DONE
						</Button>
					</ModalFooter>
				</div>
			) : (
				<div className="flex flex-col items-center gap-5 sm:px-12">
					<DeletePropertyIcon />
					<div className="flex flex-col items-center gap-5">
						<div className="text-center px-3 sm:px-0">
							<p className="font-bold text-xl mb-2">
								Are You Sure you want to delete this tenant?
							</p>
							<p className="text-darkGrey">
								You are about to delete ‘Mrs Taiwo Aderibigbe’ from your tenant
								list. all information related to this tenant will be
								automatically deleted from your tenant record.
							</p>
						</div>
					</div>
					<div className="border-t py-6 px-4 w-full gap-5 flex">
						<div className="flex-1">
							<Button
								size="lg"
								onPress={() => onClose()}
								className="px-10 w-full"
							>
								No
							</Button>
						</div>
						<div className="flex-1">
							<Button
								color="danger"
								className="px-10 w-full"
								onPress={handleDelete}
								size="lg"
							>
								Yes, Delete Tenant
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
