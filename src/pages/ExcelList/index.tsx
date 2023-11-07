import axios from "axios";
import ExcelListComponent from "components/ExcelListComponent";
import DashboardLayout from "components/layouts/dashboardLayout";
import DashboardNavbar from "components/layouts/navbar/dashboardNavbar";
import { useEffect, useState } from "react";

const ExcelList = () => {
  const [data, setData] = useState<any[]>([]);
  async function getData() {
    console.log(process.env.REACT_APP_DEFAULT_API);
    await axios
      .get(`${process.env.REACT_APP_DEFAULT_API}/excelList`)
      .then((response) => {
        const { data } = response.data;
        setData(data);
      })
      .catch((error) => console.log(error));
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
