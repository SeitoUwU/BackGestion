import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const OFFER_CLASS = `${NS}:Usuario`;

function iriFromId(id) {
  return `${process.env.BASE_IRI}User${id}`;
}

export const UserModel = {

  UserModel: {
    id: "",
    cedula: "",
    nombre: "",
    correo: "",
    contrasenia: "",
    numero: "",
  },

  async loginUser(email, password) {
    const q = `
        ${PREFIXES}
        SELECT ?id ?cedula ?nombre ?correo ?contrasenia ?numero
        WHERE {
          ?u a ${OFFER_CLASS} ;
             ${NS}:idUsuario ?id ;
             ${NS}:cedulaUsuario ?cedula ;
             ${NS}:nombreUsuario ?nombre ;
             ${NS}:correoUsuario ?correo ;
             ${NS}:contraseniaUsuario ?contrasenia ;
             ${NS}:numeroUsuario ?numero .
          FILTER(?correo = "${email}" && ?contrasenia = "${password}")
        }
        LIMIT 1
      `;
    const results = await select(q);
    return results.length > 0 ? results[0] : null;
  },

  async registerUser(UserModel) {
    const USER_CLASS = `${NS}:Usuario`;        // 1️⃣ clase correcta
    const subject = `<${process.env.BASE_IRI}User${UserModel.id}>`; // 2️⃣ IRI absoluto
    const q = `
        ${PREFIXES}
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        INSERT DATA {
          ${subject} a ${USER_CLASS} ;
              ${NS}:idUsuario      ${UserModel.id};
              ${NS}:cedulaUsuario "${UserModel.cedula}" ;
              ${NS}:nombreUsuario "${UserModel.nombre}" ;
              ${NS}:correoUsuario "${UserModel.correo}" ;
              ${NS}:contraseniaUsuario "${UserModel.contrasenia}" ;
              ${NS}:numeroUsuario "${UserModel.numero}" .
        }
      `;
    await update(q);
    return UserModel;
  }
}