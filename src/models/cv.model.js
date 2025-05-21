import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const CV_CLASS = `${NS}:HojaDeVida`; // Cambiado el nombre de la constante para que sea más claro

function iriFromId(id, type) {
    if (type === 'user') {
        // Usuario podría ser UsuA105 en lugar de Usu105
        return `${process.env.BASE_IRI}UsuA${id}`;
    } else if (type === 'cv') {
        // CV podría ser HojA40 en lugar de HojZ40
        return `${process.env.BASE_IRI}HojB${id}`;
    }
}

export const CvModel = {
    async createCv(idCv, cvFileName) {
        const cvIRI = `<${iriFromId(idCv, 'cv')}>`;
        console.log("CV IRI:", cvIRI);
        const q = `
            ${PREFIXES}
            INSERT DATA {
              ${cvIRI} a ${CV_CLASS}, owl:NamedIndividual ;
                ${NS}:idHojaDeVida "${idCv}"^^xsd:int ;
                ${NS}:archivoHojaDeVida "${cvFileName}" .
            }
        `;
        
        console.log("Consulta SPARQL completa:", q);
        try {
            await update(q);
            console.log("Actualización exitosa");
            return { idCv, cvFileName };
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    },

    async associateCvWithUser(idUser) {
        const userIRI = `<${iriFromId(idUser, 'user')}>`;
        const cvIRI = `<${iriFromId(idUser, 'cv')}>`;
        console.log("User IRI:", userIRI);
        console.log("CV IRI:", cvIRI);
        
        const q = `
            ${PREFIXES}
            INSERT DATA {
              ${userIRI} ${NS}:PoseeUn ${cvIRI} .
            }
        `;

        await update(q);
        return { idUser };
    },

    async updateCv(idCv, cvFileName) {
        const cvIRI = `<${iriFromId(idCv, 'cv')}>`;

        const updateQuery = `
            ${PREFIXES}
            # Eliminar el nombre de archivo anterior
            DELETE {
                ${cvIRI} ${NS}:archivoHojaDeVida ?oldFileName .
            }
            WHERE {
                ${cvIRI} ${NS}:archivoHojaDeVida ?oldFileName .
            };
            
            # Insertar el nuevo nombre de archivo
            INSERT DATA {
                ${cvIRI} ${NS}:archivoHojaDeVida "${cvFileName}"^^xsd:string .
            }
        `;

        await update(updateQuery);
        return { idCv, cvFileName };
    },

    async getCvWithUserId(userId) {
        const q = `
            ${PREFIXES}
            SELECT ?cv ?id ?archivo ?usuario
            WHERE {
                ?cv a ${CV_CLASS} ;
                    ${NS}:idHojaDeVida "${userId}" ;
                    ${NS}:archivoHojaDeVida ?archivo .
                OPTIONAL {
                    ?usuario ${NS}:PoseeUn ?cv .
                }
            } LIMIT 1
        `;
        const [first] = await select(q);
        return first;
    }
}