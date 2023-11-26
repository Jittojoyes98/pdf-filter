const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const axios = require("axios");
const { PDFDocument } = require("pdf-lib");

// @desc retrive the recently uploaded file
// @route GET api/user/recentfile
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
    console.log(newPdfDoc);

    const newPdfBytes = await newPdfDoc.save();

    res.contentType("application/pdf");
    handleUint8ArrayUpload(newPdfBytes);
    res.send(newPdfBytes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const handleUint8ArrayUpload = (pdfArray) => {
  const pdfBuffer = Buffer.from(pdfArray);
  // Process the pdfBuffer as needed
  // ...
  console.log("Uint8Array processed successfully");
};

module.exports = { fetchCurrentFile, createFile };
