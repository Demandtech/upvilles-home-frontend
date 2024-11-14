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
import { Input as NewInput } from "@nextui-org/input";
import { addCommas } from "../../../utils/addComma";
import DateInput from "../../ui/DatePicker";

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
	const [available_units, setAvailableUnits] = useState<number[]>([]);
	const [formattedFee, setFormattedFee] = useState<string>(
		formDefaultValue?.maintenance_fee as string
	);

	const watchFields = watch();

	const { data: properties, isLoading: isPropertiesLoading } = useQuery({
		queryKey: ["properties"],
		queryFn: allProperties,
	});

	const handleMaintenanceFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const raw = event.target.value.replace(/,/g, "");

		if (isNaN(Number(raw))) return;

		const formatted = addCommas(Number(raw));

		if (formatted) {
			setFormattedFee(formatted);
		} else {
			setFormattedFee("");
		}

		setValue("maintenance_fee", formatted);
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

	useEffect(() => {
		if (!properties?.data) return;

		const selectedPropertyId =
			formDefaultValue?.property || watchFields.property;

		const property = properties?.data?.properties.find(
			(prop: { _id: string }) => {
				return prop._id === selectedPropertyId;
			}
		);

		setAvailableUnits(property?.all_units as number[]);
	}, [
		watchFields.property,
		properties,
		watchFields.maintenance_fee,
		formDefaultValue,
	]);

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
					<DateInput
						name="schedule_date"
						label="Schedule Date"
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
					<Select
						size="lg"
						name="unit"
						label="Unit:"
						register={register}
						data={available_units?.map((unit) => ({
							key: unit.toString(),
							label: `Unit ${unit}`,
						}))}
						defaultValue={String(formDefaultValue?.unit)}
						error={errors.unit?.message as string}
					/>
					<div className="md:col-span-2">
						<NewInput
							type="text"
							required={true}
							label="Maintenance fee:"
							name="maintenance_fee"
							labelPlacement="outside"
							classNames={{
								inputWrapper: "rounded-md",
							}}
							onChange={handleMaintenanceFeeChange}
							isInvalid={!!errors.maintenance_fee}
							errorMessage={errors.maintenance_fee?.message}
							size="lg"
							placeholder="N 0.00"
							value={formattedFee}
						/>
					</div>
				</div>
				<Button isLoading={isLoading} type="submit" className="w-full">
					{editedId ? "Update" : "Create"} Maintenance Schedule
				</Button>
			</form>
		</div>
	);
}

export default MaintenanceForm;
