import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import cookieParser from 'cookie-parser';

import { errorHandler } from "./src/middlewares/errorHandler.js";
import db from './src/models/index.js'
import offerRoutes from "./src/routes/offer.routes.js";
import userRouters from "./src/routes/user.routes.js"
import skillRoutes from "./src/routes/skill.routes.js"
import companyRoutes from "./src/routes/company.routes.js"
import modeRoutes from "./src/routes/mode.routes.js"
import cvRoutes from "./src/routes/cv.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/offers", offerRoutes);
app.use("/api/users", userRouters)
app.use("/api/skills", skillRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/mode", modeRoutes)
app.use("/api/cv", cvRoutes)

app.use((_req, res) => res.status(404).json({ message: "No encontrado" }));
app.use(errorHandler);

try {
  await db.sequelize.sync({ force: false });
  console.log('Modelos sincronizados')
} catch (error) {
  console.error('Error de conexion a ala base de datos: ', error);
  process.exit(1);
}

app.listen(PORT, () =>
  console.log(`API levantada en http://localhost:${PORT}`)
);
