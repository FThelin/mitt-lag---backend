const express = require("express");
const controller = require("./controller");
const { verifyToken } = require("../../utils/verifyToken");

const router = express.Router();
const handler = express.Router();

handler.post("/:teamId", verifyToken, controller.createRequest);

router.use("/requests", handler);

module.exports = router;
