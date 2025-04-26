import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const APT_CLASS = `${NS}:Aptitudes`;   // nueva constante

function iriFromId(id) {
    return `${process.env.BASE_IRI}Aptitudes${id}`;
}

export const skillModel = {
    async findAll(limit = 200, offset = 0) {
        const q = `
          ${PREFIXES}
          SELECT ?id ?nombre
          WHERE {
            ?a a ${APT_CLASS} ;
               ${NS}:idAptitudes      ?id ;
               ${NS}:aptitudAptitudes ?nombre .
          }
          ORDER BY ASC(?id)
          LIMIT ${limit} OFFSET ${offset}
        `;
        return await select(q);
      },      
}