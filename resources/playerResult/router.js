const express = require("express");
const controller = require("./controller");

const router = express.Router();
const handler = express.Router();

handler.get("/:gameId", controller.getPlayerResult);
handler.get("/team/:teamId", controller.getPlayerResultsTeam);
handler.post("/", controller.addPlayerResult);
handler.delete("/:playerResultId/:gameId", controller.deletePlayerResult);

router.use("/playerResult", handler);

module.exports = router;
