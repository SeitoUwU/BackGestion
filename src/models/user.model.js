import { DataTypes } from "sequelize";
import { PREFIXES, NS } from "../utils/prefixes.js";
import { update } from "../services/sparql.service.js";

function iriFromId(id) {
  return `${process.env.BASE_IRI}User${id}`;
}

export const UserModel = (sequelize) => {
  const model = sequelize.define('User', {
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

  model.registerUser = async (userData) => {
    // Crear en MySQL
    const createdUser = await model.create(userData);

    // Insertar en ontología
    const subj = `<${iriFromId(createdUser.id)}>`;
    const q = `
      ${PREFIXES}
      INSERT DATA {
        ${subj} a ${NS}:Usuario ;
          ${NS}:idUsuario ${createdUser.id} ;
          ${NS}:correoUsuario "${createdUser.email}" ;
          ${NS}:contraseniaUsuario "${createdUser.password}" ;
          ${NS}:rolUsuario "${createdUser.fkrol}" .
      }
    `;
    await update(q);

    return createdUser;
  };
};