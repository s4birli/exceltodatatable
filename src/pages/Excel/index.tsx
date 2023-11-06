import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import Box from "components/controls/Box";
import Typography from "components/controls/Typography";

import DashboardLayout from "components/layouts/dashboardLayout";
import DashboardNavbar from "components/layouts/navbar/dashboardNavbar";
import DropzoneControl from "components/DropzoneControl";
import TempExcel from "components/TempExcel/TempExcel";
function Excel(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TempExcel />
    </DashboardLayout>
  );
}

export default Excel;
