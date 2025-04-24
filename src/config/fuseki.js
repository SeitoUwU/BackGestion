import "dotenv/config";

export const HOST = process.env.HOST;
export const DATASET = process.env.DATASET;
export const QUERY_URL = `${HOST}/${DATASET}/sparql`;
export const UPDATE_URL = `${HOST}/${DATASET}/update`;
export const GSP_URL = `${HOST}/${DATASET}/data`;
