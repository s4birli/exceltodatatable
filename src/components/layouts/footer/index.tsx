import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import typography from "assets/theme/base/typography";
import Box from "components/controls/Box";
import Typography from "components/controls/Typography";

interface Props {
  company?: {
    href: string;
    name: string;
  };
  links?: {
    href: string;
    name: string;
  }[];
  [key: string]: any;
}

function Footer({ company, links }: Props): JSX.Element {
  const { href, name } = company;
  const { size } = typography;

  // const renderLinks = () =>
  //   links.map((link) => (
  //     <Box key={link.name} component="li" px={2} lineHeight={1}>
  //       <Link href={link.href} target="_blank">
  //         <Typography variant="button" fontWeight="regular" color="text">
  //           {link.name}
  //         </Typography>
  //       </Link>
  //     </Box>
  //   ));

  return (
    // <Box
    //   width="100%"
    //   display="flex"
    //   flexDirection={{ xs: "column", lg: "row" }}
    //   justifyContent="space-between"
    //   alignItems="center"
    //   px={1.5}
    // >
    //   <Box
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     flexWrap="wrap"
    //     color="text"
    //     fontSize={size.sm}
    //     px={1.5}
    //   >
    //     &copy; {new Date().getFullYear()}, made with
    //     <Box fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
    //       <Icon color="inherit" fontSize="inherit">
    //         favorite
    //       </Icon>
    //     </Box>
    //     by
    //     <Link href={href} target="_blank">
    //       <Typography variant="button" fontWeight="medium">
    //         &nbsp;{name}&nbsp;
    //       </Typography>
    //     </Link>
    //     for a better web.
    //   </Box>
    //   <Box
    //     component="ul"
    //     sx={({ breakpoints }) => ({
    //       display: "flex",
    //       flexWrap: "wrap",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       listStyle: "none",
    //       mt: 3,
    //       mb: 0,
    //       p: 0,

    //       [breakpoints.up("lg")]: {
    //         mt: 0,
    //       },
    //     })}
    //   >
    //     {renderLinks()}
    //   </Box>
    // </Box>
    <>Footer</>
  );
}

Footer.defaultProps = {
  company: { href: "/", name: "Company" },
  links: [
    { href: "/", name: "Company" },
    { href: "/about", name: "About Us" },
    { href: "/blog", name: "Blog" },
  ],
};

export default Footer;
