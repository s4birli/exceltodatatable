import { ReactNode } from "react";
import Box from "../../controls/Box";

function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>"Main"{children}</>
    // <Box
    //   sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
    //     p: 3,
    //     position: "relative",

    //     [breakpoints.up("xl")]: {
    //       marginLeft: pxToRem(274),
    //       transition: transitions.create(["margin-left", "margin-right"], {
    //         easing: transitions.easing.easeInOut,
    //         duration: transitions.duration.standard,
    //       }),
    //     },
    //   })}
    // >

    // </Box>
  );
}

export default Layout;
