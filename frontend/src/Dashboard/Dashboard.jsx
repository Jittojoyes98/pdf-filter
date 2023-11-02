import React, { useState } from "react";
import { fileUpload } from "../helpers/apiServices";
import { showToast } from "../helpers/common";

const Dashboard = () => {
  const [files, setFiles] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileStatus = await fileUpload(files);
    if (fileStatus) {
      showToast("Uplaod successful");
    } else {
      showToast("Uplaod failed", "error");
    }
  };
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
  };
  return (
    <>
      <div>Dashboard</div>
      <h1>Pdf upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Dashboard;
