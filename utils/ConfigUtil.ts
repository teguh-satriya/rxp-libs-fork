import get from "lodash/get";
import { UIStyle } from "@app/uistyle";
import { Platform } from "reactxp";

export const uistyle = function (path: string, defaultValue?: any) {
  let value = get(UIStyle, path);
  if (defaultValue) {
    return { ...value, ...defaultValue };
  }
  if (typeof value !== "string" || typeof value !== "number") {
    const os = Platform.getType();
    const defaultValue = { ...value };
    !!defaultValue.native && delete defaultValue.native;
    !!defaultValue.web && delete defaultValue.web;

    if (value) {
      let result = { ...value };
      if (value["native"] && os !== "web") {
        result = { ...defaultValue, ...value["native"] };
      }

      if (value[os]) {
        result = { ...defaultValue, ...value[os] };
      }

      let cleanVal: any = {};
      for (var i in result) {
        if (typeof result[i] !== "object") {
          cleanVal[i] = result[i];
        }
      }
      return cleanVal;
    }
  }
  return value;
};
