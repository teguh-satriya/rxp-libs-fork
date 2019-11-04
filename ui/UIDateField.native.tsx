import { getShortDate } from '@app/utils/Helper';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { uistyle } from '../utils/ConfigUtil';
import { UIDateFieldProps } from './UIDateField';
import UIField from './UIField';

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
  const textStyle = uistyle('text.style');

  return (
    <UIField
      label={p.label}
      style={{
        ...p.style
      }}
      color={p.color}
      required={p.required}
    >
      <DatePicker
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          ...textStyle
        }}
        date={p.value}
        mode="date"
        placeholder="YYYY-MM-DD"
        format="YYYY-MM-DD"
        minDate={p.lowwerDate}
        maxDate={p.upperDate}
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            alignItems: 'flex-start',
            ...textStyle
          },
          dateText: {
            fontSize: 16,
            ...textStyle
          },
          placeholderText: {
            ...textStyle
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(value: any) => {
          let date: any = value;
          if (!!date) {
            console.log(validate(date, p));
            date = new Date(validate(date, p));
            date = getShortDate(date);
          }
          value = date;
          p.setValue(date);
        }}
      />
    </UIField>
  );
};
