import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleFileSelect = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  async function handleFilesUploaded(e: any) {
    setLoading(true);
    const formData = new FormData();

    formData.append("file_uploads", file, file.name);
    await axios
      .post(`${process.env.REACT_APP_DEFAULT_API}/data`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response.data;
        const fileId = data.id;
        navigate(`/applications/import-excel?id=${fileId}`);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <input
            type="file"
            id="file_uploads"
            name="file_uploads"
            accept=".xls,.xlsx,.cvs,application/excel"
            onChange={handleFileSelect}
          />
          <button onClick={handleFilesUploaded}>Submit</button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
