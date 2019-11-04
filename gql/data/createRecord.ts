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
  const gql = `mutation create($data:${table}_insert_input!) {
    insert_${table}(
      objects: [$data]
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

  const postData: any = {};
  for (let i in data) {
    if (i.endsWith("_aggregate")) {
      continue;
    }
    postData[i] = data[i];
  }

  const response: Response = await fetch(config.url, {
    method: "POST",
    body: JSON.stringify({
      operationName: "create",
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
(Create Record Failed) ${json.errors[0].message} 

GraphQL Mutation:
${gql}

Data: 
${JSON.stringify(data, null, 2).replace(/"/gi, "'")}
        `.trim()
    );
    throw json.errors;
  }
  return json.data[`insert_${table}`].returning[0][opt.primaryKey];
};
