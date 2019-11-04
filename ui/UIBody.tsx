import _ from "lodash";
import React from "react";
import { ScrollView, View } from "reactxp";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";

interface UIBodyProps extends UIProps {
  scroll?: boolean;
  padding?: boolean;
  props?: any;
}

export default ({
  children,
  style,
  scroll = false,
  padding = true,
  props = {}
}: UIBodyProps) => {
  let BodyTag: any = View;
  let bodyStyle: any = uistyle(
    `ui.body`,
    padding
      ? {
          padding: 10,
          paddingLeft: 25,
          paddingRight: 25
        }
      : {}
  );
  React.Children.forEach(children, (child, index) => {
    if (index === 0 && _.get(child, "type.name") === "UIList") {
      BodyTag = View;
      bodyStyle = {
        alignItems: "stretch"
      };
    }
  });

  if (scroll) {
    BodyTag = ScrollView;
  }

  return (
    <BodyTag
      {...props}
      style={{
        flex: 1,
        ...bodyStyle,
        ...style
      }}
    >
      {children}
    </BodyTag>
  );
};
