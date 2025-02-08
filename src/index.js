const { ServerConfig, Logger } = require("../src/config/index");
const apiRoutes = require("./routes");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Sucecessfully started the server ${ServerConfig.PORT}`);
  Logger.info("sucessfuly started the server", "root", {});

  // const { City, Airport } = require("./models");

  // const resp = await City.findByPk(3);

  // const rem = await resp.createAirport({
  //   name: "Hubilli airport",
  //   code: "HBL",
  // });
  // console.log(rem);
  // const airp = await resp.getAirports();
  // console.log(airp);
  // const del = await City.destroy({
  //   where: {
  //     id: 2,
  //   },
  // });
  // console.log(del);
});
