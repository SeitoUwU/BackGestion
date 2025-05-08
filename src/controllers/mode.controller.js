import { ModeModel } from "../models/mode.model.js";

export const getAll = async (req, res) => {
  try {
    const modes = await ModeModel.findAll();
    res.json(modes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los modos" });
  }
};