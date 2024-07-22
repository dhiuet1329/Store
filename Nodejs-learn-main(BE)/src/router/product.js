import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { productSchema } from "../validSchema/productSchema.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const router = express.Router();

router.get("/products", getAllProduct);
router.get("/products/:id", getOneProduct);

router.use("/products", checkAuth, checkIsAdmin); //middleware nay se chay truoc cac middleware ben duoi no
router.post("/products", validBodyRequest(productSchema), createProduct);
router.patch("/products/:id", validBodyRequest(productSchema), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
