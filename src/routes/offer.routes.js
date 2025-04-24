import { Router } from "express";
import {
  getOffers,
  getOffer,
  createOffer,
} from "../controllers/offer.controller.js";

const router = Router();

router.get("/", getOffers);
router.get("/:id", getOffer);
router.post("/", createOffer);

export default router;
