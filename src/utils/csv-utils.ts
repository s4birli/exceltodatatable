import { parse } from "papaparse";

function getCSVHeaders(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const text = event.target.result;
      parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          if (result.data && result.data.length > 0) {
            const headers = Object.keys(result.data[0]);
            resolve(headers);
          } else {
            reject("CSV file is empty or headers are missing!");
          }
        },
        error: (error: any) => {
          reject(error);
        },
      });
    };
    reader.readAsText(file);
  });
}

export { getCSVHeaders };
