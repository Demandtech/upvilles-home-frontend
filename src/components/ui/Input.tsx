import { Input } from "@nextui-org/input";

import { InputProps } from "../../types/commont";
import { FieldValues } from "react-hook-form";

const MyInput = <TFieldValues extends FieldValues>({
  placeholder,
  size = "md",
  label,
  name,
  required = false,
  register,
  error,
  startContent,
  endContent,
  type = "text",
  ...rest
}: InputProps<TFieldValues>) => {
  return (
    <div>
      {label && (
        <label className="mb-1 block" htmlFor={name}>
          {label}
          {!required && (
            <span className="text-white/80 font-light"> (Optional) </span>
          )}
          :
        </label>
      )}
      <Input
        id={name}
        classNames={{
          inputWrapper: "rounded-md bg-white",
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
        {...rest}
      />
    </div>
  );
};

export default MyInput;
