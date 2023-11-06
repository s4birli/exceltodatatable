import { useState, useEffect } from "react";

import { useLocation, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import Box from "components/controls/Box";
import Input from "components/controls/Input";
import Badge from "components/controls/Badge";

import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/NotificationItem";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "components/layouts/navbar/dashboardNavbar/styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState<any>(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );

  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={navbarContainer}>
        <Box
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </Box>
        {isMini ? null : (
          <></>
          // <Box sx={(theme) => navbarRow(theme, { isMini })}>
          //   <Box pr={1}>
          //     <Input label="Search here" />
          //   </Box>
          //   <Box color={light ? "white" : "inherit"}>
          //     <Link to="/authentication/sign-in/basic">
          //       <IconButton sx={navbarIconButton} size="small" disableRipple>
          //         <Icon sx={iconsStyle}>account_circle</Icon>
          //       </IconButton>
          //     </Link>
          //     <IconButton
          //       size="small"
          //       disableRipple
          //       color="inherit"
          //       sx={navbarMobileMenu}
          //       onClick={handleMiniSidenav}
          //     >
          //       <Icon sx={iconsStyle} fontSize="medium">
          //         {miniSidenav ? "menu_open" : "menu"}
          //       </Icon>
          //     </IconButton>
          //     <IconButton
          //       size="small"
          //       disableRipple
          //       color="inherit"
          //       sx={navbarIconButton}
          //       onClick={handleConfiguratorOpen}
          //     >
          //       <Icon sx={iconsStyle}>settings</Icon>
          //     </IconButton>
          //     <IconButton
          //       size="small"
          //       color="inherit"
          //       sx={navbarIconButton}
          //       onClick={handleOpenMenu}
          //     >
          //       <Badge badgeContent={9} color="error" size="xs" circular>
          //         <Icon sx={iconsStyle}>notifications</Icon>
          //       </Badge>
          //     </IconButton>
          //     {renderMenu()}
          //   </Box>
          // </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
