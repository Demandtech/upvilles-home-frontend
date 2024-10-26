import { Input } from "@nextui-org/input";
import { ChangeEventHandler, ReactNode } from "react";

export default ({
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
	onChange,

	value,
}: {
	placeholder: string;
	size: "sm" | "md" | "lg" | undefined;
	label?: string;
	name: string;
	required?: boolean;
	register?: any;
	error?: string | undefined | null;
	startContent?: ReactNode;
	endContent?: ReactNode;
	type: string;
	onChange?: ChangeEventHandler;
	value?: string;
}) => {
	return (
		<div>
			{label && (
				<label className="mb-1 block" htmlFor={name}>
					{label}
					{!required && (
						<span className="text-white/80 font-light"> (Optional) </span>
					)}
					:
				</label>
			)}
			<Input
				id={name}
				classNames={{
					inputWrapper: "rounded-md bg-white",
					label: "text-white",
				}}
				value={value && value}
				size={size}
				placeholder={placeholder}
				labelPlacement="outside"
				{...(register ? register(name) : {})}
				isInvalid={!!error}
				errorMessage={error}
				endContent={endContent && endContent}
				startContent={startContent && startContent}
				type={type}
				onChange={onChange}
			/>
		</div>
	);
};
