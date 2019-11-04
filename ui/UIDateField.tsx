import React from 'react';
import UIFieldStyle from './Styles/UIFieldStyle';
import UIField, { UIFieldProps } from './UIField';
import { View } from 'reactxp';
import { getShortDate } from '../utils/Helper';

export interface UIDateFieldProps extends UIFieldProps {
  value: string;
  setValue: (value: string) => void;
  futureDate?: boolean;
  pastDate?: boolean;
  upperDate?: Date;
  lowwerDate?: Date;
  fieldProps?: any;
  props?: any;
  required?: boolean;
}

const validate = (input: any, p: any) => {
  let inDate = new Date(input);
  if (!!input) {
    let nowDate = new Date();
    let lDate = p.lowwerDate;
    let uDate = p.upperDate;
    if (p.pastDate || p.futureDate) {
      if (!!lDate && !!uDate) {
        if (inDate < lDate || inDate > uDate) {
          alert(
            `Masukkan tanggal antara ${lDate.toLocaleDateString()} - ${uDate.toLocaleDateString()}!`
          );
          return inDate < lDate
            ? lDate.toLocaleDateString()
            : uDate.toLocaleDateString();
        }
        return inDate.toLocaleDateString();
      } else if (!!uDate) {
        if (inDate > uDate) {
          alert(`Masukkan tanggal sebelum ${uDate.toLocaleDateString()}!`);
          return uDate.toLocaleDateString();
        }
      } else if (!!lDate) {
        if (inDate < lDate) {
          alert(`Masukkan tanggal setelah ${lDate.toLocaleDateString()}!`);
          return lDate.toLocaleDateString();
        }
      }
      if (!!p.futureDate && inDate < nowDate) {
        alert(`Masukkan tanggal hari ini atau setelahnya!`);
        return nowDate.toLocaleDateString();
      } else if (!!p.pastDate && inDate > nowDate) {
        alert(`Masukkan tanggal hari ini atau sebelumnya!`);
        return nowDate.toLocaleDateString();
      } else {
        return inDate.toLocaleDateString();
      }
    }
  }
  return input;
};

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
      <View
        style={{
          height: baseHeight,
          justifyContent: 'center',
          paddingLeft: 10
        }}
      >
        <input
          type="date"
          value={p.value || ''}
          style={{ border: 0, fontSize: 14 }}
          onChange={e => {
            let date: any = e.target.value;
            if (!!date) {
              date = new Date(validate(date, p));
              date = getShortDate(date);
            }
            e.target.value = date;
            p.setValue(date);
          }}
        />
      </View>
    </UIField>
  );
};
