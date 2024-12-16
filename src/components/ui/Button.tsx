import { forwardRef, memo, Suspense, lazy } from "react";
import { ButtonProps } from "../../types/common";

const LazyButton = lazy(() =>
	import("@nextui-org/button").then((module) => ({
		default: module.Button,
	}))
);

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
			<Suspense>
				<LazyButton
					ref={ref}
					variant={variant}
					size={size}
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
				</LazyButton>
			</Suspense>
		);
	}
);

MyButton.displayName = "Button";

export default memo(MyButton);
