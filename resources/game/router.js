const express = require("express");
const controller = require("./controller");

const router = express.Router();
const handler = express.Router();

handler.post("/", controller.createGame);
handler.put("/updateGame/", controller.updateGame);
handler.delete("/:teamId/:gameId", controller.deleteGame);
handler.get("/:teamId", controller.getGames);

router.use("/game", handler);

module.exports = router;
