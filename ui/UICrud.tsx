import { MainStyle } from "@app/config";
import _ from "lodash";
import { observable, toJS } from "mobx";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Alert, TextInput, View } from "reactxp";
import createRecord from "../gql/data/createRecord";
import deleteRecord from "../gql/data/deleteRecord";
import rawQuery from "../gql/data/rawQuery";
import updateRecord from "../gql/data/updateRecord";
import { wildcardToRegExp } from "../utils/Helper";
import IconAdd from "./Icons/IconAdd";
import IconCheck from "./Icons/IconCheck";
import IconChevronLeft from "./Icons/IconChevronLeft";
import IconChevronRight from "./Icons/IconChevronRight";
import IconPlus from "./Icons/IconPlus";
import IconSave from "./Icons/IconSave";
import IconTrash from "./Icons/IconTrash";
import IconWarning from "./Icons/IconWarning";
import { isSize } from "./MediaQuery";
import { UIProps } from "./Styles/Style";
import UIBody from "./UIBody";
import UIButton from "./UIButton";
import UIContainer from "./UIContainer";
import UIHeader from "./UIHeader";
import UIJsonField, { UIJsonFieldSingleProps } from "./UIJsonField";
import UIList, { UIListFieldsProps } from "./UIList";
import UILoading from "./UILoading";
import UIRow from "./UIRow";
import UIText from "./UIText";

interface UICrudAction {}
interface UICrudListOrder {
  [key: string]:
    | "asc"
    | "asc_nulls_first"
    | "asc_nulls_last"
    | "desc"
    | "desc_nulls_first"
    | "desc_nulls_last";
}
export interface UICrudProps extends RouteComponentProps, UIProps {
  title?: string;
  table: string;
  primaryKey?: string;
  fields: UIJsonFieldSingleProps[];
  headerProps?: {};
  id?: any;
  componentId?: string;
  columns?:
    | {
        list?: string[];
        detail?: string[];
      }
    | string[];
  actions?: (string | UICrudAction)[];
  list?: {
    order?: UICrudListOrder | UICrudListOrder[];
  };
  data?: {
    list?: (data: any) => Promise<any>;
    detail?: (id: any, data: any) => Promise<any>;
    save?: (detail: any) => Promise<any>;
    delete?: (detail: any) => Promise<any>;
    beforeSave?: (detail: object) => object;
    afterLoad?: (data: object) => object;
    findIndex?: (id: any) => Promise<number>;
  };
}

const crudCache = observable({
  path: "",
  ids: {} as any
});

