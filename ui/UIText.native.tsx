import React from "react";
import RX from "reactxp";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";


interface UITextProps extends UIProps {
  size?: "small" | "medium" | "large" | "superlarge";
}

export default ({ children, size = "medium", style }: UITextProps) => {
  const defaultStyle = uistyle("text.style");
  const textStyle = uistyle(`text.${size}`, style);

  return (
    <RX.Text style={{ ...defaultStyle, ...textStyle }}>{children}</RX.Text>
  );
};
