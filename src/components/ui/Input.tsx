import { Input } from "@nextui-org/input";
import { InputProps } from "../../types/common";
import { memo } from "react";

function App({
	placeholder,
	size,
	label,
	name,
	required,
	register,
	error,
	startContent,
	endContent,
	type,
	defaultValue = "",
	classNames,
}: InputProps) {
	return (
		<div>
			<Input
				radius="sm"
				id={name}
				classNames={{ ...classNames }}
				className="text-white"
				size={size}
				placeholder={placeholder}
				labelPlacement="outside"
				{...(register ? register(name) : {})}
				isInvalid={!!error}
				errorMessage={error}
				endContent={endContent && endContent}
				startContent={startContent && startContent}
				type={type}
				autoComplete="off"
				label={label}
				isRequired={required}
				defaultValue={defaultValue}
			/>
		</div>
	);
}

export default memo(App);
