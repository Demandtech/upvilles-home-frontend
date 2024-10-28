import { Input } from "@nextui-org/input";
import { InputProps } from "../../types/common";

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
	optionalColor = "text-white/80",
}: InputProps) => {
	return (
		<div>
			{label && (
				<label className="mb-1 block text-sm" htmlFor={name}>
					{label}
					{!required && (
						<span className={`${optionalColor} text-xs font-light`}>
							{" "}
							(Optional){" "}
						</span>
					)}
					:
				</label>
			)}
			<Input
				id={name}
				classNames={{
					inputWrapper: "rounded-md",
					input: "bg-red",
					label: "text-white",
				}}
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
			/>
		</div>
	);
};
