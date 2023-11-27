import React from "react";
import { createFile, getCurrentFile } from "../helpers/apiServices";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@chakra-ui/react";
import useToast from "../hooks/useToast";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import "react-pdf/dist/esm/Page/TextLayer.css";

const Editor = () => {
  const [pdfURL, setPdfURL] = React.useState();
  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(1);
  const [selectPages, setSelectedPages] = React.useState([]);
  const [highLighted, setHighlighted] = React.useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  React.useEffect(() => {
    const getFileDetails = async () => {
      const fileDetails = await getCurrentFile();
      if (fileDetails?.url) {
        setPdfURL(`http://localhost:5000/${fileDetails?.url}`);
      }
    };
    getFileDetails();
  }, []);

  React.useEffect(() => {
    if (selectPages.includes(page)) {
      setHighlighted(true);
      console.log("ADDED");
    } else {
      setHighlighted(false);
    }
  }, [page]);

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

  const handleSelect = () => {
    setHighlighted(!highLighted);
    if (selectPages.includes(page)) {
      let idx = selectPages.findIndex((val) => val == page);
      var removed = selectPages.splice(idx, 1);
      setSelectedPages(selectPages);
      return;
    }
    setSelectedPages((pages) => [...pages, page]);
  };

  const handleSelectedPdf = () => {
    if (!selectPages.length) {
      useToast("Please select atleast 1 page to proceed", "error");
      return;
    }
    const createFileSelected = async () => {
      const createdFileDetails = await createFile({
        pdfUrl: pdfURL,
        pageNumbers: selectPages,
      });
    };
    createFileSelected();
  };

  console.log(selectPages);

  return (
    <div>
      {pdfURL ? (
        <div>
          <p
            style={{ backgroundColor: `${highLighted ? "green" : "red"}` }}
            onClick={handleSelect}
          >
            Selected
          </p>
          <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={page} renderTextLayer={false} />
          </Document>
          <p>
            Page {page} of {numPages}
          </p>
          <Button onClick={handlePrevious}>previous</Button>

          <Button onClick={handleNext}>next</Button>
          <div>
            <Button onClick={handleSelectedPdf}>Create</Button>
          </div>
        </div>
      ) : (
        <>No data</>
      )}
    </div>
  );
};

export default Editor;
