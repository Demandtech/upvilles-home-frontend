import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useForm, yupResolver } from "../../../../configs/services";
import Button from "../../ui/Button";
import { ObjectSchema } from "yup";
import { TenantFormProps } from "../../../types/tenant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTenantForm } from "../../../redux/slices/forms/tenantForm";
import { RootState } from "../../../redux/store";

const TenantForm = ({
	onSubmit,
	schema,
	formDefaultValue,
	isLoading,
	id,
}: {
	onSubmit: (data: TenantFormProps) => void;
	schema: ObjectSchema<TenantFormProps>;
	formDefaultValue: TenantFormProps;
	isLoading: boolean;
	id: string;
}) => {
	const dispatch = useDispatch();

	const { properties } = useSelector((state: RootState) => state.property);
	const [assignUnits, setAssignedUnits] = useState<
		{ key: string; label: string }[]
	>([]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: formDefaultValue,
	});

	const watchFields = watch();

	useEffect(() => {
		if (!id) {
			Object.entries(watchFields).forEach(([key, val]) => {
				dispatch(
					updateTenantForm({
						field: key as keyof typeof formDefaultValue,
						value: val as keyof TenantFormProps,
					})
				);
			});
		}
	}, [watchFields, id]);

	useEffect(() => {
		const selectedProperty = watchFields.assigned_property;

		const availableUnits: string | undefined = properties?.find(
			(prop) => prop._id === selectedProperty
		)?.unit_number;

		const availablePropertyUnits = Array.from({
			length: Number(availableUnits) || 0,
		});

		setAssignedUnits(
			availablePropertyUnits.map((_, index) => ({
				key: (index + 1).toString() as string,
				label: `Unit ${index + 1}` as string,
			}))
		);
	}, [watchFields.assigned_property, properties]);


	return (
		<div className="max-w-[600px] mx-auto overflow-auto">
			<div className="text-center pt-10 mb-10">
				<h3 className="text-xl lg:text-2xl mb-1.5 font-semibold">
					Tenant Information
				</h3>
				<p className="text-sm text-darkGrey">
					Enter detailed tenant information and keep property data up-to-date
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
				<div className="grid gap-3 md:grid-cols-2 mb-10">
					<Input
						required
						name="name"
						type="text"
						size="md"
						placeholder="E.g Generator"
						label="Tenant Name"
						register={register}
						error={errors.name?.message as string}
					/>
					<Input
						required
						name="phone"
						type="text"
						size="md"
						placeholder="Enter phone number"
						label="Phone Number"
						register={register}
						error={errors.phone?.message as string}
					/>
					<Input
						required
						name="start_date"
						size="md"
						type="date"
						label="Lease Start"
						placeholder="DD/MM/YYYY"
						register={register}
						error={errors.start_date?.message as string}
					/>
					<Input
						required
						type="date"
						placeholder="DD/MM/YYYY"
						name="end_date"
						label="End Date"
						size="md"
						register={register}
						error={errors.end_date?.message as string}
					/>
					<Select
						size="md"
						name="assigned_property"
						label="Assigned Property:"
						data={properties?.map((prop) => ({
							key: prop._id,
							label: prop.title,
						}))}
						register={register}
						defaultValue={formDefaultValue.assigned_property as string}
						error={errors.assigned_property?.message as string}
					/>
					<Select
						size="md"
						name="assigned_unit"
						label="Assigned Unit:"
						register={register}
						data={assignUnits}
						defaultValue={String(formDefaultValue?.assigned_unit)}
						error={errors.assigned_unit?.message as string}
					/>
				</div>
				<Button isLoading={isLoading} type="submit" className="w-full">
					Save Tenant Information
				</Button>
			</form>
		</div>
	);
};

export default TenantForm;
