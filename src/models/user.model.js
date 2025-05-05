import { DataTypes } from "sequelize";

export const UserModel = (sequelize) => {
  return sequelize.define('User', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cedulaUsuario: DataTypes.STRING,
    nombreUsuario: DataTypes.STRING,
    correoUsuario: {
      type: DataTypes.STRING,
      unique: true
    },
    contraseniaUsuario: DataTypes.STRING,
    numeroUsuario: DataTypes.STRING,
    rolUsuario: {
      type: DataTypes.STRING,
      defaultValue: 'usuario'
    }
  }, {
    timestamps: false,
    tableName: 'usuarios'
  });
};