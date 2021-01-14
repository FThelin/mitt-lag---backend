const express = require("express");
const controller = require("./controller");

const router = express.Router();
const handler = express.Router();

handler.post("/", controller.addPlayerResult);

router.use("/playerResult", handler);

module.exports = router;
