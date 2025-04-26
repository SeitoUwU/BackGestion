import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/login", loginUser);
router.post("/register", registerUser);

export default router;