import { ModeModel } from "../models/mode.model";

export const ModeController = {
  async getAll(req, res) {
    const modes = await ModeModel.findAll();
    res.json(modes);
  },
}