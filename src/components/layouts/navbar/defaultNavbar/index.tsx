import { useState, useEffect, ReactNode, Fragment } from "react";

import { Link } from "react-router-dom";

import Icon from "@mui/material/Icon";
import Popper from "@mui/material/Popper";
import Grow, { GrowProps } from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import Box from "components/controls/Box";
import Typography from "components/controls/Typography";
import Button from "components/controls/Button";
import breakpoints from "assets/theme/base/breakpoints";
import { useMaterialUIController } from "context";
import DefaultNavbarDropdown from "./defaultNavbarDropdown";
import DefaultNavbarMobile from "./defaultNavbarMobile";
interface Props {
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]: string | any;
        }[];
  }[];
  brand?: string;
  transparent?: boolean;
  light?: boolean;
  action?: {
    type: "external" | "internal";
    route: string;
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "dark"
      | "light";
    label: string;
  };
}

interface NewGrowTypes extends GrowProps {
  sx: any;
  [key: string]: any;
}

function NewGrow(props: NewGrowTypes) {
  return <Grow {...props} />;
}

function DefaultNavbar({
  routes,
  brand,
  transparent,
  light,
  action,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [dropdown, setDropdown] = useState<any>("");
  const [dropdownEl, setDropdownEl] = useState<any>("");
  const [dropdownName, setDropdownName] = useState<any>("");
  const [nestedDropdown, setNestedDropdown] = useState<any>("");
  const [nestedDropdownEl, setNestedDropdownEl] = useState<any>("");
  const [nestedDropdownName, setNestedDropdownName] = useState<any>("");
  const [arrowRef, setArrowRef] = useState<any>(null);
  const [mobileNavbar, setMobileNavbar] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false);

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);

    displayMobileNavbar();

    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const renderNavbarItems = routes.map(
    ({ name, icon, href, route, collapse }: any) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        href={href}
        route={route}
        collapse={Boolean(collapse)}
        onMouseEnter={({ currentTarget }: any) => {
          if (collapse) {
            setDropdown(currentTarget);
            setDropdownEl(currentTarget);
            setDropdownName(name);
          }
        }}
        onMouseLeave={() => collapse && setDropdown(null)}
        light={light}
      />
    )
  );

  const renderRoutes = routes.map(
    ({ name, collapse, columns, rowsPerColumn }: any) => {
      let template;

      if (collapse && columns && name === dropdownName) {
        const calculateColumns = collapse.reduce(
          (resultArray: any, item: any, index: any) => {
            const chunkIndex = Math.floor(index / rowsPerColumn);

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          },
          []
        );

        template = (
          <Grid key={name} container spacing={3} py={1} px={1.5}>
            {calculateColumns.map((cols: any, key: any) => {
              const gridKey = `grid-${key}`;
              const dividerKey = `divider-${key}`;

              return (
                <Grid
                  key={gridKey}
                  item
                  xs={12 / columns}
                  sx={{ position: "relative" }}
                >
                  {cols.map((col: any, index: any) => (
                    <Fragment key={col.name}>
                      <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        py={1}
                        mt={index !== 0 ? 2 : 0}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="1.5rem"
                          height="1.5rem"
                          borderRadius="md"
                          color="text"
                          mr={1}
                          fontSize="1rem"
                          lineHeight={1}
                        >
                          {col.icon}
                        </Box>
                        <Typography
                          display="block"
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {col.name}
                        </Typography>
                      </Box>
                      {col.collapse.map((item: any) => (
                        <Typography
                          key={item.name}
                          component={item.route ? Link : MuiLink}
                          to={item.route ? item.route : ""}
                          href={
                            item.href
                              ? item.href
                              : (e: any) => e.preventDefault()
                          }
                          target={item.href ? "_blank" : ""}
                          rel={item.href ? "noreferrer" : "noreferrer"}
                          minWidth="11.25rem"
                          display="block"
                          variant="button"
                          color="text"
                          textTransform="capitalize"
                          fontWeight="regular"
                          py={0.625}
                          px={2}
                          sx={({
                            palette: { grey, dark },
                            borders: { borderRadius },
                          }: Theme) => ({
                            borderRadius: borderRadius.md,
                            cursor: "pointer",
                            transition: "all 300ms linear",

                            "&:hover": {
                              backgroundColor: grey[200],
                              color: dark.main,
                            },
                          })}
                        >
                          {item.name}
                        </Typography>
                      ))}
                    </Fragment>
                  ))}
                  {key !== 0 && (
                    <Divider
                      key={dividerKey}
                      orientation="vertical"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "-4px",
                        transform: "translateY(-45%)",
                        height: "90%",
                      }}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        );
      } else if (collapse && name === dropdownName) {
        template = collapse.map((item: any) => {
          const linkComponent = {
            component: MuiLink,
            href: item.href,
            target: "_blank",
            rel: "noreferrer",
          };

          const routeComponent = {
            component: Link,
            to: item.route,
          };

          return (
            <Typography
              key={item.name}
              {...(item.route ? routeComponent : linkComponent)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              variant="button"
              textTransform="capitalize"
              minWidth={item.description ? "14rem" : "12rem"}
              color={item.description ? "dark" : "text"}
              fontWeight={item.description ? "bold" : "regular"}
              py={item.description ? 1 : 0.625}
              px={2}
              sx={({
                palette: { grey, dark },
                borders: { borderRadius },
              }: Theme) => ({
                borderRadius: borderRadius.md,
                cursor: "pointer",
                transition: "all 300ms linear",

                "&:hover": {
                  backgroundColor: grey[200],
                  color: dark.main,

                  "& *": {
                    color: dark.main,
                  },
                },
              })}
              onMouseEnter={({ currentTarget }: any) => {
                if (item.dropdown) {
                  setNestedDropdown(currentTarget);
                  setNestedDropdownEl(currentTarget);
                  setNestedDropdownName(item.name);
                }
              }}
              onMouseLeave={() => {
                if (item.dropdown) {
                  setNestedDropdown(null);
                }
              }}
            >
              {item.description ? (
                <Box display="flex" py={0.25} fontSize="1rem" color="text">
                  {typeof item.icon === "string" ? (
                    <Icon color="inherit">{item.icon}</Icon>
                  ) : (
                    <Box color="inherit">{item.icon}</Box>
                  )}
                  <Box pl={1} lineHeight={0}>
                    <Typography
                      variant="button"
                      display="block"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" color="text">
                  <Icon sx={{ mr: 1 }}>{item.icon}</Icon>
                  {item.name}
                </Box>
              )}
              {item.collapse && (
                <Icon
                  sx={{
                    fontWeight: "normal",
                    verticalAlign: "middle",
                    mr: -0.5,
                  }}
                >
                  keyboard_arrow_right
                </Icon>
              )}
            </Typography>
          );
        });
      }

      return template;
    }
  );

  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top-start"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => {
        if (!nestedDropdown) {
          setDropdown(null);
          setDropdownName("");
        }
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }: Theme) => white.main,
          }}
        >
          <Box borderRadius="lg">
            <Typography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </Typography>
            <Box shadow="lg" borderRadius="lg" p={1.625} mt={1}>
              {renderRoutes}
            </Box>
          </Box>
        </NewGrow>
      )}
    </Popper>
  );

  const renderNestedRoutes = routes.map(({ collapse, columns }: any) =>
    collapse && !columns
      ? collapse.map(({ name: parentName, collapse: nestedCollapse }: any) => {
          let template;

          if (parentName === nestedDropdownName) {
            template =
              nestedCollapse &&
              nestedCollapse.map((item: any) => {
                const linkComponent = {
                  component: MuiLink,
                  href: item.href,
                  target: "_blank",
                  rel: "noreferrer",
                };

                const routeComponent = {
                  component: Link,
                  to: item.route,
                };

                return (
                  <Typography
                    key={item.name}
                    {...(item.route ? routeComponent : linkComponent)}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    variant="button"
                    textTransform="capitalize"
                    minWidth={item.description ? "14rem" : "12rem"}
                    color={item.description ? "dark" : "text"}
                    fontWeight={item.description ? "bold" : "regular"}
                    py={item.description ? 1 : 0.625}
                    px={2}
                    sx={({
                      palette: { grey, dark },
                      borders: { borderRadius },
                    }: Theme) => ({
                      borderRadius: borderRadius.md,
                      cursor: "pointer",
                      transition: "all 300ms linear",

                      "&:hover": {
                        backgroundColor: grey[200],
                        color: dark.main,

                        "& *": {
                          color: dark.main,
                        },
                      },
                    })}
                  >
                    {item.description ? (
                      <Box>
                        {item.name}
                        <Typography
                          display="block"
                          variant="button"
                          color="text"
                          fontWeight="regular"
                          sx={{ transition: "all 300ms linear" }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    ) : (
                      item.name
                    )}
                    {item.collapse && (
                      <Icon
                        fontSize="small"
                        sx={{
                          fontWeight: "normal",
                          verticalAlign: "middle",
                          mr: -0.5,
                        }}
                      >
                        keyboard_arrow_right
                      </Icon>
                    )}
                  </Typography>
                );
              });
          }

          return template;
        })
      : null
  );

  const nestedDropdownMenu = (
    <Popper
      anchorEl={nestedDropdown}
      popperRef={null}
      open={Boolean(nestedDropdown)}
      placement="right-start"
      transition
      style={{ zIndex: 10 }}
      onMouseEnter={() => {
        setNestedDropdown(nestedDropdownEl);
      }}
      onMouseLeave={() => {
        setNestedDropdown(null);
        setNestedDropdownName("");
        setDropdown(null);
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }: Theme) => white.main,
          }}
        >
          <Box ml={2.5} mt={-2.5} borderRadius="lg">
            <Box shadow="lg" borderRadius="lg" py={1.5} px={1} mt={2}>
              {renderNestedRoutes}
            </Box>
          </Box>
        </NewGrow>
      )}
    </Popper>
  );

  return (
    <Container>
      <Box
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }: any) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <Box
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          <Typography
            variant="button"
            fontWeight="bold"
            color={light ? "white" : "dark"}
          >
            {brand}
          </Typography>
        </Box>
        <Box color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          {renderNavbarItems}
        </Box>
        {action &&
          (action.type === "internal" ? (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              <Button
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </Button>
            </Box>
          ) : (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              <Button
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </Button>
            </Box>
          ))}
        <Box
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          {mobileView && (
            <DefaultNavbarMobile routes={routes} open={mobileNavbar} />
          )}
        </Box>
      </Box>
      {dropdownMenu}
      {nestedDropdownMenu}
    </Container>
  );
}

DefaultNavbar.defaultProps = {
  brand: "Material Dashboard PRO",
  transparent: false,
  light: false,
  action: false,
};

export default DefaultNavbar;
