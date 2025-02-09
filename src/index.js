const { ServerConfig, Logger } = require("../src/config/index");
const apiRoutes = require("./routes");
const express = require("express");

const multer = require("multer");
const app = express();

const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Sucecessfully started the server ${ServerConfig.PORT}`);
  Logger.info("sucessfuly started the server", "root", {});
});
