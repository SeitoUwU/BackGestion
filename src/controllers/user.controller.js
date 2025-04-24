import { UserModel } from "../models/user.model.js";

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const logUser = await UserModel.loginUser(email, password)
        if(!logUser){
            return res.status(401).json({
                messae: "Credenciasles invalidas"
            })
        }
        res.status(201).json(logUser);
    } catch (error) {
        next(error)
    }
};