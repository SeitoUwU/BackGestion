import { PREFIXES, NS } from "../utils/prefixes.js";
import { select, update } from "../services/sparql.service.js";

const OFFER_CLASS = `${NS}:Oferta`;

function iriFromId(id) {
  return `${process.env.BASE_IRI}Ofer${id}`;
}

export const OfferModel = {
  async findAll(limit = 20, offset = 0) {
    const q = `
      ${PREFIXES}
      SELECT ?id ?titulo ?descripcion ?experiencia ?modalidad ?aptitud
      WHERE {
        ?o a ${OFFER_CLASS} ;
           ${NS}:idOferta ?id ;
           ${NS}:tituloOferta ?titulo ;
           ${NS}:descripcionOferta ?descripcion ;
           ${NS}:experienciaMinimaOferta ?experiencia ;
           ${NS}:TieneUn ?modalidad ;
           ${NS}:ExigeUna ?aptitud .
      }
      ORDER BY ASC(?id)
      LIMIT ${limit} OFFSET ${offset}
    `;
    return await select(q);
  },

  async findById(id) {
    const q = `
      ${PREFIXES}
      SELECT ?id ?titulo ?descripcion ?experiencia ?modalidad ?aptitud
      WHERE {
        ?o a ${OFFER_CLASS} ;
           ${NS}:idOferta ${id} ;
           ${NS}:tituloOferta ?titulo ;
           ${NS}:descripcionOferta ?descripcion ;
           ${NS}:experienciaMinimaOferta ?experiencia ;
           ${NS}:TieneUn ?modalidad ;
           ${NS}:ExigeUna ?aptitud .
      } LIMIT 1
    `;
    const [first] = await select(q);
    return first;
  },

  async create({
    id,
    titulo,
    descripcion,
    experiencia,
    modalidadIRI,
    aptitudIRI,
  }) {
    const subj = `<${iriFromId(id)}>`;
    const up = `
      ${PREFIXES}
      INSERT DATA {
        ${subj} a ${OFFER_CLASS} ;
                 ${NS}:idOferta ${id} ;
                 ${NS}:tituloOferta "${titulo}" ;
                 ${NS}:descripcionOferta "${descripcion}" ;
                 ${NS}:experienciaMinimaOferta ${experiencia} ;
                 ${NS}:TieneUn <${modalidadIRI}> ;
                 ${NS}:ExigeUna <${aptitudIRI}> .
      }
    `;
    await update(up);
    return { id, titulo, descripcion, experiencia, modalidadIRI, aptitudIRI };
  },
};
