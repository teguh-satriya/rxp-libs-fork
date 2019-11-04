import { UIProps } from "./Styles/Style";
import React from "react";
import { View } from "reactxp";

interface UISimpleListProps extends UIProps {
  data: any[];
  renderItems: (item: any, options: { index: number }) => any;
}

export default ({ data, renderItems, style, children }: UISimpleListProps) => {
  return (
    <View
      style={{
        ...{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start"
        },
        ...style
      }}
    >
      {data.map((item: any, index: number) => {
        return renderItems(item, { index });
      })}
      {children}
    </View>
  );
};
