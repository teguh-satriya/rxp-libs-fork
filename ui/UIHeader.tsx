import { MainStyle } from "@app/config";
import { RouteComponentProps, withRouter } from "@app/libs/router/Routing";
import React from "react";
import { Image, View } from "reactxp";
import { RouteState } from "../router/SwitchRoute";
import { uistyle } from "../utils/ConfigUtil";
import IconArrowLeft from "./Icons/IconArrowLeft";
import IconMenu from "./Icons/IconMenu";
import { isSize } from "./MediaQuery";
import { UIProps, windowHeight } from "./Styles/Style";
import UIButton from "./UIButton";
import UILoading from "./UILoading";
import UIText from "./UIText";

const pattern = MainStyle.pattern;

export interface UIHeaderProps extends RouteComponentProps<UIProps> {
  left?: any;
  center: any;
  right?: any;
  leftStyle?: any;
  centerStyle?: any;
  rightStyle?: any;
  style?: any;
  showSidebar?: any;
  ishowSide?: any;
  sidebar?: any;
  isBack?: any;
  isLoading?: boolean;
  onBackPress?: any;
  children?: any;
  pattern?: boolean;
  history: any;
}

interface HistoryProps extends RouteComponentProps {
  path?: any;
  onPress?: any;
  history: any;
}

const BackButton = withRouter(({ history, path, onPress }: HistoryProps) => {
  return (
    <UIButton
      size="compact"
      fill="clear"
      animation={false}
      onPress={
        onPress ||
        (() => {
          typeof path == "string" ? history.replace(path) : history.goBack();
        })
      }
    >
      <IconArrowLeft color={MainStyle.primaryColor} width={18} height={18} />
    </UIButton>
  );
});

export default withRouter((p: UIHeaderProps) => {
  let headerStyle = { ...uistyle("header.container"), ...p.style };
  let centerStyle = uistyle("header.center");
  let leftStyle = uistyle("header.left");
  let rightStyle = uistyle("header.right");

  let isRootPath =
    RouteState.rootPaths.indexOf(p.history.location.pathname) >= 0;
  let isBack = p.isBack == undefined ? !isRootPath : p.isBack;
  let ishowSide =
    p.ishowSide == undefined ? isSize(["xs", "sm", "md"]) : p.ishowSide;
  const stylePattern: any = {
    position: "absolute",
    width: "100%",
    height: (windowHeight * 35) / 100
  };

  return (
    <View
      style={{
        overflow: "visible"
      }}
    >
      {p.pattern && (
        <Image resizeMode="cover" source={pattern} style={stylePattern} />
      )}
      <View style={headerStyle}>
        <View style={leftStyle}>
          {ishowSide && (
            <UIButton
              size="compact"
              fill="clear"
              animation={false}
              onPress={() => {
                if (!!p.showSidebar) {
                  p.showSidebar(!p.sidebar);
                }
              }}
              style={{ margin: 0 }}
            >
              <IconMenu color={MainStyle.primaryColor} width={18} height={18} />
            </UIButton>
          )}
          {isBack && <BackButton path={p.isBack} onPress={p.onBackPress} />}
          {typeof p.left == "string" ? (
            <UIText size="large">{p.left}</UIText>
          ) : (
            p.left
          )}
        </View>
        <View style={centerStyle}>
          {typeof p.center == "string" ? (
            <UIText size="large">{p.center}</UIText>
          ) : (
            p.center
          )}
        </View>
        <View style={rightStyle}>
          {p.isLoading && <UILoading />}
          {typeof p.right == "string" ? (
            <UIText size="large">{p.right}</UIText>
          ) : (
            p.right
          )}
          {p.children}
        </View>
      </View>
    </View>
  );
});
