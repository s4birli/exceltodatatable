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
    const response = await axios.post(
      `${process.env.REACT_APP_DEFAULT_API}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setLoading(false);
    const { data } = response.data;
    const fileId = data.id;
    navigate(`/applications/import-excel?id=${fileId}`);
  }
  const handleDeleteAll = async () => {
    //
    const response = await axios.post(
      `${process.env.REACT_APP_DEFAULT_API}/deleteAll`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  return (
    <>
      <div>
        <input
          type="file"
          id="file_uploads"
          name="file_uploads"
          accept=".xls,.xlsx,.cvs,application/excel"
          onChange={handleFileSelect}
        />
        <button onClick={handleFilesUploaded}>Submit</button>
        {/* <button onClick={handleDeleteAll}>Delete All</button> */}
      </div>
      {loading && <div>Loading..</div>}
    </>
  );
};

export default FileUpload;
