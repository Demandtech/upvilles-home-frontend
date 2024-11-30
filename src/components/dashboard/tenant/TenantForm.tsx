import Input from "../../ui/Input";
import { Input as NextInput } from "@nextui-org/input";
import Select from "../../ui/Select";
import { useForm, yupResolver, Controller } from "../../../../configs/services";
import Button from "../../ui/Button";
import { ObjectSchema } from "yup";
import { TenantFormState } from "../../../types/forms";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTenantForm } from "../../../redux/slices/forms/tenantForm";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import DateInput from "../../ui/DatePicker";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Spinner } from "@nextui-org/spinner";
import { isEqual } from "lodash";

const TenantForm = ({
	onSubmit,
	schema,
	formDefaultValue,
	isLoading,
	id,
	isPageLoading = false,
}: {
	onSubmit: (data: TenantFormState) => void;
	schema: ObjectSchema<TenantFormState>;
	formDefaultValue: TenantFormState;
	isLoading: boolean;
	id: string;
	isPageLoading?: boolean;
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { allProperties } = useProperty();

	const { data: properties, isLoading: isPropertiesLoading } = useQuery({
		queryKey: ["properties"],
		queryFn: allProperties,
	});

	const [available_units, setAvailableUnits] = useState<number[]>([]);
	const [isDirty, setIsDirty] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<TenantFormState>({
		resolver: yupResolver(schema),
		defaultValues: formDefaultValue,
		mode: "onChange",
	});

	const watchFields = watch();

	useEffect(() => {
		if (!id && formDefaultValue) {
			Object.entries(watchFields).forEach(([key, val]) => {
				dispatch(
					updateTenantForm({
						field: key as keyof typeof formDefaultValue,
						value: val as keyof TenantFormState,
					})
				);
			});
		}
	}, [watchFields, id]);

	useEffect(() => {
		if (!properties?.data) return;

		const selectedProperty =
			watchFields.assigned_property || formDefaultValue.assigned_property;

		const property = properties?.data?.properties.find(
			(property: { _id: string }) => {
				return property._id === selectedProperty;
			}
		);

		if (
			formDefaultValue.assigned_unit &&
			typeof formDefaultValue.assigned_unit === "number"
		) {
			const avail = [
				formDefaultValue.assigned_unit,
				...(property?.available_units as number[]),
			];
			setAvailableUnits(avail);
			return;
		}

		setAvailableUnits(property?.available_units as number[]);
	}, [
		watchFields.assigned_property,
		properties,
		formDefaultValue.assigned_property,
	]);

	const handleCurrencyChange = (value: string) => {
		// Clean the value by removing non-numeric characters (except for commas and decimals)
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
		if (watchFields.rent_paid) {
			setValue("rent_paid", handleCurrencyChange(watchFields.rent_paid));
		}

		if (watchFields.balance) {
			setValue("balance", handleCurrencyChange(watchFields.balance));
		}

		if (id) {
			setIsDirty(isEqual(formDefaultValue, watchFields));
		}
	}, [watchFields.rent_paid, watchFields.balance, setValue, id]);

	return (
		<>
			{isPageLoading ? (
				<div className="pt-14 flex justify-center">
					<Spinner />
				</div>
			) : (
				<div className="max-w-[500px] mx-auto h-full">
					<div className="text-center mb-10">
						<h3 className="text-xl lg:text-2xl mb-1.5 font-semibold">
							Tenant Information
						</h3>
						<p className="text-sm text-darkGrey">
							Enter detailed tenant information and keep property data
							up-to-date
						</p>
					</div>
					<form className="pb-10" onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-5 sm:grid-cols-2 mb-10">
							<Input
								required
								name="name"
								type="text"
								size="lg"
								placeholder="Enter tenant name"
								label="Tenant Name:"
								register={register}
								error={errors.name?.message as string}
								defaultValue={formDefaultValue.name}
							/>
							<Input
								required
								name="phone"
								type="text"
								size="lg"
								placeholder="Enter phone number"
								label="Phone Number:"
								register={register}
								error={errors.phone?.message as string}
								defaultValue={formDefaultValue.phone}
							/>
							<Controller
								name="rent_paid"
								control={control}
								render={({ field }) => (
									<NextInput
										{...field}
										isRequired={true}
										radius="sm"
										type="text"
										labelPlacement="outside"
										size="lg"
										placeholder="N0.00"
										label="Rent paid:"
										onChange={(e) => {
											const formattedValue = handleCurrencyChange(
												e.target.value
											);
											setValue("rent_paid", formattedValue);
											field.onChange(e);
										}}
										value={field.value}
										isInvalid={!!errors.rent_paid}
										errorMessage={errors.rent_paid?.message}
									/>
								)}
							/>

							<Controller
								name="balance"
								control={control}
								render={({ field }) => (
									<NextInput
										labelPlacement="outside"
										radius="sm"
										type="text"
										size="lg"
										placeholder="N0.00"
										label="Outstanding Balance:"
										onChange={(e) => {
											const formattedValue = handleCurrencyChange(
												e.target.value
											);
											setValue("balance", formattedValue);
											field.onChange(e);
										}}
										value={field.value}
										isInvalid={!!errors.balance}
										errorMessage={errors.balance?.message}
									/>
								)}
							/>

							<Select
								size="lg"
								name="assigned_property"
								label="Assigned Property:"
								data={
									properties?.data?.properties.map(
										(prop: { _id: string; title: string }) => ({
											key: prop._id,
											label: prop.title,
										})
									) || []
								}
								isRequired={true}
								isLoading={isPropertiesLoading}
								register={register}
								defaultValue={formDefaultValue.assigned_property as string}
								error={errors.assigned_property?.message as string}
							/>
							<Select
								isRequired
								size="lg"
								name="assigned_unit"
								label="Assigned Unit:"
								register={register}
								data={
									available_units?.map(
										(unit): { key: string; label: string } => ({
											key: unit.toString(),
											label: `Unit ${unit}`,
										})
									) || []
								}
								defaultValue={String(formDefaultValue?.assigned_unit)}
								error={errors.assigned_unit?.message as string}
							/>
							<DateInput
								isRequired
								size="lg"
								error={errors.start_date?.message as string}
								label="Move in date:"
								name="start_date"
								register={register}
								setValue={setValue}
								defaultValue={formDefaultValue.start_date}
							/>

							<DateInput
								isRequired
								size="lg"
								error={errors.end_date?.message as string}
								label="End Date:"
								name="end_date"
								register={register}
								setValue={setValue}
								defaultValue={formDefaultValue.end_date}
							/>
						</div>
						<div className="space-y-3">
							<Button
								disabled={isDirty}
								isLoading={isLoading}
								type="submit"
								className="w-full"
							>
								{id ? "Save Changes" : "Save Tenant Information"}
							</Button>
							{id && (
								<Button
									onClick={() => navigate(-1)}
									className="w-full"
									color="default"
									variant="bordered"
								>
									Cancel
								</Button>
							)}
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default TenantForm;
