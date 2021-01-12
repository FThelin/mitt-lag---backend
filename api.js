const express = require("express");
const authRouter = require("./resources/auth/router");
const userRouter = require("./resources/user/router");
const TeamRouter = require("./resources/team/router");
const GameRouter = require("./resources/game/router");
const RequestRouter = require("./resources/request/router");

const router = express.Router();
const handler = express.Router();

handler.use(authRouter);
handler.use(userRouter);
handler.use(TeamRouter);
handler.use(GameRouter);
handler.use(RequestRouter);

router.use("/api", handler);

module.exports = router;