export default withRouter(
  observer((p: UICrudProps) => {
    const pk = _.get(p, "primaryKey", "id");
    const actions = _.get(p, "actions", ["create", "update", "delete"]);
    const headerProps: any = useObservable(
      _.get(p, "headerProps", {
        isBack: false,
        sidebar: false,
        onBackPress: async () => {
          data.id = null;
          data.errors = {};
          data.list = await loadList();
        }
      })
    );

    let listCols = _.clone(p.columns) || [];
    if (!Array.isArray(listCols) && listCols) {
      listCols = listCols.list || [];
    }
    let listFields = convertToListField(p.fields, listCols);

    const allListFields = convertToListField(p.fields);
    const allColsFromFields = _.keys(allListFields).filter(i => i !== pk);
    let detailCols = _.clone(p.columns) || [];
    if (detailCols) {
      if (!Array.isArray(detailCols)) {
        detailCols = detailCols.detail || [];
      } else {
        detailCols = allColsFromFields;
      }
    } else {
      detailCols = allColsFromFields;
    }
    const data = useObservable({
      list: [] as any[],
      id: p.id,
      index: -1,
      saving: false,
      saved: false,
      loading: true,
      deleting: false,
      errors: {} as any,
      detail: {} as any
    });
    const loadList =
      _.get(p, "data.list") ||
      (async (_data: any) => {
        let params = "";
        let order = _.get(p, "list.order");
        if (order) {
          order = `order_by:${JSON.stringify(order).replace(/['"]+/g, "")}`;
          params = order;
        }

        if (params !== "") {
          params = `(${params})`;
        }

        let query = `{
        ${p.table}${params} {
            ${pk}
            ${(listCols as any).join("\n")}
        }
    }`;
        const list = await rawQuery(query);
        const result = _.get(list, p.table) || [];
        const afterLoad = _.get(p, "data.afterLoad");
        if (afterLoad) {
          const res = _.map(result, i => {
            return afterLoad(i);
          });
          return res;
        }
        return result;
      });
    const saveDetail =
      _.get(p, "data.save") ||
      (async (detail: any) => {
        let newdata: any = _.omit(detail, [pk]);
        const beforeSave = _.get(p, "data.beforeSave");

        if (beforeSave) {
          newdata = beforeSave(newdata);
        }

        if (!detail[pk]) {
          let id = await createRecord(p.table, newdata);
          newdata[pk] = id;
        } else {
          await updateRecord(p.table, { ...newdata, [pk]: detail[pk] });
          newdata[pk] = detail[pk];
        }

        const afterLoad = _.get(p, "data.afterLoad");
        if (afterLoad) return afterLoad(newdata);
        return newdata;
      });
    const deleteDetail =
      _.get(p, "data.delete") ||
      (async (detail: any) => {
        if (detail[pk]) {
          await deleteRecord(p.table, detail, {
            primaryKey: pk
          });
        }
      });
    const loadDetail =
      _.get(p, "data.detail") ||
      (async (id: any, _data: any) => {
        let query = `{
            ${p.table}(where: { ${pk}: {_eq: ${id}}}) {
                ${pk}
                ${(detailCols as any)
                  .filter((v: string) => v.indexOf("*") < 0)
                  .join("\n")}
            }
        }`;
        let list = await rawQuery(query);
        const afterLoad = _.get(p, "data.afterLoad");
        const result = _.get(list, `${p.table}.0`) || {};
        if (afterLoad) {
          return afterLoad(result);
        }
        return result;
      });
    useEffect(() => {
      (async () => {
        if (data.id) {
          if (data.saved) {
            data.list.push(data.detail);
            data.index = data.list.length - 1;
            setTimeout(() => {
              data.saved = false;
            }, 3000);
          }

          if (data.deleting) {
            return;
          }

          headerProps.isBack = true;
          const id = typeof data.id === "string" ? `"${data.id}"` : data.id;
          data.errors = {};
          if (data.id !== data.detail[pk]) {
            data.detail =
              _.find(data.list, (i: any) => i[pk] === data.id) || {};
          }

          data.detail = await loadDetail(id, data);
          data.loading = false;
        } else {
          data.detail = {};
          headerProps.isBack = false;
        }
      })();
    }, [data.id]);

    useEffect(() => {
      let cache = undefined;
      if (crudCache.path === p.history.location.pathname) {
        cache = crudCache.ids[p.componentId || "default"];
      } else {
        crudCache.path = p.history.location.pathname;
        crudCache.ids = {};
      }

      if (cache) {
        _.each(cache, (item, k) => {
          (data as any)[k as any] = item;
        });
      }

      (async () => {
        if (data.deleting) {
          await deleteDetail(data.detail);

          data.list = await loadList();
          if (data.index < data.list.length && !!data.list[data.index])
            data.id = data.list[data.index][pk];
          else if (data.index > data.list.length - 1 && data.list.length > 0) {
            data.index = data.list.length - 1;
            data.id = data.list[data.index][pk];
          } else {
            data.id = undefined;
          }

          data.deleting = false;
          if (!data.id) {
            data.index = -1;
            data.detail = {};
          } else {
            data.detail = data.list[data.index];
          }
        } else {
          data.list = await loadList(data);
          data.loading = false;
        }
      })();

      return () => {
        crudCache.ids[p.componentId || "default"] = toJS(data);
      };
    }, []);

    const loading = (
      <View
        style={{ margin: 100, flexDirection: "row", justifyContent: "center" }}
      >
        <UILoading />
      </View>
    );

    const detailPagerComponent = (data.id === "__new__" ||
      (data.index >= 0 && data.list.length > 0 && !!data.id)) && (
      <UIRow
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
          borderWidth: 1,
          marginLeft: 0,
          marginRight: isSize(["xs", "sm"]) ? 0 : 10,
          marginBottom: isSize(["xs", "sm"]) ? 20 : 0,
          borderRadius: 3,
          borderColor: "#999",
          backgroundColor: "#fff"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <UIButton
            fill="clear"
            size="compact"
            style={{
              margin: 0,
              height: 28,
              borderWidth: 0
            }}
            onPress={() => {
              if (data.index > 0) {
                data.index -= 1;
                data.id = data.list[data.index][pk];
              }
            }}
          >
            <IconChevronLeft
              width={14}
              height={14}
              color={
                data.index === 0 || data.id === "__new__" ? "#ececeb" : "#999"
              }
            />
            <UIText
              style={{
                color:
                  data.index === 0 || data.id === "__new__"
                    ? "#ececeb"
                    : "#999",
                marginLeft: 5,
                fontSize: 14
              }}
            >
              Prev
            </UIText>
          </UIButton>
          <TextInput
            value={(data.index + 1).toString()}
            style={{
              color: "#777",
              fontSize: 14,
              borderWidth: 0,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: "#ccc",
              textAlign: "center",
              height: 28,
              width: 38
            }}
          />
          <UIButton
            fill="clear"
            size="compact"
            style={{
              margin: 0,
              borderWidth: 0,
              borderRadius: 0,
              borderRightWidth: 1,
              height: 28,
              borderColor: "#ccc"
            }}
            onPress={() => {
              if (data.index < data.list.length - 1) {
                data.index += 1;
                data.id = data.list[data.index][pk];
              }
            }}
          >
            <UIText
              style={{
                color: data.index < data.list.length - 1 ? "#999" : "#ececeb",
                marginRight: 5,
                fontSize: 14
              }}
            >
              Next
            </UIText>
            <IconChevronRight
              width={14}
              height={14}
              color={data.index < data.list.length - 1 ? "#999" : "#ececeb"}
            />
          </UIButton>
        </View>

        {data.id !== "__new__" && actions.indexOf("create") >= 0 && (
          <UIButton
            fill="clear"
            size="compact"
            style={{
              margin: 0,
              height: 28,
              alignItems: "center",
              paddingLeft: 8,
              borderWidth: 0,
              borderRadius: 0,
              borderLeftWidth: isSize(["xs", "sm"]) ? 1 : 0,
              borderColor: "#ccc"
            }}
            onPress={() => {
              data.id = "__new__";
              data.index = -1;
              data.detail = {};
            }}
          >
            <IconPlus
              width={18}
              height={18}
              style={{ marginTop: 2, marginRight: -2 }}
              color={"#999"}
            />

            {isSize(["xs", "sm"]) && (
              <UIText
                style={{
                  color: "#999",
                  marginLeft: 5,
                  fontSize: 14
                }}
              >
                Create
              </UIText>
            )}
          </UIButton>
        )}
      </UIRow>
    );

    const actionsComponent = (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isSize(["md", "lg"]) && detailPagerComponent}
        {data.id ? (
          <View style={{ flexDirection: "row" }}>
            {data.id !== "__new__" && actions.indexOf("delete") >= 0 && (
              <BtnDelete
                showText={actions.indexOf("update") < 0 || data.deleting}
                deleting={data.deleting}
                onPress={() => {
                  Alert.show(
                    "Delete Data",
                    "Are you sure want to delete this data ?",
                    [
                      {
                        text: "Yes",
                        onPress: async () => {
                          if (!data.deleting) {
                            // this will trigger data.id update,
                            // and then somehow make UICrud component unmounted,
                            // and then remounted again...
                            // so it make sense when we put deletion login after remounted
                            data.deleting = true;
                          }
                        }
                      },
                      {
                        text: "No",
                        style: "cancel"
                      }
                    ]
                  );
                }}
              />
            )}
            {!data.deleting &&
              (actions.indexOf("create") >= 0 ||
                actions.indexOf("update") >= 0) && (
                <BtnSave
                  saved={data.saved}
                  onPress={async () => {
                    if (!data.saving) {
                      data.saved = false;
                      data.saving = true;
                      data.errors = {};
                      try {
                        let res = await saveDetail(data.detail);
                        data.saved = true;
                        data.saving = false;
                        data.id = res[pk];
                      } catch (e) {
                        data.saving = false;
                        data.errors._all = `Please fix the following input errors:\n`;
                        const errors = _.clone(e).filter((item: any) => {
                          const key = extractFirstText(item.message || "");
                          switch (_.get(item, "extensions.code")) {
                            case "constraint-violation":
                              if (key) {
                                data.errors[key] = `This field is required`;
                                data.errors._all += ` • ${
                                  listFields[key].label
                                }: ${data.errors[key]}\n`;
                                return false;
                              }
                              break;
                          }
                          return true;
                        });
                        _.each(errors, item => {
                          data.errors._all += item.message;
                        });
                        data.errors._all = data.errors._all.trim();
                      }
                    }
                  }}
                  saving={data.saving}
                />
              )}
          </View>
        ) : (
          actions.indexOf("create") >= 0 && (
            <BtnCreate
              onPress={() => {
                data.id = "__new__";
                data.index = -1;
                data.detail = {};
              }}
            />
          )
        )}
      </View>
    );

    const titlePrefix =
      data.id === "__new__" ? "Create " : !!data.id ? "Detail " : "";
    return (
      <UIContainer>
        <UIHeader
          {...headerProps}
          style={{
            ...headerProps.style,
            ...{
              paddingLeft: isSize(["xs", "sm"]) ? 0 : 25,
              paddingRight: isSize(["xs", "sm"]) ? 0 : 25
            }
          }}
          center={titlePrefix + (p.title || _.upperFirst(p.table))}
        >
          {actionsComponent}
        </UIHeader>
        <UIBody
          scroll={true}
          padding={isSize(["md", "lg"])}
          style={{
            paddingLeft: isSize(["xs", "sm"]) ? 10 : 25,
            paddingRight: isSize(["xs", "sm"]) ? 10 : 25
          }}
        >
          {data.errors._all && (
            <View
              style={{
                borderColor: MainStyle.errorColor,
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
                marginTop: -10,
                marginLeft: 20,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <IconWarning
                color={MainStyle.errorColor}
                width={42}
                height={42}
                style={{ marginLeft: 5 }}
              />
              <UIText
                style={{
                  color: MainStyle.errorColor,
                  paddingLeft: 10,
                  lineHeight: 2,
                  fontSize: 14
                }}
              >
                {data.errors._all}
              </UIText>
            </View>
          )}

          {isSize(["xs", "sm"]) && detailPagerComponent}

          {data.loading ? (
            loading
          ) : !!data.id ? (
            <UIJsonField
              items={data.detail}
              field={_(p.fields)
                .filter(
                  v =>
                    !v.key ||
                    !!v.value ||
                    !!_.find(detailCols, o => {
                      return wildcardToRegExp(o).test(v.key || "");
                    })
                )
                .map(item => {
                  if (Array.isArray(item.value)) {
                    return {
                      ...item,
                      value: _(item.value)
                        .filter(
                          v =>
                            !v.key ||
                            !!v.value ||
                            !!_.find(detailCols, o => {
                              return wildcardToRegExp(o).test(v.key || "");
                            })
                        )
                        .map(v => {
                          return modifySingleField(v, data);
                        })
                        .value()
                    };
                  } else {
                    return modifySingleField(item, data);
                  }
                })
                .value()}
              setValue={(value: any, key: any) => {
                data.detail[key] = value;
              }}
            />
          ) : (
            <UIList
              style={{ flex: 1 }}
              selection="single"
              onSelect={item => {
                data.loading = true;
                data.errors = {};
                data.detail = item;
                data.id = item[pk];
                data.index = _.findIndex(
                  data.list,
                  (i: any) => i[pk] === item[pk]
                );
              }}
              items={data.list}
              primaryKey={pk}
              fields={listFields}
            />
          )}
        </UIBody>
      </UIContainer>
    );
  })
);

const BtnCreate = ({ onPress, style }: any) => {
  return (
    <UIButton
      size="small"
      color="primary"
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 45,
        ...style
      }}
    >
      <IconAdd
        color="#fff"
        height={20}
        width={20}
        style={{
          marginLeft: 0,
          marginRight: isSize(["md", "lg"]) ? 0 : -5,
          marginTop: 0
        }}
      />
      {isSize(["md", "lg"]) && (
        <UIText style={{ color: "#fff" }} size="small">
          {" Create"}
        </UIText>
      )}
    </UIButton>
  );
};

