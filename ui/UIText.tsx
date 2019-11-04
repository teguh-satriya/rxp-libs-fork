import React from "react";
import RX from "reactxp";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";

require("./Fonts/Fonts.css");

interface UITextProps extends UIProps {
  size?: "small" | "medium" | "large" | "extralarge";
}

export default ({ children, size = "medium", style }: UITextProps) => {
  const defaultStyle = uistyle("text.style");
  const textStyle = uistyle(`text.${size}`);

  return (
    <RX.Text
      style={
        Array.isArray(style)
          ? [defaultStyle, textStyle, ...style]
          : [defaultStyle, textStyle, style]
      }
    >
      {children}
    </RX.Text>
  );
};
