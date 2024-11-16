import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useForm, yupResolver } from "../../../../configs/services";
import { maintenanceSchema } from "../../../utils/schemas/maintenance";
import Button from "../../ui/Button";
import { MaintenanceFormState } from "../../../types/forms";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { updateMaintenanceForm } from "../../../redux/slices/forms/maintenanceForm";
import useProperty from "../../../hooks/useProperty";
import { useQuery } from "@tanstack/react-query";
// import { addCommas } from "../../../utils/addComma";
import DateInput from "../../ui/DatePicker";
import { formatCurrency } from "../../../utils/formatCurrency";

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
	const { allProperties } = useProperty();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: yupResolver(maintenanceSchema),
		defaultValues: formDefaultValue,
	});
	const [formattedFee, setFormattedFee] = useState<string>(
		formDefaultValue?.maintenance_fee as string
	);

	const watchFields = watch();

	const { data: properties, isLoading: isPropertiesLoading } = useQuery({
		queryKey: ["properties"],
		queryFn: allProperties,
	});

	const handleMaintenanceFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const sanitizedValue = event.target.value.replace(/[^0-9.,]/g, "");

		const parts = sanitizedValue.split(".");

		const raw = parts[0].replace(/,/g, "");

		const intergerPart = formatCurrency(Number(raw));
		const decimalPart = parts[1];

		if (parts.length > 1) {
			setFormattedFee(intergerPart + "." + decimalPart);
		} else {
			setFormattedFee(intergerPart);
		}
	};

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
		<div className="max-w-[600px] mx-auto w-full overflow-auto scrollbar-hide">
			<div className="text-center mb-5">
				<h4 className="text-xl sm:text-2xl mb-1">
					{editedId
						? "Update Maintenance Schedule"
						: "Create Maintenance Schedule"}
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
						defaultValue={formDefaultValue?.facility as string}
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
						defaultValue={formDefaultValue?.technician as string}
					/>
					<Select
						size="lg"
						name="property"
						label="Property:"
						data={
							properties?.data?.properties.map(
								(prop: { _id: string; title: string }) => ({
									key: prop._id,
									label: prop.title,
								})
							) || []
						}
						isLoading={isPropertiesLoading}
						register={register}
						defaultValue={formDefaultValue?.property as string}
						error={errors.property?.message as string}
					/>
					<Input
						type="text"
						required={true}
						label="Maintenance fee"
						name="maintenance_fee"
						onChange={handleMaintenanceFeeChange}
						size="lg"
						placeholder="N0.00"
						value={formattedFee}
						register={register}
						defaultValue={formDefaultValue?.maintenance_fee as string}
						error={errors.maintenance_fee?.message}
					/>
					<DateInput
						name="schedule_date"
						label="Schedule Date:"
						register={register}
						error={errors.schedule_date?.message}
						size="lg"
						setValue={setValue}
						defaultValue={formDefaultValue?.schedule_date}
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
				</div>
				<Button isLoading={isLoading} type="submit" className="w-full">
					{editedId ? "Update" : "Create"} Maintenance Schedule
				</Button>
			</form>
		</div>
	);
}

export default MaintenanceForm;
