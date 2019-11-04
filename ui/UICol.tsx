import React from "react";
import { View } from "reactxp";
import { Responsive } from "./MediaQuery";
import { UIProps } from "./Styles/Style";

interface UIColProps extends UIProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  size: number;
}
const colStyle = {
  paddingLeft: 5,
  paddingRight: 5
};

export default ({ size, xs, sm, md, lg, children, style }: UIColProps) => {
  return (
    <Responsive
      xs={
        <View
          style={{
            ...colStyle,
            flexBasis: (((xs || size || 1) / 12) * 100 + "%") as any,
            ...style
          }}
        >
          {children}
        </View>
      }
      sm={
        <View
          style={{
            ...colStyle,
            flexBasis: (((sm || size || 1) / 12) * 100 + "%") as any
          }}
        >
          {children}
        </View>
      }
      md={
        <View
          style={{
            ...colStyle,
            flexBasis: (((md || size || 1) / 12) * 100 + "%") as any,
            ...style
          }}
        >
          {children}
        </View>
      }
      lg={
        <View
          style={{
            ...colStyle,
            flexBasis: (((lg || size || 1) / 12) * 100 + "%") as any,
            ...style
          }}
        >
          {children}
        </View>
      }
    />
  );
};
