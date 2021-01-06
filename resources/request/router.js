const express = require("express");
const controller = require("./controller");
const { verifyToken } = require("../../utils/verifyToken");

const router = express.Router();
const handler = express.Router();

handler.post("/:teamId", verifyToken, controller.createRequest);
handler.delete("/", verifyToken, controller.deleteRequest);

router.use("/requests", handler);

module.exports = router;
