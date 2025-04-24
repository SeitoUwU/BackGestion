import "dotenv/config";

export const BASE = process.env.BASE_IRI; // IRI base de la ontología
export const NS = "ex"; // alias corto
export const PREFIXES = `\n  PREFIX ${NS}: <${BASE}>\n`;
