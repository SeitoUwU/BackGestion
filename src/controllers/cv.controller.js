import { CvModel } from "../models/cv.model.js";
import { extractTokenInfo } from "../utils/jwt.js"; 

export const addCvToUser = async (req, res, next) => { 
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const responseCreateCv = await CvModel.createCv(req.user.id, fileName);
        const responseAssociateCv = await CvModel.associateCvWithUser(req.user.id);
        const response = {
            cv: responseCreateCv,
            associate: responseAssociateCv,
        }
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

export const updateCv = async (req, res, next) => { 
    try {
        const userData = extractTokenInfo(req);
        const idCv = userData.id;
        const { fileName } = req.body;
        if (!idCv ||!fileName) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const response = await CvModel.updateCv(idCv, fileName);
        res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
}

export const getCvUser = async (req, res, next) => {
    try {
        const cv = await CvModel.getCvWithUserId(req.user.id);
        if (!cv) {
            return res.status(404).json({ message: "No se encontró el cv" });
        }
        res.status(200).json(cv);
    } catch (error) {
        next(error);
    }
}