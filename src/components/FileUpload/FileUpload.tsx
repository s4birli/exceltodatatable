import React, { useState } from "react";

function FileUpload({ onChange }: { onChange: (selectedFile: File) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".csv")
      ) {
        setSelectedFile(file);
      } else {
        alert("Lütfen sadece CSV veya Excel dosyaları yükleyin.");
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Dosyayı Yükle</button>
    </div>
  );
}

export default FileUpload;
