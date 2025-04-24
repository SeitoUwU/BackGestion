import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import offerRoutes from "./src/routes/offer.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/offers", offerRoutes);

app.use((_req, res) => res.status(404).json({ message: "No encontrado" }));
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`API levantada en http://localhost:${PORT}`)
);
