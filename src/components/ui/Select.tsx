import { memo } from "react";
import { SelectProps } from "../../types/common";
import { Select, SelectItem } from "@nextui-org/select";

function App({
	register,
	data = [],
	label,
	name,
	error,
	size = "md",
	defaultValue,
	isLoading = false,
	isRequired,
	scrollRef,
	setIsOpen,
	variant,
}: SelectProps) {
	return (
		<div>
			<Select
				labelPlacement="outside"
				label={label}
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
				isRequired={isRequired}
				scrollRef={scrollRef}
				onOpenChange={setIsOpen}
				items={data}
				variant={variant}
			>
				{(item) => (
					<SelectItem color="primary" key={item?.key}>
						{item?.label}
					</SelectItem>
				)}
			</Select>
		</div>
	);
}

export default memo(App);
