import React from "react";
import { Responsive } from "./MediaQuery";
import { UIProps } from "./Styles/Style";
import { MobileSidebar, DesktopSidebar } from "./UISidebarChild";

export interface UISidebarProps extends UIProps {
  sidebar: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

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
