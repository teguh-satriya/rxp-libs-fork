import React from "react";
import { UIDateFieldProps } from "./UIDateField";
import UIField from "./UIField";
import { uistyle } from "../utils/ConfigUtil";
import DatePicker from "react-native-datepicker";

export default (p: UIDateFieldProps) => {
  const textStyle = uistyle("text.style");

  return (
    <UIField label={p.label} style={p.style} color={p.color}>
      <UIField
        label={p.label}
        style={{
          ...p.style
        }}
        color={p.color}
      >
        <DatePicker
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%"
          }}
          date={p.value}
          mode="time"
          placeholder="HH:MM"
          format="HH:MM"
          minDate={p.lowwerDate}
          maxDate={p.upperDate}
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              alignItems: "flex-start",
              ...textStyle
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={p.setValue}
        />
      </UIField>
    </UIField>
  );
};
