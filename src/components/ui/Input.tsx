import { Input } from "@nextui-org/input";
import { InputProps } from "../../types/common";
import { memo } from "react";

function App({
  placeholder,
  size,
  label,
  name,
  required,
  register,
  error,
  startContent,
  endContent,
  type,
  optionalColor = "text-white/80",
  value,
  onChange,
  defaultValue = "",
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          className={`mb-1 block text-sm ${error ? "text-danger" : ""}`}
          htmlFor={name}
        >
          {label}
          {!required && (
            <span className={`${optionalColor} text-xs font-light`}>
              {" "}
              (Optional)
            </span>
          )}
          :
        </label>
      )}
      <Input
        id={name}
        classNames={{
          inputWrapper: "rounded-md",
          input: "bg-red",
          label: "text-white text-lg",
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
        autoComplete="off"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default memo(App);
