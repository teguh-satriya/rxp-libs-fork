import React, { useState } from "react";
import { View, Button } from "reactxp";
import { UIProps } from "./Styles/Style";
import { MainStyle } from "@app/config";

interface UISwitchProps extends UIProps {
  value: boolean;
  setValue: (value: boolean) => void;
  activeStyle?: any;
}

export default (p: UISwitchProps) => {
  const [input, setInput] = useState(p.value);
  const style = {
    justifyContent: input ? "flex-end" : "flex-start",
    display: "flex",
    flexDirection: "row",
    width: 50,
    backgroundColor: input ? MainStyle.primaryColor : "#e4e4e4",
    borderRadius: 15,
    padding: 4,
    ...p.style,
    ...(input ? p.activeStyle : {})
  };
  const activeStyle: any = input ? {} : {};

  return (
    <View>
      <Button
        style={style}
        onPress={() => {
          setInput(!input);
          p.setValue(!input);
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: "#fff",
            borderRadius: 15,
            ...activeStyle
          }}
        />
      </Button>
    </View>
  );
};
