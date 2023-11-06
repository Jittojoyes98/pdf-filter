import React, { useState } from "react";
import { fileUpload } from "../helpers/apiServices";
import useToast from "../hooks/useToast";

const Dashboard = () => {
  const [files, setFiles] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fileUpload(files);
  };

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file.type != "application/pdf") {
      e.target.value = null;
      useToast("Please choose a pdf", "error");
      return;
    }
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
