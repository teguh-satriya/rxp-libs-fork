import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'reactxp';
import { uistyle } from '../utils/ConfigUtil';
import UIField, { UIFieldProps } from './UIField';
import UIFieldStyle from './Styles/UIFieldStyle';

interface UITextFieldProps extends UIFieldProps {
  value: string | number;
  setValue: (value: string) => void;
  onChangeText?: (value: string) => void;
  type?: 'text' | 'number' | 'money' | 'password' | 'decimal';
  placeholder?: string;
  autoFocus?: boolean;
  fieldProps?: any;
  fieldStyle?: any;
  required?: boolean;
}

export default (p: UITextFieldProps) => {
  const [text, setText] = useState((p.value || '').toString());
  const type = p.type || 'text';
  const style = uistyle(`textfield.container`, p.style);
  const fieldStyle = uistyle(`textfield.field`, p.style);
  const focus = useRef(false);

  const baseHeight = UIFieldStyle.field.minHeight;
  fieldStyle.minHeight = baseHeight;

  useEffect(() => {
    if (!focus.current) setText((p.value || '').toString());
  }, [p.value]);

  const onChangeText = (value: string) => {
    setText(value);
    if (p.onChangeText) p.onChangeText(value);
  };

  return (
    <UIField
      label={p.label}
      style={style}
      fieldStyle={p.fieldStyle}
      color={p.color}
      {...p.fieldProps}
      required={p.required}
    >
      {
        ({
          multiline: (
            <TextInput
              placeholder={p.placeholder}
              style={[{ paddingTop: 5 }, fieldStyle]}
              onFocus={() => (focus.current = true)}
              onBlur={() => {
                focus.current = false;
                p.setValue(text);
              }}
              value={text}
              multiline={true}
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          ),
          text: (
            <TextInput
              placeholder={p.placeholder}
              style={fieldStyle}
              onFocus={() => (focus.current = true)}
              onBlur={() => {
                focus.current = false;
                p.setValue(text);
              }}
              value={text}
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          ),
          password: (
            <TextInput
              placeholder={p.placeholder}
              style={fieldStyle}
              onFocus={() => (focus.current = true)}
              onBlur={() => {
                focus.current = false;
                p.setValue(text);
              }}
              secureTextEntry={true}
              value={text}
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          ),
          number: (
            <TextInput
              placeholder={p.placeholder}
              style={fieldStyle}
              onFocus={() => (focus.current = true)}
              onBlur={() => {
                focus.current = false;
                p.setValue(parseInt(text).toString());
              }}
              value={parseInt(text.replace(/\D/g, '') || '0').toString()}
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          ),
          decimal: (
            <TextInput
              placeholder={p.placeholder}
              style={fieldStyle}
              onFocus={() => (focus.current = true)}
              onBlur={() => {
                focus.current = false;
                p.setValue(text);
              }}
              value={
                focus.current
                  ? text.replace(/[^\d*\.?\d*$]/g, '')
                  : parseFloat(
                      text.toString().replace(/[^\d*\.?\d*$]/g, '') || '0'
                    ).toString()
              }
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          ),
          money: (
            <TextInput
              placeholder={p.placeholder}
              style={fieldStyle}
              onFocus={() => {
                focus.current = true;
                p.setValue(text.replace(',', ''));
              }}
              onBlur={() => {
                focus.current = false;
                p.setValue(text.replace(',', ''));
              }}
              value={
                focus.current
                  ? text.replace(/[^\d*\.?\d*$]/g, '')
                  : parseFloat(
                      text.toString().replace(/[^\d*\.?\d*$]/g, '') || '0'
                    ).toLocaleString()
              }
              onChangeText={onChangeText}
              autoFocus={p.autoFocus}
            />
          )
        } as any)[type]
      }
    </UIField>
  );
};
