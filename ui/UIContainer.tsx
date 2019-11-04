import React from "react";
import { View } from "reactxp";
import { MainStyle } from "@app/config";

export default ({ children }: any) => {
  return (
    <View
      style={{
        backgroundColor: MainStyle.backgroundColor,
        flex: 1,
        flexDirection: "column"
      }}
    >
      {children}
    </View>
  );
};
