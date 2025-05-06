import { DataTypes } from "sequelize";

export const UserModel = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    fkrol: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });
};