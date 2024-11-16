import { Select, SelectItem } from "@nextui-org/select";
import { memo } from "react";
import { SelectProps } from "../../types/common";


function App({
	register,
	data = [],
	label,
	name,
	error,
	size = "md",
	defaultValue,
	isLoading = false,
}: SelectProps) {
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
				isLoading={isLoading}
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

export default memo(App);
