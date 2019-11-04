import React from "react";
import { View } from "reactxp";

export default (props: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: -5,
        marginRight: -5,
        ...props.style
      }}
      onPress={props.onPress}
    >
      {props.children || null}
    </View>
  );
};
