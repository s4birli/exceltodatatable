import React, { useState, useEffect } from "react";
import { DataTable, DataTableFilterEvent } from "primereact/datatable";
import {
  Column,
  ColumnEditorOptions,
  ColumnEvent,
  ColumnFilterElementTemplateOptions,
} from "primereact/column";
import "./DynamicTable.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ColumnType, defaultFilters, headersList } from "./DynamicTable.types";
import { InputText } from "primereact/inputtext";

const DynamicTableControl = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(25);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState<1 | -1>(1);
  const [filters, setFilters] = useState(defaultFilters);
  const [visibleColumns, setVisibleColumns] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [headers] = useState<any[]>(headersList);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const initFilters = () => {
    setFilters(defaultFilters);
  };

  const updateData = async (rowData: any) => {
    setLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_DEFAULT_API}/update/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: rowData,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("Error: " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchData = async (
    page: number,
    rowsCount: number,
    sortField: string,
    sortOrder: 1 | -1,
    filters: any
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEFAULT_API}/data`,
        {
          params: {
            id,
            page,
            rowsCount,
            sort: { field: sortField, order: sortOrder },
            filters: filters,
          },
        }
      );
      const resultData = response.data;
      setTotalRecords(resultData.totalRecords);
      let newDataArray = resultData.data.map((doc: any) => {
        return { _id: doc._id, ...doc.data };
      });
      setData(newDataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(first, rows, sortField, sortOrder, filters);
      initFilters();
    }
  }, [id]);

  const onPage = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchData(event.first, event.rows, sortField, sortOrder, filters);
  };

  const onSort = (event: any) => {
    setSortField(event.sortField);
    setSortOrder(event.sortOrder);
    fetchData(first, rows, event.sortField, event.sortOrder, filters);
  };

  const onFilter = (event: DataTableFilterEvent) => {
    event["first"] = 0;
    setFilters(event.filters);
    fetchData(first, rows, sortField, sortOrder, event.filters);
  };

  useEffect(() => {
    const visibleAndColumnHeaders = headers.map((header) => ({
      id: header.id,
      name: header.name,
      field: header.field,
      sortable: header.sortable,
      filter: header.filter,
      dataType: header.dataType,
    }));
    setVisibleColumns(visibleAndColumnHeaders);
    setColumns(visibleAndColumnHeaders);
  }, [headers]);

  const onColumnToggle = (event: { value: ColumnType[] }) => {
    const selectedColumns = event.value;
    const selectedColumnIds = new Set(selectedColumns.map((col) => col.id));

    const orderedSelectedColumns = headers.filter((header) =>
      selectedColumnIds.has(header.id)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "data");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <MultiSelect
          value={visibleColumns}
          options={columns}
          optionLabel="name"
          onChange={onColumnToggle}
          className="flex w-full sm:w-30rem"
          display="chip"
        />

        <span className="flex gap-3">
          <div className="flex gap-1">
            <Button
              type="button"
              icon="pi pi-save"
              severity="secondary"
              rounded
              label="Export"
              data-pr-tooltip="Export"
              onClick={exportExcel}
            />
          </div>
        </span>
      </div>
    );
  };

  const renderedHeader = renderHeader();

  const numberFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <InputText
        value={options.value}
        onChange={(e: any) => {
          options.filterCallback(e.target.value, options.index);
        }}
      />
    );
  };

  const cellEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback(e.target.value)
        }
      />
    );
  };

  const onCellEditComplete = (e: ColumnEvent) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    updateData(rowData);
  };

  return (
    <div className="datatable-doc-demo">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          dataKey="_id"
          lazy
          editMode="cell"
          first={first}
          stripedRows
          value={data}
          paginator
          filters={filters}
          globalFilterFields={["hole_depth"]}
          header={renderedHeader}
          rows={rows}
          sortMode="single"
          sortField={sortField}
          sortOrder={sortOrder}
          rowsPerPageOptions={[5, 25, 50, 100, 200, 500, 1000]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowHover
          loading={loading}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          onFilter={onFilter}
          emptyMessage="No Data found."
        >
          {visibleColumns.map((header) => (
            <Column
              key={header.id}
              field={header.field}
              header={header.name}
              sortable={header.sortable}
              filter={header.filter}
              {...(header.dataType ? { dataType: header.dataType } : {})}
              filterElement={header.dataType ? numberFilterTemplate : undefined}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          ))}
        </DataTable>
      )}
    </div>
  );
};

export default DynamicTableControl;
