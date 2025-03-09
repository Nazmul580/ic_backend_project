const productRouter = require("express").Router();
const authorization = require("../middleware/authorization");
const {
  deleteProduct,
  updateProduct,
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/product.controller");

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.post("/", authorization("admin"), createProduct);

productRouter.put("/:id", authorization("admin"), updateProduct);

productRouter.delete("/:id", authorization("admin"), deleteProduct);

module.exports = productRouter;
