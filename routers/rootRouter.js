const loginRouter = require("./login.router");
const productRouter = require("./product.router");
const refreshTokenRouter = require("./refreshToken.router");
const regiRouter = require("./register.router");
const userRouter = require("./user.router");

const rootRouter = (app) => {
  app.use("/products", productRouter);
  app.use("/users", userRouter);
  app.use("/register", regiRouter);
  app.use("/login", loginRouter);
  app.use("/refresh_token", refreshTokenRouter);
  app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
  });
};

module.exports = rootRouter;
