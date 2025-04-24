import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const OFFER_CLASS = `${NS}:Usuario`;

function iriFromId(id) {
    return `${process.env.BASE_IRI}User${id}`;
}

export const UserModel = {
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
    }
}