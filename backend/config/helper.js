const jwt = require("jsonwebtoken");
const genarateToken = (id) => {
  const result = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
  return result;
};

module.exports = { genarateToken };
