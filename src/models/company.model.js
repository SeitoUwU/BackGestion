import { DataTypes } from "sequelize";
import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const OFFER_CLASS = `${NS}:Empresa`;

function iriFromId(id) {
  return `${process.env.BASE_IRI}Company${id}`;
}

export const CompanyModel = (sequelize) => {
  const model = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      fkrol: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  model.registerCompany = async (email, password, nit, name) => {

    const createdCompany = await model.create({ email, password });
    
    const subj = `<${iriFromId(createdCompany.id)}>`;
    const q = `
      ${PREFIXES}
      INSERT DATA {
        ${subj} a ${OFFER_CLASS} ;
          ${NS}:idEmpresa ${createdCompany.id} ;
          ${NS}:nombreEmpresa "${name}" ;
          ${NS}:nitEmpresa ${nit} .
      }
    `;
    await update(q);
    
    return createdCompany;
  };
  return model;
}