const BtnDelete = ({
  onPress,
  deleting = false,
  style,
  showText = false
}: any) => {
  return (
    <UIButton
      size="small"
      color="error"
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: isSize(["xs", "sm"]) ? 0 : 5,
        height: 45,
        ...style
      }}
    >
      <IconTrash
        color="#fff"
        height={18}
        width={18}
        style={{ marginLeft: 0, marginRight: showText ? 5 : 0, marginTop: 3 }}
      />
      {isSize(["md", "lg"]) && showText && (
        <UIText style={{ color: "#fff" }} size="small">
          {deleting ? "Deleting..." : "Delete"}
        </UIText>
      )}
    </UIButton>
  );
};

const BtnSave = ({ saved = false, onPress, saving = false, style }: any) => {
  return (
    <UIButton
      size="small"
      color={saved ? "success" : "primary"}
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 45,
        ...style
      }}
    >
      {saved ? (
        <IconCheck
          color="#fff"
          height={18}
          width={18}
          style={{
            marginLeft: 0,
            marginRight: isSize(["md", "lg"]) ? 5 : 0,
            marginTop: 0
          }}
        />
      ) : (
        <IconSave
          color="#fff"
          height={18}
          width={18}
          style={{
            marginLeft: 0,
            marginRight: isSize(["md", "lg"]) ? 10 : 0,
            marginTop: 0
          }}
        />
      )}
      {isSize(["md", "lg"]) && (
        <UIText style={{ color: "#fff" }} size="small">
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </UIText>
      )}
    </UIButton>
  );
};

