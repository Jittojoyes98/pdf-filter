const fs = require("fs");

const savePdf = (newPdfBytes, filePdfName) => {
  const filePath = `backend/public/uploads/${
    Date.now() + "-" + filePdfName.split("-")[1]
  }`;

  // const uploadData = handleUploadToMulter(newPdfBytes);
  const pdfBuffer = Buffer.from(newPdfBytes);

  // use fs instead
  fs.writeFile(filePath, pdfBuffer, (err) => err && console.error(err));
  //     const fileUplaod = await User.findOneAndUpdate(
  //     { _id: req.user._id },
  //     {
  //       $push: { pdf: { url: requireFilePath.join("/") } },
  //       function(error, success) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log(success);
  //         }
  //       },
  //     }
  //   );
};

module.exports = { savePdf };
