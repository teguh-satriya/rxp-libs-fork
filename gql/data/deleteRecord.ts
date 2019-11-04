import config from "../../../backend";
import getSession from "../session/getSession";

interface opts {
  useSession?: boolean;
  debug?: boolean;
  primaryKey?: string;
}

export default async (table: string, data: any, options?: opts) => {
  const opt = {
    ...{ useSession: true, debug: false, primaryKey: "id" },
    ...options
  };
  const gql = `mutation delete {
    delete_${table}(
      where: {${opt.primaryKey}: {_eq: "${data[opt.primaryKey]}"}}
    ) {
      affected_rows
    }
  }`;

  let headers: any = {
    "Content-Type": "application/json"
  };

  if (opt.useSession) {
    const session = await getSession();
    if (session) headers["X-Hasura-Session-Id"] = session.sid;
  }
  const response: Response = await fetch(config.url, {
    method: "POST",
    body: JSON.stringify({
      operationName: "delete",
      query: gql
    }),
    headers
  });
  const json = await response.json();
  if (response.status !== 200) {
    if (json && json.errors && json.errors[0] && json.errors[0].message) {
      throw `
(Create Record Failed) ${json.errors[0].message} 

GraphQL Mutation:
${gql}

Data: 
${JSON.stringify(data, null, 2).replace(/"/gi, "'")}
        `.trim();
    }
    return null;
  }
  return json;
};
