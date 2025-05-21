import db from "../models/index.js";
import jwt from "jsonwebtoken";

export const loginCompany = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const logCompany = await db.Company.findOne({
            where: {
                email: email,
                password: password,
            },
        });
        if (!logCompany) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        const token = jwt.sign(
            { id: logCompany.id, rol: logCompany.fkrol, email: logCompany.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export const registerCompany = async (req, res, next) => {
    try {
        const { email, password, nit, name } = req.body;
        const newCompany = await db.Company.registerCompany(
            email,
            password,
            nit,
            name
        );
        res.status(201).json(newCompany);
    } catch (error) {
        next(error);
    }
};