const express = require("express");

const router = express.Router();

router.get("/info", (req, res) => {
  return res.send("yaass");
});

module.exports = router;
