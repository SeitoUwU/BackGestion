import { skillModel } from "../models/skill.model.js";

export const getSkills = async (req, res, next) => {
    try {
        const { limit = 200, offset = 0 } = req.query;
        const data = await skillModel.findAll(Number(limit), Number(offset));
        res.json(data);
    } catch (err) {
        next(err);
    }
};