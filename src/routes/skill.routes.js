import { Router } from "express";
import { getSkills } from "../controllers/skill.controller.js";

const router = Router();

router.get("/getSkills", getSkills);

export default router;