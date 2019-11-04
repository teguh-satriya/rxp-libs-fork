import config from "../../../backend";
import getSession from "../session/getSession";
import _ from "lodash";

interface opts {
  useSession?: boolean;
  debug?: boolean;
  where?: any;
  args?: string;
}

export default async (
  table: string,
  columns: string[] | string,
  options?: opts
) => {
  const opt = {
    ...{ useSession: true, debug: false, where: {}, args: "limit:1" },
    ...options
  };

  const where = Object.keys(opt.where).map((w: string) => {
    return `${w}: {_eq: ${JSON.stringify(opt.where[w])}}`;
  });
  if (where.length > 0) {
    where[0] = ",where:{" + where[0];
    where[where.length - 1] = where[where.length - 1] + "}";
  }

  let tableArgs = `${opt.args || ""} ${where.join(",")}`.trim();
  if (tableArgs.length > 0) {
    tableArgs = `(${tableArgs})`;
  }

  const gql = `
    {
        ${table}${tableArgs} 
        ${
          typeof columns === "string" ? columns : "{" + columns.join("\n") + "}"
        }
        
    }`;

  if (opt.debug) {
    console.log(gql);
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
      query: gql
    }),
    headers
  });
  const json = await response.json();
  if (response.status !== 200) {
    if (json && json.errors && json.errors[0] && json.errors[0].message) {
      throw `
  (Query Record Failed) ${json.errors[0].message} 
  
  GraphQL Query: ${gql}
  
  `;
    }
    return null;
  }

  if (typeof columns !== "string") {
    return _.get(json, `data.${table}.0`);
  } else {
    return _.get(json, `data.${table}`);
  }
};
