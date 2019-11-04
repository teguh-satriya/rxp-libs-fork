import React, { useState } from "react";
import UITextField from "./UITextField";
import { View } from "reactxp";
import { UIProps } from "./Styles/Style";

interface UISearchProps extends UIProps {
  onSearch?: (value: string) => any;
  autoFocus?: boolean;
  fieldStyle?: any;
}

export default (p: UISearchProps) => {
  const [input, setInput] = useState("");
  const fieldStyle = {
    width: '100%',
    ...(p.fieldStyle ? p.fieldStyle : {})
  }

  return (
    <View style={p.style}>
      {p.children ? p.children : <UITextField
        value={input}
        setValue={v => {
          setInput(v);
        }}
        onChangeText={v => {
          p.onSearch && p.onSearch(v);
        }}
        placeholder="Search..."
        autoFocus={p.autoFocus}
        fieldStyle={fieldStyle}
      />}
    </View>
  );
};
