const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const axios = require("axios");
const { PDFDocument } = require("pdf-lib");

/**
 * @description retrive the recently uploaded file
 * @route GET api/user/recentfile
 */
const fetchCurrentFile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ messsage: "User not found" });
    }

    const latestDocument = user.pdf[user.pdf.length - 1];
    res.json(latestDocument);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @description create the file from file link and page numbers
 * @route GET api/user/create/file
 */
const createFile = asyncHandler(async (req, res) => {
  const { pdfUrl, pageNumbers } = req.body;

  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    // CREATE THE FILE
    const pdfBytes = Buffer.from(response.data);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Extract specified pages
    const newPdfDoc = await PDFDocument.create();

    // const extractedPages = [];
    for (const pageNumber of pageNumbers) {
      const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
      newPdfDoc.addPage(page);
    }

    const newPdfBytes = await newPdfDoc.save();

    console.log(newPdfBytes, "NEW DATA");

    res.contentType("application/pdf");
    handleUint8ArrayUpload(newPdfBytes);
    res.send(newPdfBytes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @description to upload a file to db using its path , where multer is used as the middleware.
 * @route POST  api/user/upload
 */

const uploadPdf = asyncHandler(async (req, res) => {
  const { mimetype } = req.file;
  const array_of_allowed_file_types = ["application/pdf"];

  if (!array_of_allowed_file_types.includes(mimetype)) {
    res.status(400);
    throw Error("Invalid file, please upload pdf format");
  }
  let requireFilePath = req.file.path.split("/");
  requireFilePath = requireFilePath.slice(1);

  const fileUplaod = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { pdf: { url: requireFilePath.join("/") } },
      function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      },
    }
  );
  if (fileUplaod) {
    return res.send({ message: "File uploaded succesfully" });
  }
  res.status(500);
  throw Error("File uploaded failed");
});

const handleUint8ArrayUpload = (pdfArray) => {
  const pdfBuffer = Buffer.from(pdfArray);
  console.log(pdfBuffer, "HEEYEE");
  // Process the pdfBuffer as needed
  // https://stackoverflow.com/questions/60664751/how-to-create-a-multer-file-from-an-image-url
  // ...
  console.log("Uint8Array processed successfully");
};

module.exports = { fetchCurrentFile, createFile, uploadPdf };
