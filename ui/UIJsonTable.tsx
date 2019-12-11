import _ from "lodash";
import React, { useRef } from "react";
import { Button, Styles, View } from "reactxp";
import {
  VirtualListView,
  VirtualListViewCellRenderDetails
} from "reactxp-virtuallistview";
import { UIProps } from "./Styles/Style";
import { sortColumns, UIListFieldsProps, UIListSingleField } from "./UIList";
import UIText from "./UIText";

export interface UIJsonTableCoreProps extends UIProps {
  hideUnlisted?: boolean;
  rowAttributes?: any;
  itemHeight?: number;
  onSort?: (col: string, field?: UIListSingleField) => void;
}

interface UIJsonTableProps extends UIJsonTableCoreProps {
  vlistProps?: any;
  vlistRef?: any;
  items: any;
  primaryKey: string;
  renderItems: any;
  rowStyle: ((item: any) => object) | object;
  fields?: UIListFieldsProps;
}

export const TableWrapper = (p: UIJsonTableProps) => {
  const {
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
  } = p;
  let sortedKeys = sortColumns(
    items.length > 0 ? items[0] : {},
    fields || {},
    "table",
    hideUnlisted
  );

  const renderRef = useRef((details: VirtualListViewCellRenderDetails<any>) => {
    return renderItems(details, fields, sortedKeys, rowAttributes, rowStyle);
  });
  const ref = vlistRef ? vlistRef : useRef(null as any);

  return (
    <View style={{ flex: 1 }}>
      <TableHeader sortedItemKeys={sortedKeys} {...p} />
      <VirtualListView
        itemList={items.map((item: any, _index: number) => {
          return {
            ...item,
            key: item[primaryKey],
            height: itemHeight || 45,
            measureHeight: true
          };
        })}
        ref={ref}
        animateChanges={true}
        renderItem={renderRef.current}
        skipRenderIfItemUnchanged={false}
        {...vlistProps}
      />
    </View>
  );
};

interface UIJsonTableHeaderProps extends UIJsonTableProps {
  sortedItemKeys: string[];
}

export const TableHeader = (p: UIJsonTableHeaderProps) => {
  const { fields, itemHeight } = p;
  let sorted = p.sortedItemKeys;
  if (p.sortedItemKeys === undefined) {
    sorted = sortColumns(p.items[0], p.fields || {}, "table");
  }
  const onSort = _.get(p, "onSort");
  return (
    <View style={[defaultHeaderRowStyle, { height: p.itemHeight || 40 }]}>
      {sorted.map((i: string, idx: number) => {
        const field = fields && fields[i];
        const label = _.get(field, "table.header", i);

        const visible: any = _.get(field, `table.visible`);
        if (visible === false) return;

        return (
          <Button
            onPress={() => {
              if (typeof onSort === "function") {
                onSort(i, field);
              }
            }}
            key={idx}
            style={[colStyle, { height: itemHeight || 40 }]}
          >
            <UIText style={{ color: "#8898aa", fontWeight: 600 }} size="small">
              {_.upperFirst(label)}
            </UIText>
          </Button>
        );
      })}
    </View>
  );
};

export const TableRows = (
  details: VirtualListViewCellRenderDetails<any>,
  fields: UIListFieldsProps,
  sortedItemKeys?: string[],
  rowAttributes: any = {},
  rowStyle: ((item: any) => any) | any = {}
) => {
  const item = { ...details.item };
  const key = item.key;
  const h = item.height;
  delete item.key;
  delete item.height;

  let sorted = sortedItemKeys;
  if (sorted === undefined) {
    sorted = sortColumns(item, fields);
  }

  if (rowAttributes.onPress) {
    rowAttributes.onPress = rowAttributes.onPress.bind(item);
  }

  const rstyle = typeof rowStyle === "function" ? rowStyle(item) : rowStyle;
  return (
    <View
      style={[
        defaultRowStyle,
        { height: h || 40 },
        rowAttributes.style,
        rstyle
      ]}
      key={key}
      {...rowAttributes}
    >
      {sorted.map((i: string, idx: number) => {
        const field: any = fields && fields[i];
        if (field) {
          const render =
            _.get(field, "list.render") || _.get(field, "table.render");
          if (typeof render === "function") return render(item, idx, field);
        }
        const width = _.get(field, "list.width") || _.get(field, "table.width");
        const visible: any = _.get(field, `table.visible`);
        if (visible === false) return;

        return (
          <View style={[colStyle, width ? { width } : {}]} key={idx}>
            {React.isValidElement(item[i]) ? (
              item[i]
            ) : (
              <UIText
                style={{
                  width: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflowWrap: "break-word",
                  color: "#525f7f",
                  fontSize: 15
                }}
              >
                {item[i]}
              </UIText>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default (p: UIJsonTableProps) => {
  return <TableWrapper {...p} renderItems={p.renderItems || TableRows} />;
};

const defaultHeaderRowStyle = Styles.createViewStyle({
  borderWidth: 0,
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "#e9ecef",
  justifyContent: "space-between",
  backgroundColor: "#f6f9fc"
});

const defaultRowStyle = Styles.createViewStyle({
  borderWidth: 0,
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "#e9ecef",
  justifyContent: "space-between",
  backgroundColor: "#fff"
});

const colStyle = Styles.createViewStyle({
  padding: 0,
  paddingLeft: 20,
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  alignItems: "flex-start",
  justifyContent: "center"
});