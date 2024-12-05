import { ModalFooter } from "@nextui-org/modal";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../../ui/Button";
import { SuccessIcon, DeletePropertyIcon } from "../../svgs";

import { useState } from "react";
import { deleteProperty } from "../../../helper/apis/propertyApi";


function DeleteModal({ onClose, id }: { onClose: () => void; id: string }) {
	const [isSuccess, setIsSuccess] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationKey: ["deleteProperty"],
		mutationFn: deleteProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["properties"] });
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			setIsSuccess(true);
		},
		onError: (error) => {
			// console.log(error);
			console.log("Error: ", error);
		},
	});

	const handleDelete = async () => {
		mutation.mutate(id);
	};

	return (
		<>
			{isSuccess ? (
				<div className="flex flex-col items-center gap-7">
					<div>
						<SuccessIcon />
					</div>
					<p className="my-15">Property deleted successfully</p>

					<ModalFooter className="border-t justify-center w-full">
						<Button
							className="px-10"
							onPress={() => {
								onClose();
								navigate("/dashboard/properties");
							}}
						>
							DONE
						</Button>
					</ModalFooter>
				</div>
			) : (
				<div className="flex flex-col items-center gap-5">
					<DeletePropertyIcon />
					<div className="flex flex-col items-center gap-5">
						<div className="text-center">
							<p className="font-bold text-xl mb-2">
								Are You Sure you want to delete this property?
							</p>
							<p>
								{" "}
								This action will permanently remove all associated data,
								including:
							</p>
							<ul className="text-center list-disc list-inside space-y-1">
								<li className="">Property details</li>
								<li>Tenant information</li>
								<li>Maintenance records</li>
								<li>Payment history</li>
							</ul>
						</div>
					</div>
					<div className="border-t py-6 px-4 w-full gap-5 flex">
						<div className="flex-1">
							<Button onPress={() => onClose()} className="px-10 w-full">
								No
							</Button>
						</div>
						<div className="flex-1">
							<Button
								color="danger"
								className="px-10 w-full"
								onPress={handleDelete}
								isLoading={mutation.isPending}
							>
								Yes, Delete Property
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default DeleteModal;
