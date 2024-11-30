import { DatePicker } from "@nextui-org/date-picker";
import { DateProps } from "../../types/common";
import { DateValue, parseDate } from "@internationalized/date";
import moment from "moment";

export default function DateInput({
	label,
	register,
	name,
	error,
	setValue,
	defaultValue,
	size,
	isRequired,
}: DateProps) {
	return (
		<DatePicker
			className="w-full"
			label={label}
			labelPlacement="outside"
			radius="sm"
			isInvalid={!!error}
			errorMessage={error}
			onChange={(value: DateValue) => {
				const date = new Date(value.year, value.month, value.day).toISOString();
				setValue(name, date);
				register && register(name).onChange({ target: { value: date } });
			}}
			defaultValue={
				defaultValue && parseDate(moment(defaultValue).format("YYYY-MM-DD"))
			}
			isRequired={isRequired}
			size={size}
		/>
	);
}
