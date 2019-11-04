import LinearGradient, {
  LinearGradientProps
} from "react-native-linear-gradient";
import React from "react";

export default (p: LinearGradientProps) => {
  const style = (p.style as any) || {};
  return (
    <LinearGradient
      {...p}
      style={{
        ...{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start"
        },
        ...style
      }}
    />
  );
};
