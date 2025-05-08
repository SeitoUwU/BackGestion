import db from "../models/index.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const logUser = await db.User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!logUser) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    const token = jwt.sign(
      { id: logUser.id, rol: logUser.fkrol, email: logUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, phone, idCard } = req.body;
    const newUser = await db.User.registerUser(
      email,
      password,
      name,
      phone,
      idCard
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
