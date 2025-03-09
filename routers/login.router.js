const loginRouter = require("express").Router();
const { loginUser } = require("../controller/login.controller");

loginRouter.post("/", loginUser);

module.exports = loginRouter;
