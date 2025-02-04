const dotenv = require("dotenv");
const path = require("path");

// Load .env file explicitly from the root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("Loaded PORT:", process.env.PORT); // Debugging step

module.exports = {
  PORT: process.env.PORT,
};
