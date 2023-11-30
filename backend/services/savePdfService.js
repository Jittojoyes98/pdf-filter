const fs = require("fs");
const User = require("../models/UserModel");

const savePdf = (newPdfBytes, filePdfName) => {
  const filePath = `backend/public/uploads/${
    Date.now() + "-" + filePdfName.split("-")[1]
  }`;

  // const uploadData = handleUploadToMulter(newPdfBytes);
  const pdfBuffer = Buffer.from(newPdfBytes);

  // use fs instead
  fs.writeFile(filePath, pdfBuffer, (err) => err && console.error(err));
  return filePath;
};

const addUrl = async (userId, requestedFilePath) => {
  let requireFilePath = requestedFilePath.split("/");
  requireFilePath = requireFilePath.slice(1);

  const fileUplaod = await User.findOneAndUpdate(
    { _id: userId },
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
  return fileUplaod;
};

module.exports = { savePdf, addUrl };
