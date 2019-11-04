import { Storage } from "reactxp";
import { default as backend, default as config } from "../../../backend";
import getSession from "./getSession";

export default async () => {
  let session = await getSession();

  if (session !== null) {
    await fetch(config.appurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Session-Id": session.sid,
        "X-Hasura-Logout-Id": new Date().getTime().toString() + "-" + session.uid
      }
    });

    return await Storage.removeItem("session["+ backend.appurl +"]");
  }
};
