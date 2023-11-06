import { forwardRef, FC, ReactNode } from "react";

import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { MenuItemProps } from "@mui/material";
import Box from "components/controls/Box";
import Typography from "components/controls/Typography";
import menuItem from "./styles";

interface Props extends MenuItemProps {
  icon: ReactNode;
  title: string;
  [key: string]: any;
}

const NotificationItem: FC<Props> = forwardRef(
  ({ icon, title, ...rest }, ref) => (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
      <Box
        component={Link}
        py={0.5}
        display="flex"
        alignItems="center"
        lineHeight={1}
      >
        <Typography variant="body1" color="secondary" lineHeight={0.75}>
          {icon}
        </Typography>
        <Typography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
    </MenuItem>
  )
);

export default NotificationItem;
