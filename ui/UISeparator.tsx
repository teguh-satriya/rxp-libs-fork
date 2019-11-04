import { View } from "reactxp";
import React from "react";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";

export default ({ style }: UIProps) => {
  let sepStyle = uistyle("separator");
  return <View style={{ ...sepStyle, ...style }} />;
};
