const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const authorization = require("../middleware/authorization");

const userRouter = require("express").Router();

userRouter.get("/", authorization("admin"), getUsers);

userRouter.put("/:id", authorization("admin"), updateUser);

userRouter.delete("/:id", authorization("admin"), deleteUser);

module.exports = userRouter;
