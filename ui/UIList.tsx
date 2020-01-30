import _ from "lodash";
import get from "lodash/get";
import { toJS } from "mobx";
import { observer, useObservable } from "mobx-react-lite";
import React, { useRef } from "react";
import { Modal, View } from "reactxp";
import { isSize, Responsive } from "./MediaQuery";
import { UIProps } from "./Styles/Style";
import UIJsonDetail from "./UIJsonDetail";
import { UIJsonFieldSingleProps } from "./UIJsonField";
import { ListItems, ListWrapper } from "./UIJsonList";
import { TableRows, TableWrapper, UIJsonTableCoreProps } from "./UIJsonTable";
import UIModalWraper from "./UIModalWraper";

export interface UIListSingleField {
  index?: number;
  visible?: boolean;
  render?: (
    item: any,
    index: string | number | undefined,
    field: UIListSingleField
  ) => any;
  selectionHide?: boolean;
  label?: string;
  field?: UIJsonFieldSingleProps;
  table?: {
    index?: number;
    visible?: boolean;
    width?: number;
    header?: string | any;
    render?: (
      item: any,
      index: string | number | undefined,
      field: UIListSingleField
    ) => any;
  };
  list?: {
    index?: number;
    visible?: boolean;
    render?: (
      item: any,
      index: string | number | undefined,
      field: UIListSingleField
    ) => any;
  };
}

export interface UIListFieldsProps {
  [key: string]: UIListSingleField;
}

interface UIListTableProps extends UIJsonTableCoreProps {
  wrapper?: any;
  items?: any;
}

interface UIListDetailAction {
  label?: string;
  icon?: any;
  onClick?: any;
  component?: any;
}

interface UIListProps extends UIProps {
  maxHeight?: boolean;
  items: any[];
  itemHeight?: number;
  primaryKey: string;
  mode?:
    | "list"
    | "table"
    | {
        xs?: "list" | "table";
        sm?: "list" | "table";
        md?: "list" | "table";
        lg?: "list" | "table";
      };
  selection?: "none" | "single" | "detail" | "multi";
  onSelect?: (newItem: any, selectedItems: any[]) => void;
  selectedRowStyle?: any;
  detailComponent?: (item: DetailComponentProps) => any;
  detail?: {
    component?: (item: DetailComponentProps) => any;
    actions?: UIListDetailAction[];
    header?: string | any;
    onlyShowColumns?: string[];
  };
  detailStyle?: any;
  fields?: UIListFieldsProps;
  // rowAttributes?: any;
  list?: {
    itemHeight?: number;
    wrapper?: any;
    items?: any;
  };
  table?: UIListTableProps;
}

export interface DetailComponentProps extends UIProps {
  pkval: any;
  items: any;
  pk: string;
  fields: UIListFieldsProps;
  close: () => void;
  item: any;
  actions?: UIListDetailAction[];
  header?: string | any;
  onlyShowColumns?: string[];
}

const DetailComponent = (p: DetailComponentProps) => {
  const labeledItem: any = {};
  _.each(p.item, function(value, key) {
    let nkey: any = _.get(p.fields, `${key}.table.header`) || key;
    if (p.onlyShowColumns && p.onlyShowColumns.length > 0) {
      let find = p.onlyShowColumns.indexOf(key) > 0;
      if (find) labeledItem[nkey] = value.replace(/\n/g, " ");
    } else if (_.get(p.fields, `${key}.table.header`)) {
      labeledItem[nkey] = value.replace(/\n/g, " ");
    }
  });
  let modal = (
    <UIModalWraper
      title={p.pkval}
      close={() => {
        Modal.dismiss("detail" + p.pkval);
        p.close();
      }}
    >
      <UIJsonDetail
        labelSize={4}
        data={labeledItem}
        style={{ backgroundColor: "#fff", paddingTop: 10, paddingBottom: 0 }}
      />
    </UIModalWraper>
  );

  Modal.show(modal, "detail" + p.pkval);
};

export default observer((p: UIListProps) => {
  const vlistProps: any = {};
  const ref = useRef(null as any);
  const data = useObservable({
    selected: [] as any[]
  });
  const props = { ...p };

  if (props.selection !== "none" && props.selectedRowStyle === undefined) {
    props.selectedRowStyle = {
      backgroundColor: "#d3e9fb"
    };
  }

  if (props.selection === "detail" || props.selection === "single") {
    vlistProps.onItemSelected = (item: any) => {
      console.log(item);
      data.selected = [item[p.primaryKey]];
      if (p.onSelect) {
        p.onSelect(item, toJS(data.selected));
      }
    };
  } else {
    if (p.onSelect) {
      vlistProps.onItemSelected = (item: any) => {
        if (props.selection === "multi") {
          const idx = data.selected.indexOf(item[p.primaryKey]);
          if (idx >= 0) {
            data.selected.splice(idx, 1);
          } else {
            data.selected.push(item[p.primaryKey]);
          }
        }

        if (p.onSelect) {
          p.onSelect(item, toJS(data.selected));
        }
      };
    }
  }

  const xs: any = responsiveComponent(props, "xs", ref, vlistProps, data);
  const sm: any = responsiveComponent(props, "sm", ref, vlistProps, data);
  const md: any = responsiveComponent(props, "md", ref, vlistProps, data);
  const lg: any = responsiveComponent(props, "lg", ref, vlistProps, data);

  if (props.selection === "detail" && data.selected.length > 0) {
    const detailAttr: any = {
      pkval: data.selected.length > 0 ? data.selected[0] : null,
      items: props.items,
      pk: props.primaryKey,
      fields: props.fields,
      close: () => {
        data.selected = [];
      },
      style: props.detailStyle,
      ...props.detail
    };
    detailAttr.item = _.find(p.items, [detailAttr.pk, detailAttr.pkval]);

    const dcomp = _.get("props", "detail.component");
    if (dcomp) {
      console.log("if 1");
      dcomp(detailAttr);
    } else if (props.detailComponent) {
      console.log("if 2");
      props.detailComponent(detailAttr);
    } else {
      console.log("if 3");
      DetailComponent({ ...detailAttr });
    }
  }

  return (
    <View style={[{ flexDirection: "row", flex: 1 }, p.style]}>
      {/* <View style={{ flex: 1 }}> */}
      <Responsive xs={xs} sm={sm} md={md} lg={lg} />
      {/* </View> */}
    </View>
  );
});

