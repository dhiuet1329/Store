import cors from "cors";
import express from "express";
import { connectDB } from "./src/config/db.js";
import routerProduct from "./src/router/product.js";
import routerAuth from "./src/router/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", routerProduct);
app.use("/api/user", routerAuth);
const errorNotFound = (req, res, next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
};
const errorCommon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Loi server",
  });
};
app.use(errorNotFound, errorCommon);
app.listen(8000, () => {
  console.log(`Server is running on port 8000 `);
});
