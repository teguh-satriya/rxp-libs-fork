import config from "../../../backend";

export const hashPassword = async (user_id: string) => {
  await fetch(config.url, {
    method: "POST",
    body: JSON.stringify({
      query: `{
          session(limit:1) {
            useid
          }
        }`
    }), 
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-ChangePass-Uid": user_id
    }
  });
};
