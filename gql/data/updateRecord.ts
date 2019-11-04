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

  const postData: any = {};
  for (let i in data) {
    if (i === opt.primaryKey || i.endsWith("_aggregate")) {
      continue;
    }
    postData[i] = data[i];
  }

  const gql = `mutation update($data:${table}_set_input!) {
    update_${table}(
      where: {${opt.primaryKey}: {_eq: "${data[opt.primaryKey]}"}},
      _set: $data
    ) {
      returning {
        ${opt.primaryKey}
      }
    }
  }`;

  if (opt && opt.debug) {
    console.log(gql, data);
  }

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
      operationName: "update",
      query: gql,
      variables: {
        data: postData
      }
    }),
    headers
  });

  const json = await response.json();
  if (json && json.errors && json.errors[0] && json.errors[0].message) {
    console.error(
      `
(Update Record Failed) ${json.errors[0].message} 

GraphQL Mutation:
${gql}

Data: 
${JSON.stringify(data, null, 2).replace(/"/gi, "'")}
        `.trim()
    );
    throw json.errors;
  }
  return json;
};
