import React from "react";
import { Responsive } from "./MediaQuery";
import { UIProps } from "./Styles/Style";
import { DesktopSidebar } from "./UISidebarChild";
import SideMenu from "react-native-side-menu";
import { Animated } from "react-native";

export interface UISidebarProps extends UIProps {
  sidebar: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const MobileSidebar = (p: UISidebarProps) => {
  return (
    <SideMenu
      animationFunction={(prop: any, value: number) =>
        Animated.spring(prop, {
          toValue: value,
          friction: 8,
          useNativeDriver: true
        })
      }
      bounceBackOnOverdraw={false}
      menu={p.sidebar}
      isOpen={p.visible}
      onChange={p.setVisible}
    >
      {p.children}
    </SideMenu>
  );
};

export default (props: UISidebarProps) => {
  return (
    <Responsive
      xs={<MobileSidebar {...props} />}
      sm={<MobileSidebar {...props} />}
      md={<MobileSidebar {...props} />}
      lg={<DesktopSidebar {...props} />}
    />
  );
};
