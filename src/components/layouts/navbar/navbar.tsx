import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import Box from "../../../components/controls/Box";
import Input from "../../../components/controls/Input";
import Badge from "../../../components/controls/Badge";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "./styles";
import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/NotificationItem";

function Navbar(): JSX.Element {
  // const absolute = false;
  // const light = false;
  // const isMini = false;
  // const [navbarType, setNavbarType] = useState<
  //   "fixed" | "absolute" | "relative" | "static" | "sticky"
  // >("sticky");
  // const [openMenu, setOpenMenu] = useState<any>(false);
  // const route = useLocation().pathname.split("/").slice(1);

  // // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem
  //       icon={<Icon>podcasts</Icon>}
  //       title="Manage Podcast sessions"
  //     />
  //     <NotificationItem
  //       icon={<Icon>shopping_cart</Icon>}
  //       title="Payment successfully completed"
  //     />
  //   </Menu>
  // );

  // // Styles for the navbar icons
  // const iconsStyle = ({
  //   palette: { dark, white, text },
  //   functions: { rgba },
  // }: {
  //   palette: any;
  //   functions: any;
  // }) => ({
  //   color: () => {
  //     let colorValue = white.main;
  //     colorValue = rgba(text.main, 0.6);

  //     return colorValue;
  //   },
  // });

  const transparentNavbar = true;
  const darkMode = false;

  return (
    <>Nav</>
    // <AppBar
    //   position={absolute ? "absolute" : navbarType}
    //   color="inherit"
    //   sx={(theme) =>
    //     navbar(theme, { transparentNavbar, absolute, light, darkMode })
    //   }
    // >
    //   <Toolbar sx={navbarContainer}>
    //     <Box
    //       color="inherit"
    //       mb={{ xs: 1, md: 0 }}
    //       sx={(theme) => navbarRow(theme, { isMini })}
    //     >
    //       <Breadcrumbs
    //         icon="home"
    //         title={route[route.length - 1]}
    //         route={route}
    //         light={light}
    //       />
    //       <IconButton sx={navbarDesktopMenu} size="small" disableRipple>
    //         <Icon fontSize="medium" sx={iconsStyle}>
    //           menu
    //         </Icon>
    //       </IconButton>
    //     </Box>
    //     {isMini ? null : (
    //       <Box sx={(theme) => navbarRow(theme, { isMini })}>
    //         <Box pr={1}>
    //           <Input label="Search here" />
    //         </Box>
    //         <Box color={light ? "white" : "inherit"}>
    //           <Link to="/authentication/sign-in/basic">
    //             <IconButton sx={navbarIconButton} size="small" disableRipple>
    //               <Icon sx={iconsStyle}>account_circle</Icon>
    //             </IconButton>
    //           </Link>
    //           <IconButton
    //             size="small"
    //             disableRipple
    //             color="inherit"
    //             sx={navbarMobileMenu}
    //           >
    //             <Icon sx={iconsStyle} fontSize="medium">
    //               {"menu"}
    //             </Icon>
    //           </IconButton>
    //           <IconButton
    //             size="small"
    //             disableRipple
    //             color="inherit"
    //             sx={navbarIconButton}
    //           >
    //             <Icon sx={iconsStyle}>settings</Icon>
    //           </IconButton>
    //           <IconButton size="small" color="inherit" sx={navbarIconButton}>
    //             <Badge badgeContent={9} color="error" size="xs" circular>
    //               <Icon sx={iconsStyle}>notifications</Icon>
    //             </Badge>
    //           </IconButton>
    //           {renderMenu()}
    //         </Box>
    //       </Box>
    //     )}
    //   </Toolbar>
    // </AppBar>
  );
}

Navbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default Navbar;
