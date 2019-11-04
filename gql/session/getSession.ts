import { Storage } from "reactxp";
import backend from "@app/backend";

export default async (): Promise<{
  uid: any;
  cid: any;
  sid: any;
  role: string;
} | null> => {
  let res = await Storage.getItem("session[" + backend.appurl + "]");
  if (res) {
    return JSON.parse(res);
  }
  return null;
};
