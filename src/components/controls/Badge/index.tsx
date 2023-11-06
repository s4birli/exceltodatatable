import { FC, ReactNode, forwardRef } from "react";

import { BadgeProps } from "@mui/material";

import BadgeRoot from "./BadgeRoot";

interface Props extends Omit<BadgeProps, "color" | "variant"> {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  variant?: "gradient" | "contained";
  size?: "xs" | "sm" | "md" | "lg";
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  children?: ReactNode;
  container?: boolean;
  [key: string]: any;
}

const Badge: FC<Props | any> = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      indicator,
      border,
      container,
      children,
      ...rest
    },
    ref
  ) => (
    <BadgeRoot
      {...rest}
      ownerState={{
        color,
        variant,
        size,
        circular,
        indicator,
        border,
        container,
        children,
      }}
      ref={ref}
      color="default"
    >
      {children}
    </BadgeRoot>
  )
);

Badge.defaultProps = {
  color: "info",
  variant: "gradient",
  size: "sm",
  circular: false,
  indicator: false,
  border: false,
  container: false,
  children: false,
};

export default Badge;
