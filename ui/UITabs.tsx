import { MainStyle } from "@app/config";
import React, { useState } from "react";
import { View } from "reactxp";
import UIText from "./UIText";

interface UITabsProps {
  tabs: Array<{
    label: any;
    content: any;
    action?: any;
  }>;
  style?: any;
  position?: "before" | "after";
  orientation?: "vertical" | "horizontal";
  action?: any;
}

const VContent = ({ tabs, activeIdx }: any) => {
  return (
    <View style={{}}>
      {typeof tabs[activeIdx].content === "function"
        ? tabs[activeIdx].content()
        : tabs[activeIdx].content}
    </View>
  );
};

export default ({
  tabs,
  style,
  position = "before",
  orientation = "horizontal"
}: UITabsProps) => {
  const [activeIdx, changeTab] = useState(0);

  let hStyle = {
    alignItems: "center",
    ...style
  };

  return (
    <View
      style={
        orientation === "vertical"
          ? { flex: 1, flexDirection: "row", ...style }
          : { ...style }
      }
    >
      {position === "after" && <VContent tabs={tabs} activeIdx={activeIdx} />}
      <View>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            marginTop: 47,
            borderWidth: 0,
            borderBottomWidth: 2,
            borderColor: "#ccc"
          }}
        />
        <View
          style={[
            {
              flex: 1,
              flexDirection: "row"
            }
          ]}
        >
          <View
            style={[
              hStyle,
              orientation === "horizontal" && {
                flex: 1,
                flexDirection: "row"
              }
            ]}
          >
            {tabs.map((t, i) => {
              return (
                <View
                  key={i}
                  style={[
                    {
                      padding: 10,
                      paddingBottom: 14,
                      cursor: "pointer",
                      borderWidth: 0
                    },
                    i === 0 ? { paddingLeft: 0 } : {},
                    activeIdx === i
                      ? {
                          borderBottomWidth: 2,
                          borderColor: MainStyle.color
                        }
                      : {
                          paddingBottom: 16
                        }
                  ]}
                  onPress={() => changeTab(i)}
                >
                  {typeof t.label === "string" && (
                    <UIText
                      style={[
                        {
                          fontSize: 15,
                          color: "#777",
                          fontWeight: 400
                        },
                        activeIdx === i
                          ? {
                              color: MainStyle.color
                            }
                          : {}
                      ]}
                    >
                      {t.label}
                    </UIText>
                  )}
                  {typeof t.label !== "string" && t.label()}
                </View>
              );
            })}
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {!!tabs[activeIdx].action && tabs[activeIdx].action}
          </View>
        </View>
      </View>

      {position === "before" && <VContent tabs={tabs} activeIdx={activeIdx} />}
    </View>
  );
};
