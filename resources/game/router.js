const express = require("express");
const controller = require("./controller");

const router = express.Router();
const handler = express.Router();

handler.post("/", controller.createGame);
handler.get("/:teamId/:season", controller.getSeasonGames);
handler.get("/:teamId", controller.getGames);

router.use("/game", handler);

module.exports = router;
