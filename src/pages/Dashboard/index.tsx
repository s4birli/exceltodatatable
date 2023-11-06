import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import Box from "components/controls/Box";
import Typography from "components/controls/Typography";

import DashboardLayout from "components/layouts/dashboardLayout";
import DashboardNavbar from "components/layouts/navbar/dashboardNavbar";
import Footer from "components/layouts/footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
// import SalesByCountry from "layouts/dashboards/Dashboard/components/SalesByCountry";

// Data
// import reportsBarChartData from "layouts/dashboards/Dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboards/Dashboard/data/reportsLineChartData";

function Dashboard(): JSX.Element {
  // const { sales, tasks } = reportsLineChartData;

  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <Typography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </Typography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <Typography
          variant="body1"
          color="info"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </Typography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
