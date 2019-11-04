import React from 'react';
import UIFieldStyle from './Styles/UIFieldStyle';
import UIField, { UIFieldProps } from './UIField';
import { View } from 'reactxp';

export interface UIDateFieldProps extends UIFieldProps {
  value: string;
  setValue: (value: string) => void;
  fieldProps?: any;

  required?: boolean;
}

export default (p: UIDateFieldProps) => {
  const baseHeight = UIFieldStyle.field.minHeight;
  return (
    <UIField
      label={p.label}
      style={p.style}
      fieldStyle={{ paddingLeft: 0, paddingRight: 0 }}
      color={p.color}
      {...p.fieldProps}
      required={p.required}
    >
      <View style={{ height: baseHeight, justifyContent: 'center' }}>
        <input
          type="time"
          value={p.value || ''}
          style={{ border: 0, fontSize: 14, marginLeft: 10 }}
          onChange={e => {
            p.setValue(e.target.value);
          }}
        />
      </View>
    </UIField>
  );
};
