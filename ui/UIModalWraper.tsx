import { MainStyle } from "@app/config";
import React from "react";
import { View } from "reactxp";
import { isSize } from "./MediaQuery";
import { UIProps, windowHeight, windowWidth } from "./Styles/Style";
import UIButton from "./UIButton";
import UIText from "./UIText";
import IconTimes from "./Icons/IconTimes";

interface UIModalWraperProps extends UIProps {
  title?: string;
  close: () => void;
}

export default (p: UIModalWraperProps) => {
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "absolute",
        backgroundColor: "#00000061",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          borderRadius: 6,
          borderWidth: 0,
          borderLeftWidth: 1,
          borderColor: "#ececeb",
          backgroundColor: "#fff",
          minHeight: isSize(["md", "lg"]) ? 400 : (windowHeight * 40) / 100,
          maxHeight: isSize(["md", "lg"])
            ? (windowHeight * 70) / 100
            : (windowHeight * 90) / 100,
          minWidth: isSize(["md", "lg"]) ? 600 : (windowWidth * 90) / 100,
          maxWidth: isSize(["md", "lg"])
            ? (windowWidth * 50) / 100
            : (windowWidth * 90) / 100,
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
                  height: 40,
                  margin: 0
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
                height: 40,
                margin: 0
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
