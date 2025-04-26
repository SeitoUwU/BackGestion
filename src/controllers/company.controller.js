import { CompanyModel } from "../models/company.model.js";

export const loginCompany = async (req, res, next) => {
    try {
        const { nameCompany, nitCompany } = req.body;
        const data = await CompanyModel.logCompany(nameCompany, nitCompany);
        res.json(data);
    } catch (err) {
        next(err);
    }
};