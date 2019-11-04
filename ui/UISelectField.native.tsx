import _ from 'lodash';
import React, { useState } from 'react';
import { Button, View } from 'reactxp';
import { VirtualListViewCellRenderDetails } from 'reactxp-virtuallistview';
import { uistyle } from '../utils/ConfigUtil';
import { fuzzyMatch } from '../utils/Helper';
import IconChevronDown from './Icons/IconChevronDown';
import UIFieldStyle from './Styles/UIFieldStyle';
import UIField, { UIFieldProps } from './UIField';
import UIJsonList from './UIJsonList';
import UISearch from './UISearch';
import UIText from './UIText';
import { ScrollView } from 'react-native';

interface UISelectFieldProps extends UIFieldProps {
  items: (
    | {
        label: string;
        value: any;
        item?: any;
      }
    | string)[];
  value: string | number;
  setValue: (value: any, label?: any, row?: any) => any;
  search?: boolean;
  disable?: boolean;
  // onSearch?: (
  //   value: string
  // ) => {
  //   label: string;
  //   value: any;
  // }[];
  onSearch?: (value: string) => any;
  onDismiss?: (value: boolean) => any;
  boxStyle?: any;
  renderItems?: (
    details: VirtualListViewCellRenderDetails<any>,
    props: UISelectInternalProps
  ) => any;
  fieldProps?: any;
  loading?: boolean;
  required?: boolean;
}

interface UISelectInternalProps extends UISelectFieldProps {
  open: boolean;
  setOpen: (value: any) => any;
}

const DefaultRenderItems = (
  details: VirtualListViewCellRenderDetails<any>,
  p: UISelectInternalProps
) => {
  const rowStyle = details.item.key > 0 ? {} : {};
  return (
    <Button
      onPress={() => {
        p.setValue(details.item.value, details.item.label, details.item);
        p.setOpen(false);
        p.onDismiss && p.onDismiss(true);
      }}
      style={{
        ...rowStyle,
        paddingTop: 5,
        paddingBottom: 5,
        minHeight: 40,
        backgroundColor: 'white'
      }}
    >
      <UIText
        style={{
          overflow: 'hidden'
          // whiteSpace: "nowrap"
          // textOverflow: "ellipsis"
        }}
      >
        {details.item.label}
      </UIText>
    </Button>
  );
};

const WebSelectFieldList = (p: UISelectInternalProps) => {
  const boxstyle = uistyle(`selectfield.box`);
  const [list, setList] = useState(p.items);
  let items = p.items;
  if (p.search && p.onSearch === undefined) {
    items = list;
  }
  const onSearch =
    p.onSearch ||
    (search => {
      if (!search) setList(p.items);
      else
        setList(
          p.items.filter(item => {
            if (typeof item === 'string') {
              return fuzzyMatch(search, item);
            } else {
              return fuzzyMatch(search, item.label);
            }
          })
        );
    });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#fff',
        ...boxstyle,
        ...p.boxStyle
      }}
    >
      {/* {p.search && items.length > 4 && ( */}
      <UISearch
        style={{
          padding: 5,
          marginLeft: -10,
          borderWidth: 0,
          borderColor: '#999',
          borderBottomWidth: 1
        }}
        onSearch={onSearch}
      />
      {/* )} */}
      {p.loading && <UIText style={{ padding: 10 }}>Loading...</UIText>}
      <ScrollView nestedScrollEnabled={true}>
        <UIJsonList
          style={{ minHeight: 400 }}
          primaryKey="value"
          items={_.uniqBy(
            items.map((i: any) => {
              if (typeof i === 'string') {
                return {
                  label: i,
                  value: i
                };
              } else {
                return i;
              }
            }),
            'value'
          )}
          itemHeight={40}
          renderItems={(details: VirtualListViewCellRenderDetails<any>) => {
            const render = p.renderItems || DefaultRenderItems;
            return render(details, p);
          }}
        />
      </ScrollView>
    </View>
  );
};

const BaseUISelectField = (p: UISelectInternalProps) => {
  const style = uistyle(`selectfield.container`, p.style);
  const labelTextStyle = uistyle(`selectfield.label`, p.style);
  const itemMaps: any = {};

  if (Array.isArray(p.items)) {
    p.items.map(item => {
      if (typeof item === 'string') {
        itemMaps[item] = item;
      } else itemMaps[item.value] = item.label;
    });
  }
  const label = itemMaps[p.value] || p.value;
  const baseHeight = UIFieldStyle.field.minHeight;

  return (
    <UIField
      label={p.label}
      style={style}
      color={p.color}
      {...p.fieldProps}
      required={p.required}
    >
      <Button
        style={{ minHeight: baseHeight }}
        onPress={() => {
          p.setOpen(!p.open && !p.disable);
          p.onDismiss && p.onDismiss(p.open);
        }}
      >
        {/* <UIRow
          style={{
            marginLeft: 0,
            marginRight: 0,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        > */}
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexGrow: 1,
              flexShrink: 1,
              marginRight: 15
            }}
          >
            <UIText
              style={{
                overflow: 'hidden',
                // whiteSpace: "nowrap",
                // textOverflow: "ellipsis",
                ...labelTextStyle
              }}
            >
              {label}
            </UIText>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <IconChevronDown
              color={p.color}
              width={12}
              height={12}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </View>
        {/* </UIRow> */}
      </Button>
      {p.open && p.children}
    </UIField>
  );
};

export default (p: UISelectFieldProps) => {
  const [open, setOpen] = useState(false);
  return (
    <BaseUISelectField {...p} open={open} setOpen={setOpen}>
      <WebSelectFieldList {...p} open={open} setOpen={setOpen} />
    </BaseUISelectField>
  );
};
