const express = require("express");
const controller = require("./controller");
const { verifyToken } = require("../../utils/verifyToken");

const router = express.Router();
const handler = express.Router();

handler.post("/", verifyToken, controller.createTeam);

router.use("/teams", handler);

module.exports = router;
