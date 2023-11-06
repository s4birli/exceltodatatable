import DashboardLayout from "components/layouts/dashboardLayout";
import { Button } from "primereact/button";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  list: any[];
}
const ExcelList: FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();
  const { list } = props;
  const ShowButtonTemplate = (rowData: any, options: ColumnBodyOptions) => {
    const icon = "pi pi-pencil";

    return (
      <Button
        type="button"
        icon={icon}
        className="p-button-sm p-button-text"
        onClick={() => navigate(`/applications/import-excel?id=${rowData._id}`)}
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <DataTable
      lazy
      filterDisplay="row"
      first={0}
      stripedRows
      value={list}
      paginator
      rows={25}
      dataKey="_id"
      rowsPerPageOptions={[5, 25, 50, 100, 200, 500, 1000]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowHover
      totalRecords={1}
    >
      <Column
        key="file_name"
        field="file_name"
        header="File Name"
        sortable
        filter
        style={{
          whiteSpace: "nowrap",
          padding: "1rem",
          textAlign: "center",
        }}
        bodyClassName="text-center"
      />
      <Column
        key="create_date"
        field="create_date"
        header="Created Date"
        sortable
        filter
        style={{
          whiteSpace: "nowrap",
          padding: "1rem",
          textAlign: "center",
        }}
        bodyClassName="text-center"
        body={(rowData: any) => formatDate(rowData.create_date)}
      />
      <Column style={{ flex: "0 0 4rem" }} body={ShowButtonTemplate}></Column>
    </DataTable>
  );
};
export default ExcelList;
