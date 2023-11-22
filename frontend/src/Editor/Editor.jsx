import React from "react";
import { getCurrentFile } from "../helpers/apiServices";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@chakra-ui/react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import "react-pdf/dist/esm/Page/TextLayer.css";

const Editor = () => {
  const [pdfURL, setPdfURL] = React.useState();
  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  React.useEffect(() => {
    const getFileDetails = async () => {
      const fileDetails = await getCurrentFile();
      setPdfURL(`http://localhost:5000/${fileDetails?.url}`);
    };
    getFileDetails();
  }, []);

  const handleNext = () => {
    if (page + 1 > numPages) {
      return;
    }
    setPage((page) => page + 1);
  };
  const handlePrevious = () => {
    if (page - 1 < 1) {
      return;
    }
    setPage((page) => page - 1);
  };

  return (
    <div>
      {pdfURL ? (
        <>
          <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={page} renderTextLayer={false} />
          </Document>
          <p>
            Page {page} of {numPages}
          </p>
          <Button onClick={handleNext}>next</Button>
          <Button onCanPlay={handlePrevious}>previous</Button>
        </>
      ) : (
        <>No data</>
      )}
    </div>
  );
};

export default Editor;
