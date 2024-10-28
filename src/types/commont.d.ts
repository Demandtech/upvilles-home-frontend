import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues> {
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
}
