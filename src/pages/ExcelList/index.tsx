import axios from "axios";
import ExcelListComponent from "components/ExcelListComponent";
import DashboardLayout from "components/layouts/dashboardLayout";
import DashboardNavbar from "components/layouts/navbar/dashboardNavbar";
import { useEffect, useState } from "react";

const ExcelList = () => {
  const [data, setData] = useState<any[]>([]);
  async function getData() {
    const response = await axios.get(
      `${process.env.REACT_APP_DEFAULT_API}/excelList`
    );
    const { data } = response.data;
    setData(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ExcelListComponent list={data} />
    </DashboardLayout>
  );
};
export default ExcelList;
