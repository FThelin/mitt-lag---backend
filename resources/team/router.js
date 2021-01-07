const express = require("express");
const controller = require("./controller");
const { verifyToken } = require("../../utils/verifyToken");

const router = express.Router();
const handler = express.Router();

handler.post("/", verifyToken, controller.createTeam);
handler.get("/:query", verifyToken, controller.findTeam);
handler.get("/findOne/:id", verifyToken, controller.getTeam);
handler.delete("/deletePlayer", verifyToken, controller.deletePlayerFromTeam);
handler.delete("/deleteLeader", verifyToken, controller.deleteLeaderFromTeam);
handler.put("/teamRole", verifyToken, controller.teamRole);
handler.post("/acceptRequest", verifyToken, controller.acceptRequest);
handler.put("/changeTeam", verifyToken, controller.changeTeam);

router.use("/teams", handler);

module.exports = router;
