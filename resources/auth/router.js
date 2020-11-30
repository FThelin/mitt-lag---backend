const express = require("express")
const controller = require("./controller")

const router = express.Router()
const handler = express.Router()

handler
  .post("/login", controller.login)

router.use("/auth", handler)

module.exports = router