import _ from "lodash";
import React, { useRef } from "react";
import { View } from "reactxp";
import {
  VirtualListView,
  VirtualListViewCellRenderDetails
} from "reactxp-virtuallistview";
import { UIProps } from "./Styles/Style";
import UICol from "./UICol";
import { sortColumns, UIListFieldsProps } from "./UIList";
import UIRow from "./UIRow";
import UIText from "./UIText";

interface UIJsonListProps extends UIProps {
  vlistProps?: any;
  vlistRef?: any;
  items: any;
  primaryKey: string;
  itemHeight?: number;
  hideUnlisted?: boolean;
  renderItems: any;
  colCount?: number;
  rowAttributes?: any;
  fields?: UIListFieldsProps;
  maxHeight?: any;
  rowStyle: ((item: any) => object) | object;
}

export const ListWrapper = ({
  items,
  primaryKey,
  renderItems,
  itemHeight,
  fields,
  hideUnlisted,
  rowAttributes,
  vlistRef,
  vlistProps,
  rowStyle
}: UIJsonListProps) => {
  const sortedKeys = sortColumns(items, fields, "list", hideUnlisted);
  const renderRef = useRef((details: VirtualListViewCellRenderDetails<any>) => {
    return renderItems(details, fields, sortedKeys, rowAttributes, rowStyle);
  });
  const ref = vlistRef ? vlistRef : useRef(null as any);
  const iheight =
    itemHeight ||
    Math.max(
      Math.ceil(sortedKeys.length * 35) / 2,
      Math.ceil(sortedKeys.length * 35)
    );

  return (
    <VirtualListView
      style={{
        minHeight: iheight * items.length,
        maxHeight: iheight * 2 * items.length
      }}
      itemList={items.map((item: any, _index: number) => {
        return {
          ...item,
          key: item[primaryKey],
          height: iheight,
          measureHeight: true
        };
      })}
      renderItem={renderRef.current}
      ref={ref}
      animateChanges={true}
      skipRenderIfItemUnchanged={false}
      {...vlistProps}
    />
  );
};

export const ListItems = (
  details: VirtualListViewCellRenderDetails<any>,
  fields: UIListFieldsProps,
  sortedItemKeys: string[],
  // rowAttributes: any = {},
  rowStyle: ((item: any) => any) | any = {}
) => {
  const item = { ...details.item };
  const key = item.key;
  delete item.key;
  delete item.height;
  const style = {};
  let sorted = sortedItemKeys;
  if (sortedItemKeys === undefined) {
    sorted = sortColumns(item, fields, "list");
  }

  // if (rowAttributes.onPress) {
  //   rowAttributes.onPress = rowAttributes.onPress.bind(item);
  // }
  const rstyle = typeof rowStyle === "function" ? rowStyle(item) : rowStyle;
  return (
    <View
      style={[
        {
          padding: 10,
          paddingLeft: 15,
          paddingRight: 15,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: "#e9ecef"
        },
        rstyle
      ]}
      key={key}
      // {...rowAttributes}
    >
      {sorted.map((i: string, idx: number) => {
        const field = fields && fields[i];
        const label = _.get(field, "table.header", i);
        if (field) {
          const render = _.get(field, "list.render") || _.get(field, "render");
          if (typeof render === "function") return render(item, idx, field);
        }

        const visible: any = _.get(field, `list.visible`);
        if (visible == false) return;

        return (
          <UIRow style={{ ...style, alignItems: "center" }} key={idx}>
            <UICol size={4}>
              <UIText
                style={{
                  minHeight: 30,
                  color: "#8898aa",
                  textAlign: "left"
                }}
              >
                {_.upperFirst(label)}
              </UIText>
            </UICol>
            <UICol
              size={8}
              style={{
                justifyContent: "center"
              }}
            >
              {React.isValidElement(item[i]) ? (
                item[i]
              ) : (
                <UIText
                  style={{
                    minHeight: 30,
                    color: "#525f7f",
                    textAlign: "left"
                  }}
                >
                  {typeof item[i] === "string"
                    ? item[i].replace(/\n/g, " ")
                    : item[i]}
                </UIText>
              )}
            </UICol>
          </UIRow>
        );
      })}
    </View>
  );
};

export default (p: UIJsonListProps) => {
  return <ListWrapper {...p} renderItems={p.renderItems || ListItems} />;
};
