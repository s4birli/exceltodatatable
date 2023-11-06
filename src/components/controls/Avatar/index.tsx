import { FC, forwardRef } from "react";
import { AvatarProps } from "@mui/material";
import AvatarRoot from "components/controls/Avatar/AvatarRoot";

interface Props extends AvatarProps {
  bgColor?:
    | "transparent"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";
  [key: string]: any;
}

const Avatar: FC<Props> = forwardRef(
  ({ bgColor, size, shadow, ...rest }, ref) => (
    <AvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

Avatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

export default Avatar;
