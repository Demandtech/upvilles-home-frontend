import { Select, SelectItem } from "@nextui-org/select";

export default function App({
	register,
	data,
	label,
	name,
	error,
}: {
	register: any;
	data: { key: number; label: string }[];
	label?: string;
	name?: string;
	error?: string;
}) {
	return (
		<div className="w-full">
			{label && (
				<label className="mb-1 block" htmlFor="select">
					{label}
				</label>
			)}
			<Select
				id="select"
				size="md"
				className="w-full"
				classNames={{ popoverContent: "rounded-md", trigger: "rounded-md" }}
				placeholder="Select"
				aria-label="Selector"
				name={name}
				{...register(name)}
				errorMessage={error}
				isInvalid={!!error}
			>
				{data.map((item) => {
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
