import React from "react";
import { MainStyle } from "@app/config";
import { UIProps } from "./Styles/Style";
import { ActivityIndicator, View } from "reactxp";

export interface UILoadingProps extends UIProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export default (p: UILoadingProps) => {
  const color = p.color || MainStyle.primaryColor;
  const size = p.size || "medium";
  return (
    <View style={p.style}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};
