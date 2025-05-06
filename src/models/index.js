import sequelize from "../config/database.js";
import { UserModel } from "./user.model.js";

const User = UserModel(sequelize);

const db = {
    Sequelize: sequelize,
    sequelize,
    User
}

export default db;