const refreshTokenRouter = require("express").Router();
const { refreshToken } = require("../controller/refreshToken.controller");

refreshTokenRouter.post("/", refreshToken);

module.exports = refreshTokenRouter;
