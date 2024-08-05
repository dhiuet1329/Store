import express from "express";
import {
  addToCart,
  checkout,
  getCart,
  removeFormCart,
} from "../controllers/cart.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routerCart = express.Router();
routerCart.post("/cart", checkAuth, addToCart);
routerCart.get("/cart", checkAuth, getCart);
routerCart.post("/cart/checkout", checkAuth, checkout);
routerCart.delete("/cart/remov-cart/:productId", checkAuth, removeFormCart);

export default routerCart;
