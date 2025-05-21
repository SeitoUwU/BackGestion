import { Router } from "express";
import { loginCompany, registerCompany } from "../controllers/company.controller.js";

const router = Router();

router.post("/login", loginCompany);
router.post("/register", registerCompany);

export default router;