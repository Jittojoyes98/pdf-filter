const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "pdf-filter",
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = connDB;
