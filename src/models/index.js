import sequelize from "../config/database.js";
import { UserModel } from "./user.model.js";

const db = {
    Sequelize: sequelize,
    sequelize,
    User: UserModel(sequelize)
}

export default db;