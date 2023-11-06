import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import Box from "components/controls/Box";
import Typography from "components/controls/Typography";

import DashboardLayout from "components/layouts/dashboardLayout";
import DashboardNavbar from "components/layouts/navbar/dashboardNavbar";
import DropzoneControl from "components/DropzoneControl";
import Footer from "components/layouts/footer";
import { useEffect, useState } from "react";
import { DropzoneFile } from "dropzone";
import DynamicTableControl from "components/DynamicTableControl/DynamicTable";
import axios from "axios";
import FileUploadZone from "components/FileUploadZone";
import { useLocation } from "react-router-dom";
function DynamicTable(): JSX.Element {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!id ? (
        <>
          <FileUploadZone />
        </>
      ) : (
        <>
          <DynamicTableControl />
        </>
      )}
    </DashboardLayout>
  );
}

export default DynamicTable;
