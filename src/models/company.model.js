import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const OFFER_CLASS = `${NS}:Empresa`;

function iriFromId(id) {
    return `${process.env.BASE_IRI}Company${id}`;
  }

export const CompanyModel = {
    async logCompany (nameCompany, nitCompany) {
        const q = `
        ${PREFIXES}
        SELECT ?id
        WHERE {
            ?o a ${OFFER_CLASS} ;
                ${NS}:nombreEmpresa "${nameCompany}" ;
                ${NS}:nitEmpresa "${nitCompany}" ;
                ${NS}:idEmpresa?id.
        }
        `;
        const [first] = await select(q);
        return first;
    }
}