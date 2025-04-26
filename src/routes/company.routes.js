import { Router } from "express";
import { loginCompany } from "../controllers/company.controller.js";

const router = Router();

router.post("/login", loginCompany);

export default router;