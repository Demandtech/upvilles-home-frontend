
import { Input } from "@nextui-org/input";


export default ({
	placeholder,
	size,
	label,
	name,
	required,
}: {
	placeholder: string;
	size: "sm" | "md" | "lg" | undefined;
	label: string;
	name: string;
	required: boolean;
}) => {
	return (
		<div>
			<label className="mb-1 block" htmlFor={name}>
				{label}
				{!required && (
					<span className="text-white/80 font-light"> (Optional) </span>
				)}
				:
			</label>
			<Input
				id={name}
				classNames={{
					inputWrapper: "rounded-md",
					label: "text-white",
				}}
				size={size}
				placeholder={placeholder}
				labelPlacement="outside"
			/>
		</div>
	);
};
