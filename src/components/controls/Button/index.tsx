import { FC, ReactNode, forwardRef } from "react";

import { ButtonProps } from "@mui/material";

import ButtonRoot from "./ButtonRoot";

interface Props extends Omit<ButtonProps, "color" | "variant"> {
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "default";
  variant?: "text" | "contained" | "outlined" | "gradient";
  size?: "small" | "medium" | "large";
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const Button: FC<Props> = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => {
    const darkMode = false;

    return (
      <ButtonRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </ButtonRoot>
    );
  }
);

Button.defaultProps = {
  color: "white",
  variant: "contained",
  size: "medium",
  circular: false,
  iconOnly: false,
};

export default Button;
