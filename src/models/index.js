import sequelize from "../config/database.js";
import { UserModel } from "../models/user.model.js";
import { CompanyModel } from "../models/company.model.js";

const User = UserModel(sequelize);
const Company = CompanyModel(sequelize);

const db = {
    Sequelize: sequelize,
    sequelize,
    User,
    Company
}

export default db;