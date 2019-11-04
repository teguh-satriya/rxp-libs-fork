import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'reactxp';
import { isSize } from './MediaQuery';
import { UIProps } from './Styles/Style';
import UICol from './UICol';
import UIDateField from './UIDateField';
import UIField from './UIField';
import UIRow from './UIRow';
import UISelectField from './UISelectField';
import UIText from './UIText';
import UITextField from './UITextField';
import UITimeField from './UITimeField';
import { ScrollView } from 'react-native';
export interface UIJsonFieldSingleProps {
  key?: string;
  label?: string;
  sublabel?: string;
  type?: string;
  component?: any;
  options?: any;
  size?:
    | number
    | {
        xs: number;
        sm: number;
        md: number;
        lg: number;
      };
  value?: UIJsonFieldSingleProps | UIJsonFieldSingleProps[];
  required?: boolean;
}

interface UIJsonFieldProps extends UIProps {
  field?: UIJsonFieldSingleProps[];
  items: any;
  setValue: (value: any, key: any) => void;
  style?: object;
  size?:
    | number
    | {
        xs: number;
        sm: number;
        md: number;
        lg: number;
      };
}

export default observer((p: UIJsonFieldProps) => {
  const items = p.items || {};
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={p.style}>
        <UIRow>
          {(p.field || []).map((field: UIJsonFieldSingleProps, k: number) => {
            if (Array.isArray(field.value)) {
              return (
                <RenderGroup
                  key={k}
                  index={k}
                  field={field}
                  items={items}
                  setValue={p.setValue}
                />
              );
            }
            return (
              <RenderSingle
                key={k}
                idx={k}
                field={field}
                setValue={p.setValue}
                value={items[field.key || '']}
                data={items}
              />
            );
          })}
        </UIRow>
      </View>
    </ScrollView>
  );
});

const RenderSingle = ({ idx, field, setValue, value, data }: any) => {
  let component = null;
  if (!field.component) {
    switch (field.type) {
      default:
        component = (
          <UITextField
            type={field.type}
            label={_.upperFirst(field.label)}
            value={value}
            setValue={e => {
              setValue(e, field.key);
            }}
            {...field.options}
            required={field.required}
          />
        );
        break;
      case 'date':
        component = (
          <UIDateField
            type={field.type}
            label={_.upperFirst(field.label)}
            value={value}
            setValue={e => setValue(e, field.key)}
            {...field.options}
            required={field.required}
          />
        );
        break;
      case 'time':
        component = (
          <UITimeField
            type={field.type}
            label={_.upperFirst(field.label)}
            value={value}
            setValue={e => setValue(e, field.key)}
            {...field.options}
            required={field.required}
          />
        );
        break;
      case 'dropdown':
      case 'select':
        component = (
          <UISelectField
            label={_.upperFirst(field.label)}
            value={value}
            setValue={e => setValue(e, field.key)}
            {...field.options}
            required={field.required}
          />
        );
        break;
      case 'field':
        component = (
          <UIField
            label={field.label}
            fieldStyle={{ backgroundColor: '#ececeb' }}
          >
            {value}
          </UIField>
        );
        break;
      case 'fieldMoney':
        component = (
          <UIField
            label={field.label}
            fieldStyle={{ backgroundColor: '#ececeb' }}
          >
            {value &&
              (typeof value === 'string'
                ? parseFloat(
                    value.replace(/[^\d*\.?\d*$]/g, '') || '0'
                  ).toLocaleString()
                : value.toLocaleString())}
          </UIField>
        );
        break;
      case 'empty':
        component = <View />;
        break;
    }
  } else {
    if (
      typeof field.component === 'function' &&
      !React.isValidElement(field.component)
    ) {
      component = field.component({ index: idx, data, value, field, setValue });
    } else {
      component = field.component;
    }
  }

  let size = field.size || 4;
  let detailSize = { xs: 12, sm: 12, md: 12, ...field.size };

  return (
    <UICol size={size} {...detailSize}>
      {component}
    </UICol>
  );
};

const RenderGroup = ({ index, field, setValue, items }: any) => {
  let size = field.size || 6;
  let detailSize = { xs: 12, sm: 12, md: 12, ...field.size };

  return (
    <UICol size={size} {...detailSize}>
      <UIRow
        style={{
          borderWidth: 0,
          borderColor: '#ececeb',
          borderBottomWidth: isSize(['xs', 'sm']) ? 1 : 0,
          marginTop: isSize(['xs', 'sm']) ? (index === 0 ? 0 : 10) : 10,
          paddingBottom: isSize(['xs', 'sm']) ? 25 : 0,
          marginBottom: isSize(['xs', 'sm']) ? 5 : 0
        }}
      >
        <UICol
          size={3}
          xs={12}
          sm={12}
          style={{
            paddingBottom: isSize(['xs', 'sm']) ? 15 : 0
          }}
        >
          <UIText
            style={{
              fontSize: 18,
              paddingTop: isSize(['xs', 'sm']) ? (index === 0 ? 0 : 10) : 10,
              paddingLeft: isSize(['xs', 'sm']) ? 0 : 20,
              color: '#333'
              // fontWeight: isSize(["xs", "sm"]) ? 600 : 400
            }}
          >
            {field.label}
          </UIText>

          {field.sublabel && (
            <UIText
              style={{
                fontSize: 13,
                paddingTop: 5,
                paddingLeft: isSize(['xs', 'sm']) ? 0 : 20,
                color: '#666'
              }}
            >
              {field.sublabel}
            </UIText>
          )}
        </UICol>
        <UICol size={8} xs={12} sm={12}>
          <UIRow>
            {field.value.map((v: any, k: number) => (
              <RenderSingle
                key={k}
                field={v}
                value={items[v.key]}
                setValue={setValue}
              />
            ))}
          </UIRow>
        </UICol>
      </UIRow>
    </UICol>
  );
};
