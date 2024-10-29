import { Button } from "@nextui-org/button";
import { ButtonProps } from "../../types/common";
import { forwardRef } from "react";

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      type = "button",
      color = "primary",
      disabled = false,
      size = "md",
      variant = "solid",
      onPress,
      ariaLabel,
      isIconOnly = false,
      isLoading = false,
      startContent,
      endContent,
      onClick,
    },
    ref
  ) => {
    return (
      <div>
        <Button
          ref={ref}
          variant={variant}
          size={size}
          // disabled={true}
          color={color}
          type={type}
          className={`rounded-md text-sm ${className}`}
          onPress={onPress}
          aria-label={ariaLabel}
          isIconOnly={isIconOnly}
          style={{
            cursor: "pointer",
          }}
          isLoading={isLoading}
          startContent={startContent}
          endContent={endContent}
          isDisabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      </div>
    );
  }
);
MyButton.displayName = "MyButton";
export default MyButton;
