import { QueryEngine } from "@comunica/query-sparql";
import { QUERY_URL, UPDATE_URL } from "../config/fuseki.js";

const engine = new QueryEngine(); // instancia única (cache interna)

export async function select(query) {
  const bindingsStream = await engine.queryBindings(query, {
    sources: [QUERY_URL],
  });
  const results = [];
  for await (const row of bindingsStream) {
    const obj = {};
    row.forEach((value, key) => (obj[key.value.slice(1)] = value.value));
    results.push(obj);
  }
  return results;
}

export async function update(updateString) {
  await engine.queryVoid(updateString, {
    sources: [QUERY_URL],
    destination: UPDATE_URL,
  });
}
