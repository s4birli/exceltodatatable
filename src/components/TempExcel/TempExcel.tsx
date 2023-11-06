import { Button } from "primereact/button";
import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";

const filePath = "./temp.xls";
function addRowsToExcel() {
  try {
    // Load an existing workbook
    const workbook = XLSX.readFile(filePath);

    // Assume our data is in the first worksheet
    const firstSheetName = workbook.SheetNames[2];
    const worksheet = workbook.Sheets[firstSheetName];

    // This represents the new data we want to insert after the 24th row
    const newData = [
      ["New Data 1A", "New Data 1B", "New Data 1C"],
      ["New Data 1A", "New Data 1B", "New Data 1C"],
      ["New Data 1A", "New Data 1B", "New Data 1C"],
      ["New Data 1A", "New Data 1B", "New Data 1C"],
      ["New Data 1A", "New Data 1B", "New Data 1C"],
      ["New Data 1A", "New Data 1B", "New Data 1C"],
    ];

    // Specify the row where we want to start inserting new data
    const startRow = 25; // because we are inserting after the 24th row

    // Get the current range of data in the sheet
    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    // Shift all rows down by the number of new data rows (starting from our specified row)
    for (let rowNum = range.e.r; rowNum >= startRow - 1; rowNum--) {
      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const nextCellAddress = XLSX.utils.encode_cell({
          r: rowNum + newData.length,
          c: colNum,
        });
        const currentCellAddress = XLSX.utils.encode_cell({
          r: rowNum,
          c: colNum,
        });

        // Shift cell down
        worksheet[nextCellAddress] = worksheet[currentCellAddress];
      }
    }

    // Insert the new data
    newData.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({
          r: startRow - 1 + rowIndex,
          c: colIndex,
        });
        worksheet[cellAddress] = { v: cellData }; // 'v' stands for 'value'
      });
    });

    // Update the data range in the worksheet to include the new data
    range.e.r += newData.length;
    worksheet["!ref"] = XLSX.utils.encode_range(range);

    // Write the updated workbook to a file
    XLSX.writeFile(workbook, filePath);

    console.log("Rows successfully added after the 24th row");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

const TempExcel = () => {
  return (
    <div>
      <Button
        type="button"
        icon="pi pi-file"
        severity="success"
        label="Excel"
        rounded
        data-pr-tooltip="Excel"
        onClick={addRowsToExcel}
      />
    </div>
  );
};
export default TempExcel;