const modifySingleField = (v: any, data: any) => {
  if (v.type === "dropdown" || v.type === "select") {
    v.options = {
      ...v.options,
      value: data.detail[v.key as any]
    };
  }

  if (data.errors[v.key as any]) {
    v.options = {
      ...v.options,
      color: "error",
      fieldProps: {
        sublabel: data.errors[v.key as any]
      }
    };
  } else {
    v.options = _.omit(v.options, ["color", "fieldProps"]);
  }
  return v;
};

const extractFirstText = (str: string) => {
  const matches = str.match(/"(.*?)"/);
  return matches ? matches[1] : str;
};

const convertToListField = (
  field: UIJsonFieldSingleProps[],
  cols?: any
): UIListFieldsProps => {
  let result: any = {};
  let hasTitle = false;
  if (Array.isArray(_.get(field, "0.value"))) {
    hasTitle = true;
  }
  let idx = 0;
  if (hasTitle) {
    _.each(field, item => {
      _.each(item.value as any, f => {
        if (!cols || ((cols && cols.length === 0) || cols.indexOf(f.key) >= 0))
          result[f.key] = {
            index: idx++,
            label: f.label || f.key
          };
      });
    });
  } else {
    _.each(field as any, f => {
      if (!cols || ((cols && cols.length === 0) || cols.indexOf(f.key) >= 0))
        result[f.key] = {
          index: idx++,
          label: f.label || f.key
        };
    });
  }

  return result;
};
