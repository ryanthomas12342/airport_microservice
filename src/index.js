const { ServerConfig, Logger } = require("../src/config/index");
const apiRoutes = require("./routes");
const express = require("express");
const app = express();

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Sucecessfully started the server ${ServerConfig.PORT}`);
  Logger.info("sucess fuly started the server", "root", {});
});
