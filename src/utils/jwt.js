import jwt from "jsonwebtoken";

export const generateTokenUser = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

export const extractTokenInfo = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token no proporcionado o formato inválido");
  }

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);
  return userData;
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};