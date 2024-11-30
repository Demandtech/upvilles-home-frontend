import Input from "../../ui/Input";
import { Input as NextInput } from "@nextui-org/input";
import Select from "../../ui/Select";
import { useForm, yupResolver, Controller } from "../../../../configs/services";
import { maintenanceSchema } from "../../../utils/schemas/maintenance";
import Button from "../../ui/Button";
import { MaintenanceFormState } from "../../../types/forms";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateMaintenanceForm } from "../../../redux/slices/forms/maintenanceForm";
import useProperty from "../../../hooks/useProperty";
import { useQuery } from "@tanstack/react-query";
import DateInput from "../../ui/DatePicker";
import { formatCurrency } from "../../../utils/formatCurrency";
import { isEqual } from "lodash";
import { Spinner } from "@nextui-org/spinner";

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
	isPageLoading = false,
}: {
	onFormSubmit: (data: MaintenanceFormState) => void;
	formDefaultValue?: MaintenanceFormState;
	isLoading: boolean;
	editedId?: string;
	isPageLoading?: boolean;
}) {
	const dispatch = useDispatch();
	const { allProperties } = useProperty();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		control,
	} = useForm({
		resolver: yupResolver(maintenanceSchema),
		defaultValues: formDefaultValue,
	});

	const watchFields = watch();

	const { data: properties, isLoading: isPropertiesLoading } = useQuery({
		queryKey: ["properties"],
		queryFn: allProperties,
	});
	const [isDirty, setIsDirty] = useState(false);

	const handleMaintenanceFeeChange = (value: string) => {
		const sanitizedValue = value.replace(/[^0-9.,]/g, "");

		// Split the value by decimal to separate the integer part and decimal part
		const parts = sanitizedValue.split(".");

		// Remove commas for thousands separation
		const raw = parts[0].replace(/,/g, "");

		// Format the integer part as currency
		const integerPart: string = formatCurrency(Number(raw));
		const decimalPart = parts[1];

		// Return the formatted value with or without decimal part
		return parts.length > 1 ? `${integerPart}.${decimalPart}` : integerPart;
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
		if (formDefaultValue && editedId) {
			const isDirty = isEqual(formDefaultValue, watchFields);
			setIsDirty(isDirty);
		}
	}, [editedId, watchFields, formDefaultValue]);

	useEffect(() => {
		if (watchFields.maintenance_fee) {
			setValue(
				"maintenance_fee",
				handleMaintenanceFeeChange(watchFields.maintenance_fee)
			);
		}
	}, [watchFields.maintenance_fee, setValue]);


	return (
		<>
			{isPageLoading ? (
				<div className="pt-14 flex justify-center">
					<Spinner color="primary" label="Loading..." />
				</div>
			) : (
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
								required
								label="Facility:"
								error={errors.facility?.message}
								register={register}
								placeholder="E.g Generator"
								size="lg"
								defaultValue={formDefaultValue?.facility as string}
							/>
							<Input
								type="text"
								name="technician"
								required
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
								isRequired
								isLoading={isPropertiesLoading}
								register={register}
								defaultValue={formDefaultValue?.property as string}
								error={errors.property?.message as string}
							/>
							<Controller
								name="maintenance_fee"
								control={control}
								render={({ field }) => (
									<NextInput
										radius="sm"
										isRequired
										type="text"
										labelPlacement="outside"
										required
										label="Maintenance fee:"
										name="maintenance_fee"
										onChange={(e) => {
											const formattedValue = handleMaintenanceFeeChange(
												e.target.value
											);
											setValue("maintenance_fee", formattedValue);
											field.onChange(e);
										}}
										size="lg"
										placeholder="N0.00"
										value={field.value}
										errorMessage={errors.maintenance_fee?.message}
										isInvalid={!!errors.maintenance_fee}
									/>
								)}
							/>

							<DateInput
								isRequired
								name="schedule_date"
								label="Schedule Date:"
								register={register}
								error={errors.schedule_date?.message}
								size="lg"
								setValue={setValue}
								defaultValue={formDefaultValue?.schedule_date}
							/>
							<Select
								isRequired
								name="status"
								data={data}
								register={register}
								error={errors.status?.message}
								label="Task Status:"
								size="lg"
								defaultValue={formDefaultValue?.status as string}
							/>
						</div>
						<Button
							disabled={isDirty}
							isLoading={isLoading}
							type="submit"
							className="w-full"
						>
							{editedId ? "Update" : "Create"} Maintenance Schedule
						</Button>
					</form>
				</div>
			)}
		</>
	);
}

export default MaintenanceForm;
