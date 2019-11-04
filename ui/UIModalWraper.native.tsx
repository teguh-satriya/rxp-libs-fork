import { MainStyle } from "@app/config";
import React from "react";
import { View } from "reactxp";
import IconTimes from "./Icons/IconTimes";
import { UIProps, windowWidth } from "./Styles/Style";
import UIButton from "./UIButton";
import UIText from "./UIText";

interface UIModalWraperProps extends UIProps {
  title?: string;
  close: () => void;
}

export default (p: UIModalWraperProps) => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#00000061",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <View
        style={{
          borderRadius: 6,
          borderWidth: 0,
          borderLeftWidth: 1,
          borderColor: "#ececeb",
          backgroundColor: "#fff",
          width: (windowWidth * 90) / 100,
          flex: 1,
          top: 0,
          bottom: 0,
          marginBottom: 20,
          marginTop: 20,
          ...p.style
        }}
      >
        {p.title && (
          <View
            style={{
              padding: 4,
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: MainStyle.backgroundColor
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                flex: 1,
                paddingLeft: 10
              }}
            >
              <UIText>{p.title}</UIText>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <UIButton
                fill="clear"
                size="small"
                color="primary"
                onPress={p.close}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  height: 40
                }}
              >
                <IconTimes width={18} height={18} />
              </UIButton>
            </View>
          </View>
        )}
        {p.children}
        {!p.title && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 0
            }}
          >
            <UIButton
              fill="clear"
              size="small"
              color="primary"
              onPress={p.close}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 40
              }}
            >
              <IconTimes width={18} height={18} />
            </UIButton>
          </View>
        )}
      </View>
    </View>
  );
};
