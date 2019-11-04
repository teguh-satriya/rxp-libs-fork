import { get } from "lodash";
import { Storage } from "reactxp";
import { default as backend, default as config } from "../../../backend";
import query from "../data/query";

export default async (
  username: string = "",
  password: string = "",
  client_id: string = ""
) => {
  const response: Response = await fetch(
    config.appurl + "?" + new Date().getTime(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Username": username,
        "X-Hasura-Password": password,
        "X-Hasura-Cid": client_id
      }
    }
  );

  const res = await response.json();
  let result: any = {
    role: res["X-Hasura-Role"],
    uid: res["X-Hasura-User-Id"],
    sid: res["X-Hasura-Session-Id"],
    cid: res["X-Hasura-Cid"]
  };
  if (result.role === "anonymous") {
    return null;
  }
  await Storage.setItem(
    "session[" + backend.appurl + "]",
    JSON.stringify(result)
  );

  let user = await query(`user`, config.columns, {
    where: {
      id: result.uid
    }
  });
  result.user = get(user, `data.user[0]`) || user;
  await Storage.setItem(
    "session[" + backend.appurl + "]",
    JSON.stringify(result)
  );
  return result;
};
