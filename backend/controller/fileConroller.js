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
  console.log(pdfUrl, pageNumbers);
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    // CREATE THE FILE
    const pdfBytes = Buffer.from(response.data);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Extract specified pages
    const extractedPages = [];
    for (const pageNumber of pageNumbers) {
      const page = await pdfDoc.getPage(pageNumber - 1);
      extractedPages.push(page);
    }

    // Create a new PDFDocument and add extracted pages in the specified order
    const newPdfDoc = await PDFDocument.create();
    for (const page of extractedPages) {
      const copiedPage = await newPdfDoc.addPage([
        page.getWidth(),
        page.getHeight(),
      ]);
      copiedPage.drawPage(page);
    }

    // Save the new PDF as bytes
    const newPdfBytes = await newPdfDoc.save();

    res.contentType("application/pdf");
    res.send(newPdfBytes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { fetchCurrentFile, createFile };
