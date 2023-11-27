import React from "react";
import { currentUserPdfs, fileUpload } from "../helpers/apiServices";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [files, setFiles] = React.useState(null);
  const navigate = useNavigate();
  const [pdfs, setPdfs] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadStatus = await fileUpload(files);
    if (uploadStatus) {
      navigate("/editor");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file.type != "application/pdf") {
      e.target.value = null;
      useToast("Please choose a pdf", "error");
      return;
    }
    setFiles(e.target.files[0]);
  };

  React.useEffect(() => {
    const getPdfs = async () => {
      const result = await currentUserPdfs();
      if (result.pdf.length > 0) {
        setPdfs(result.pdf);
      }
    };
    getPdfs();
  }, []);

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
