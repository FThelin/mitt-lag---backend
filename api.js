const express = require("express");
const authRouter = require("./resources/auth/router");
const userRouter = require("./resources/user/router");

const router = express.Router();
const handler = express.Router();

handler.use(authRouter);
handler.use(userRouter);

router.use("/api", handler);

module.exports = router;