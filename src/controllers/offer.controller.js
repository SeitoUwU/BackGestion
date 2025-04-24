import { OfferModel } from "../models/offer.model.js";

export const getOffers = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const data = await OfferModel.findAll(Number(limit), Number(offset));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getOffer = async (req, res, next) => {
  try {
    const data = await OfferModel.findById(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "No encontrada" });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createOffer = async (req, res, next) => {
  try {
    const created = await OfferModel.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
