import express from "express";
import {
  createCategory,
  getAll,
  getCategoryById,
  removeCategoryById,
  updateCategoryById,
} from "../controllers/categories.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routerCategory = express.Router();

routerCategory.get("/category", getAll);
routerCategory.get("/category/:id", getCategoryById);

routerCategory.post("/category", createCategory);
routerCategory.patch("/category/:id", updateCategoryById);

routerCategory.delete("/category/:id", removeCategoryById);

export default routerCategory;
