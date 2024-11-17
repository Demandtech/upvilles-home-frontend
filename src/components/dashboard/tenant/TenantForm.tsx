import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useForm, yupResolver } from "../../../../configs/services";
import Button from "../../ui/Button";
import { ObjectSchema } from "yup";
import { TenantFormState } from "../../../types/forms";
import { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateTenantForm } from "../../../redux/slices/forms/tenantForm";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import DateInput from "../../ui/DatePicker";
import { formatCurrency } from "../../../utils/formatCurrency";

const TenantForm = ({
  onSubmit,
  schema,
  formDefaultValue,
  isLoading,
  id,
}: {
  onSubmit: (data: TenantFormState) => void;
  schema: ObjectSchema<TenantFormState>;
  formDefaultValue: TenantFormState;
  isLoading: boolean;
  id: string;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProperties } = useProperty();
  const [currency, setCurrency] = useState({
    rent_paid: formDefaultValue.rent_paid,
    balance: formDefaultValue.balance,
  });

  const { data: properties, isLoading: isPropertiesLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: allProperties,
  });

  const [available_units, setAvailableUnits] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValue,
    mode: "onChange",
  });

  const watchFields = watch();

  useEffect(() => {
    if (!id) {
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

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/[^0-9.,]/g, "");
    const name = event.target.name;

    const parts = sanitizedValue.split(".");

    const raw = parts[0].replace(/,/g, "");

    const intergerPart: string = formatCurrency(Number(raw));
    const decimalPart = parts[1];

    if (parts.length > 1) {
      setCurrency((prev) => ({
        ...prev,
        [name]: intergerPart + "." + decimalPart,
      }));
      return;
    } else {
      setCurrency((prev) => ({ ...prev, [name]: intergerPart }));
      return;
    }
  };

	return (
		<div className="max-w-[500px] mx-auto h-full">
			<div className="text-center mb-10">
				<h3 className="text-xl lg:text-2xl mb-1.5 font-semibold">
					Tenant Information
				</h3>
				<p className="text-sm text-darkGrey">
					Enter detailed tenant information and keep property data up-to-date
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
						label="Tenant Name"
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
						label="Phone Number"
						register={register}
						error={errors.phone?.message as string}
						defaultValue={formDefaultValue.phone}
					/>
					<Input
						required
						name="rent_paid"
						type="text"
						size="lg"
						placeholder="N0.00"
						label="Rent paid"
						value={currency.rent_paid}
						register={register}
						error={errors.rent_paid?.message as string}
						defaultValue={formDefaultValue.rent_paid}
						onChange={handleCurrencyChange}
					/>
					<Input
						required
						name="balance"
						type="text"
						size="lg"
						placeholder="N0.00"
						label="Outstanding Balance"
						value={currency.balance}
						register={register}
						error={errors.balance?.message as string}
						defaultValue={formDefaultValue.balance as string}
						onChange={handleCurrencyChange}
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
            isLoading={isPropertiesLoading}
            register={register}
            defaultValue={formDefaultValue.assigned_property as string}
            error={errors.assigned_property?.message as string}
          />
          <Select
            size="lg"
            name="assigned_unit"
            label="Assigned Unit:"
            register={register}
            data={
              available_units?.map((unit): { key: string; label: string } => ({
                key: unit.toString(),
                label: `Unit ${unit}`,
              })) || []
            }
            defaultValue={String(formDefaultValue?.assigned_unit)}
            error={errors.assigned_unit?.message as string}
          />
          <DateInput
            size="lg"
            error={errors.start_date?.message as string}
            label="Move-in date"
            name="start_date"
            register={register}
            setValue={setValue}
            defaultValue={formDefaultValue.start_date}
          />

          <DateInput
            size="lg"
            error={errors.end_date?.message as string}
            label="End Date"
            name="end_date"
            register={register}
            setValue={setValue}
            defaultValue={formDefaultValue.end_date}
          />
        </div>
        <div className="space-y-3">
          <Button isLoading={isLoading} type="submit" className="w-full">
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
  );
};

export default TenantForm;
