import React from "react";
import { View, Image } from "reactxp";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";

interface UICardProps extends UIProps {
  mode?: "normal" | "clean" | "shadow";
}

export default (p: UICardProps) => {
  let style = uistyle(`card.container`, p.style);

  let modeStyle = uistyle(`card.${p.mode || "normal"}`);

  return <View style={{ ...modeStyle, ...style }}>{p.children}</View>;
};

export const UICardHeader = (p: UIProps) => {
  let style = uistyle(`card.header`, p.style);

  return <View style={style}>{p.children}</View>;
};

export const UICardBody = (p: UIProps) => {
  let style = uistyle(`card.body`, p.style);

  return <View style={style}>{p.children}</View>;
};

export const UICardFooter = (p: UIProps) => {
  let style = uistyle(`card.footer`, p.style);

  return <View style={style}>{p.children}</View>;
};

export const UICardImg = ({ src, style, attr }: any) => {
  let cardStyle = uistyle(`card.image`);

  return (
    <View style={cardStyle}>
      <Image source={src} style={style} {...attr} />
    </View>
  );
};
