import React from "react";
import { currentUserPdfs, fileUpload } from "../helpers/apiServices";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import { Button } from "@chakra-ui/react";

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
      <h1>Your Documents</h1>

      <div className="thumbnail-wrapper">
        {pdfs?.map((pdf) => (
          <Thumbnail
            fileUrl={`http://localhost:5000/${pdf.url}`}
            pageIndex={0}
          />
        ))}
      </div>
      <h1>Upload Your Documents</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required onChange={handleChange} />
        <Button type="submit">Upload</Button>
      </form>
    </>
  );
};

export default Dashboard;
