import React from 'react';
import { View } from 'reactxp';
import { UIProps } from './Styles/Style';
import { uistyle } from '../utils/ConfigUtil';
import UIText from './UIText';

export interface UIFieldProps extends UIProps {
  label?: string;
  sublabel?: string;
  color?: 'default' | 'error' | 'success';
  focused?: boolean;
  fieldStyle?: object;
  labelStyle?: object;
  subLabelStyle?: object;
  required?: boolean;
}

export default (p: UIFieldProps) => {
  const style = uistyle(`field.container`, p.style);
  let labelStyle = uistyle(`field.label`, p.labelStyle);
  let subLabelStyle = uistyle(`field.sublabel`, p.subLabelStyle);
  let fieldStyle = uistyle(`field.field`, p.fieldStyle);

  if (p.color === 'error') {
    labelStyle = { ...labelStyle, ...uistyle(`field.color.error.label`) };
    subLabelStyle = {
      ...subLabelStyle,
      ...uistyle(`field.color.error.sublabel`)
    };
    fieldStyle = { ...fieldStyle, ...uistyle(`field.color.error.field`) };
  }

  if (p.color === 'success') {
    labelStyle = { ...labelStyle, ...uistyle(`field.color.success.label`) };
    subLabelStyle = {
      ...subLabelStyle,
      ...uistyle(`field.color.success.sublabel`)
    };
    fieldStyle = { ...fieldStyle, ...uistyle(`field.color.success.field`) };
  }

  return (
    <View style={style}>
      {p.label && (
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <UIText size="small" style={labelStyle}>
            {p.label}
          </UIText>
          {p.required === true && (
            <UIText
              size="small"
              style={{
                ...labelStyle,
                color: 'red'
              }}
            >
              &nbsp;*
            </UIText>
          )}
        </View>
      )}
      {typeof p.children == 'string' || typeof p.children == 'number' ? (
        <UIText>{p.children}</UIText>
      ) : (
        <View style={fieldStyle}>{p.children}</View>
      )}
      {p.sublabel && (
        <UIText style={subLabelStyle} size="small">
          {p.sublabel}
        </UIText>
      )}
    </View>
  );
};
