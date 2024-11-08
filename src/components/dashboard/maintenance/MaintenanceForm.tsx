import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useForm, yupResolver } from "../../../../configs/services";
import { maintenanceSchema } from "../../../utils/schemas/maintenance";
import Button from "../../ui/Button";
import { MaintenanceFormState } from "../../../types/forms";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateMaintenanceForm } from "../../../redux/slices/forms/maintenanceForm";

const data = [
	{ key: "overdue", label: "Overdue" },
	{ key: "schedule", label: "Upcoming" },
	{ key: "completed", label: "Completed" },
];

function MaintenanceForm({
	onFormSubmit,
	formDefaultValue,
	isLoading,
	editedId,
}: {
	onFormSubmit: (data: MaintenanceFormState) => void;
	formDefaultValue?: MaintenanceFormState;
	isLoading: boolean;
	editedId?: string;
}) {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(maintenanceSchema),
		defaultValues: formDefaultValue,
	});

	const watchFields = watch();

	useEffect(() => {
		if (!editedId) {
			Object.entries(watchFields).forEach(([key, val]) => {
				dispatch(
					updateMaintenanceForm({
						field: key as keyof typeof formDefaultValue,
						value: val as keyof MaintenanceFormState,
					})
				);
			});
		}
	}, [editedId, watchFields, formDefaultValue]);

	return (
		<div className="max-w-[600px] mx-auto w-full py-10 overflow-auto scrollbar-hide">
			<div className="text-center mb-5">
				<h4 className="text-xl sm:text-2xl mb-1">
					Create Maintenance Schedule
				</h4>
				<p className="text-darkGrey text-sm sm:text-base">
					Fill in the details below to add a new Maintenance Schedule
				</p>
			</div>
			<form onSubmit={handleSubmit(onFormSubmit)} action="">
				<div className="grid gap-5 md:grid-cols-2 mb-10">
					<Input
						type="text"
						name="facility"
						required={true}
						label="Facility"
						error={errors.facility?.message}
						register={register}
						placeholder="E.g Generator"
						size="lg"
					/>
					<Input
						type="text"
						name="technician"
						required={true}
						label="Technician"
						register={register}
						error={errors.technician?.message}
						placeholder="Enter name"
						size="lg"
					/>
					<Input
						type="date"
						name="schedule_date"
						required={true}
						label="Schedule Date"
						register={register}
						error={errors.schedule_date?.message}
						size="lg"
						placeholder="Enter date"
					/>
					<Select
						name="status"
						data={data}
						register={register}
						error={errors.status?.message}
						label="Task Status:"
						size="lg"
						defaultValue={formDefaultValue?.status as string}
					/>
					<div className="md:col-span-2">
						<Input
							type="text"
							name="maintenance_fee"
							required={true}
							label="Maintenance fee"
							register={register}
							error={errors.maintenance_fee?.message}
							size="lg"
							placeholder="N 0.00"
						/>
					</div>
				</div>
				<Button isLoading={isLoading} type="submit" className="w-full">
					Create Maintenance Schedule
				</Button>
			</form>
		</div>
	);
}

export default MaintenanceForm;
