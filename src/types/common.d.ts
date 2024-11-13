import { SVGProps, ChangeEvent } from "react";
import { FieldValue, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DatePickerProps } from "@nextui-org/date-picker";

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
	onClick?: () => void;
}

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
	placeholder: string;
	size?: "sm" | "md" | "lg";
	label?: string;
	name: Path<TFieldValues>;
	required?: boolean;
	register?: UseFormRegister<TFieldValues>;
	error?: string | null;
	startContent?: ReactNode;
	endContent?: ReactNode;
	type?: string;
	optionalColor?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface DateProps<TFieldValues extends FieldValue = FieldValue> {
	size?: "sm" | "md" | "lg";
	label?: string;
	name: Path<TFieldValues>;
	register?: UseFormRegister<TFieldValues>;
	error?: string | null;
	setValue: UseFormSetValue;
	defaultValue: DateValue;
}

export interface TableColumnType {
	name: string;
	uid: string;
	sortable?: boolean;
	last_men_date: string;
	status: string;
	upcoming_date: string;
	assigned_techs: string;
}

export interface TableRows {
	_id: string;
	assigned_unit: number;
	name: string;
	phone: string;
	move_in_date: string;
	name: string;
	last_men_date: string;
	upcoming_date: string;
	assigned_techs: string;
	status: "completed" | "overdue" | "schedule";
	actions: undefined | null | string;
}

export interface Tenant {
	_id: string;
	actions: undefined | null | string;
	name: string;
	unit_number: number;
	contact: string;
	move_in_date: string;
}
