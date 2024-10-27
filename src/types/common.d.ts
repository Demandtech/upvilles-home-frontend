import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface ButtonProps {
	children: ReactNode;
	type?: "button" | "submit" | "reset";
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger";
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	variant?:
		| "solid"
		| "bordered"
		| "light"
		| "flat"
		| "faded"
		| "shadow"
		| "ghost";
	className?: string;
	onPress?: () => void;
	ariaLabel?: string;
	isIconOnly?: boolean;
	isLoading?: boolean;
	startContent?: ReactNode;
	endContent?: ReactNode;
}

export interface InputProps {
	name: string;
	placeholder?: string;
	size: "sm" | "md" | "lg" | undefined;
	label?: string;
	required?: boolean;
	register?: any;
	error?: string | undefined | null;
	startContent?: ReactNode;
	endContent?: ReactNode;
	type: string;
	optionalColor?: string;
}