function responsiveComponent(
  p: UIListProps,
  currentMode: string,
  ref: any,
  vlistProps: any,
  data: any
) {
  let mode: any = p.mode;
  // let rowAttributes = _.get(p, "rowAttributes", {});
  // const selection = _.get(p, "selection", "none");

  if (typeof mode === "object") {
    if (mode[currentMode]) {
      mode = mode[currentMode];
    } else {
      mode = mode[Object.keys(mode)[0]];
    }
  }

  // if (selection === "detail" || selection === "single") {
  //   rowAttributes.onPress = (_e: any, item: any) => {
  //     ref.current.selectItemKey(item[p.primaryKey]);
  //   };
  // }

  // if (rowAttributes.onPress) {
  //   const onPress = rowAttributes.onPress;
  //   rowAttributes.onPress = function(e: any) {
  //     onPress(e, this);
  //   };
  // }

  if (mode !== "list" && mode !== "table") {
    mode = isSize(["lg", "md"]) ? "table" : "list";
  }

  if (mode === "list") {
    const List = {
      maxHeight: get(p, "list.maxHeight") || get(p, "maxHeight"),
      itemHeight: get(p, "list.itemHeight") || get(p, "itemHeight"),
      wrapper: get(p, "list.wrapper", ListWrapper),
      items: get(p, "list.items", ListItems)
    };
    let rowStyle = {};
    if (p.selectedRowStyle) {
      rowStyle = (item: any) => {
        if (data.selected.indexOf(item[p.primaryKey]) >= 0) {
          return p.selectedRowStyle;
        }
        return {};
      };
    }

    return (
      <List.wrapper
        vlistRef={ref}
        items={p.items}
        primaryKey={p.primaryKey}
        renderItems={List.items}
        // rowAttributes={rowAttributes}
        itemHeight={List.itemHeight}
        fields={p.fields}
        vlistProps={vlistProps}
        maxHeight={List.maxHeight}
        rowStyle={rowStyle}
      />
    );
  } else {
    const Table: UIListTableProps = {
      ...p.table,
      itemHeight: get(p, "table.itemHeight") || get(p, "itemHeight"),
      wrapper: get(p, "table.wrapper", TableWrapper),
      items: get(p, "table.items", TableRows)
    };

    let rowStyle = {};
    if (p.selectedRowStyle) {
      rowStyle = (item: any) => {
        if (data.selected.indexOf(item[p.primaryKey]) >= 0) {
          return p.selectedRowStyle;
        }
        return {};
      };
    }

    return (
      <Table.wrapper
        vlistRef={ref}
        primaryKey={p.primaryKey}
        items={p.items}
        renderItems={Table.items}
        itemHeight={Table.itemHeight}
        onSort={Table.onSort}
        // rowAttributes={rowAttributes}
        hideUnlisted={Table.hideUnlisted}
        fields={_.mapValues(p.fields, item => {
          const label = _.get(item, `label`);
          if (label && !_.get(item, `table.header`))
            return {
              ...item,
              table: {
                header: label
              }
            };
          return item;
        })}
        vlistProps={vlistProps}
        rowStyle={rowStyle}
      />
    );
  }
}

export const sortColumns = (
  item: any,
  fields?: UIListFieldsProps,
  mode?: string,
  hideUnlisted?: boolean
) => {
  let sortedItemKeys = Object.keys(item);
  if (fields && Object.keys(fields).length > 0) {
    const fieldKeys = _(fields) //wrap object so that you can chain lodash methods
      .mapValues((value, id) => _.merge({}, value, { id })) //attach id to object
      .values() //get the values of the result
      .value() //unwrap array of objects
      .sort((a, b) => {
        if (a !== undefined && b !== undefined) {
          return (a.index || 0) + 9999 - ((b.index || 0) + 9999);
        }
        return 9999;
      });

    Object.keys(item).forEach(name => {
      if (fields[name] === undefined) {
        fieldKeys.push({ index: fieldKeys.length, id: name });
      }
    });

    sortedItemKeys = fieldKeys.map(f => f.id);

    if ((hideUnlisted === undefined && !!fields) || hideUnlisted === true) {
      if (fields !== undefined) {
        let colList = Object.keys(fields);

        let newSortedKeys: any[] = [];
        sortedItemKeys.forEach(i => {
          if (colList.indexOf(i) >= 0) {
            newSortedKeys.push(i);
          }
        });
        sortedItemKeys = newSortedKeys;
      }
    }
  }

  return sortedItemKeys.filter((i: string) => {
    const field = fields && fields[i];
    if (field) {
      let visible: any = true;
      if (mode === "table") visible = _.get(field, "visible");
      else if (mode === "list") visible = _.get(field, "list.visible");
      if (visible === false) {
        return false;
      }
    }
    return true;
  });
};
