import { Router } from "express";
import { addCvToUser, updateCv, getCvUser } from "../controllers/cv.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/addCvToUser", addCvToUser);
router.post("/updateCv", updateCv);
router.get("/getCv", getCvUser);

export default router;