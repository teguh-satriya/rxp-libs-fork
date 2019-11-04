import config from "../../../backend";
import getSession from "../session/getSession";

export default async (query: string) => {
  const opt = {
    ...{ useSession: true, debug: false, where: {}, args: "limit:1" }
  };

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
      query
    }),
    headers
  });
  const json = await response.json();
  return json.data;
};
