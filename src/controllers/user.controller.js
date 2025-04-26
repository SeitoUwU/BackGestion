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

export const registerUser = async (req, res, next) => {
    try {
        const { UserData } = req.body
        const newUser = await UserModel.registerUser(UserData)
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
};