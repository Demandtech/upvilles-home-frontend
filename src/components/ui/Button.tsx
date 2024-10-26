// import { FC } from "react";
import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

export default ({
	children,
	className,
	type,
	color = "primary",
	disabled,
	size,
	variant = "solid",
	onPress,
	ariaLabel,
	isIconOnly = false,
	isLoading = false,
	startContent,
	endContent,
}: {
	children: ReactNode;
	type: "button" | "submit" | "reset" | undefined;
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger"
		| undefined;
	disabled?: boolean;
	size: "sm" | "md" | "lg" | undefined;
	variant?:
		| "solid"
		| "bordered"
		| "light"
		| "flat"
		| "faded"
		| "shadow"
		| "ghost";
	className?: string;
	onPress?: any;
	ariaLabel?: string;
	isIconOnly?: boolean;
	isLoading?: boolean;
	startContent?: ReactNode;
	endContent?: ReactNode;
}) => {
	return (
		<div>
			<Button
				variant={variant}
				size={size}
				disabled={disabled}
				color={color}
				type={type}
				className={className}
				onPress={onPress}
				aria-label={ariaLabel}
				isIconOnly={isIconOnly}
				style={{
					cursor: "pointer",
				}}
				isLoading={isLoading}
				startContent={startContent}
				endContent={endContent}
			>
				{children}
			</Button>
		</div>
	);
};
