const regiRouter = require("express").Router();

const { registerUser } = require("../controller/register.controller");

regiRouter.post("/", registerUser);

module.exports = regiRouter;
