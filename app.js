import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import offerRoutes from "./src/routes/offer.routes.js";
import userRouters from "./src/routes/user.routes.js"
import skillRoutes from "./src/routes/skill.routes.js"
import companyRoutes from "./src/routes/company.routes.js"
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/offers", offerRoutes);
app.use("/api/users", userRouters)
app.use("/api/skills", skillRoutes)
app.use("/api/company", companyRoutes)

app.use((_req, res) => res.status(404).json({ message: "No encontrado" }));
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`API levantada en http://localhost:${PORT}`)
);
