import { Select, SelectItem } from "@nextui-org/select";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface AppProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	data: { key: string; label: string }[];
	label?: string;
	name: Path<T>;
	error?: string;
	size?: "sm" | "md" | "lg";
	defaultValue: string;
}

export default function App<T extends FieldValues>({
	register,
	data,
	label,
	name,
	error,
	size = "md",
	defaultValue,
}: AppProps<T>) {
	return (
		<div className="w-full">
			{label && (
				<label className="mb-1 block text-sm" htmlFor="select">
					{label}
				</label>
			)}
			<Select
				id="select"
				size={size}
				className="w-full"
				classNames={{ popoverContent: "rounded-md", trigger: "rounded-md" }}
				placeholder="Select"
				aria-label="Selector"
				{...register(name)}
				errorMessage={error}
				isInvalid={!!error}
				defaultSelectedKeys={[defaultValue]}
			>
				{data.map((item: { key: string; label: string }) => {
					return (
						<SelectItem color="primary" key={item.key}>
							{item.label}
						</SelectItem>
					);
				})}
			</Select>
		</div>
	);
}
