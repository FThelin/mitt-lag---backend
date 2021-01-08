const express = require("express");
const controller = require("./controller");

const router = express.Router();
const handler = express.Router();

handler
  .post("/register", controller.register)
  .get("/userTeams/:userId", controller.getUserTeams);

router.use("/users", handler);

module.exports = router;
