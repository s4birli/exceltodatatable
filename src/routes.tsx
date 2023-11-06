import Dashboard from "pages/Dashboard";

import Icon from "@mui/material/Icon";
import DynamicTable from "pages/DynamicTable";
import Excel from "pages/Excel";
import ExcelList from "pages/ExcelList";

const routes = [
  {
    type: "collapse",
    name: "Main",
    key: "",
    route: "/",
    component: <Dashboard />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [
      {
        name: "Import Excel",
        key: "import-excel",
        route: "/applications/import-excel",
        component: <DynamicTable />,
      },
      {
        name: "Excel List",
        key: "excel-list",
        route: "/applications/excel-list",
        component: <ExcelList />,
      },
      {
        name: "Template Excel",
        key: "template-excel",
        route: "/applications/template",
        component: <Excel />,
      },
    ],
  },
];

export default routes;
