import express from "express";
import {
  createProduct,
  removeProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { productSchema } from "../validSchema/productSchema.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routerProduct = express.Router();

routerProduct.get("/products", getAllProducts);
routerProduct.get("/products/:id", getProductById);

routerProduct.use("/products", checkAuth, checkIsAdmin); //middleware nay se chay truoc cac middleware ben duoi no
routerProduct.post("/products", validBodyRequest(productSchema), createProduct);
routerProduct.patch(
  "/products/:id",
  validBodyRequest(productSchema),
  updateProduct
);
routerProduct.delete("/products/:id", removeProduct);

export default routerProduct;
