import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { authSchema } from "../validSchema/authSchema.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { showProfile } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routerAuth = Router();

routerAuth.post("/register", validBodyRequest(authSchema), register);
routerAuth.post("/login", validBodyRequest(authSchema), login);
routerAuth.use("/", checkAuth);
routerAuth.get("/me", showProfile);
// routerAuth.patch("/me", updateProfile);
export default routerAuth;
