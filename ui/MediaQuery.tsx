import { observer } from "mobx-react-lite";
import { UserInterface } from "reactxp";
import { Window } from "../utils/Window";
import { UIProps } from "./Styles/Style";

let measureStarted = false;
if (!measureStarted) {
  const resizeWindow = () => {
    const measure = UserInterface.measureWindow();
    Window.setSize(measure.width, measure.height);
  };
  resizeWindow();
  window.addEventListener("resize", resizeWindow);
  measureStarted = true;
}

interface MediaQueryProps extends UIProps {
  minWidth?: number;
  maxWidth?: number;
}

interface ResponsiveProps extends UIProps {
  xs: any;
  sm: any;
  md: any;
  lg: any;
}

export const isSize = (size: string[]) => {
  const measure = UserInterface.measureWindow();
  const width = measure.width;

  if (width <= 410) {
    return size.indexOf("xs") >= 0;
  } else if (width >= 411 && width <= 567) {
    return size.indexOf("xs") >= 0;
  } else if (width >= 568 && width <= 767) {
    return size.indexOf("sm") >= 0;
  } else if (width >= 768 && width <= 1023) {
    return size.indexOf("md") >= 0;
  } else if (width >= 1024 && width <= 1279) {
    return size.indexOf("md") >= 0;
  } else if (width >= 1280) {
    return size.indexOf("lg") >= 0;
  }

  return false;
};

export const MediaQuery = observer(
  ({ minWidth, maxWidth, children }: MediaQueryProps) => {
    const width = Window.width;
    if (minWidth && maxWidth && width >= minWidth && width < maxWidth)
      return children;
    if (minWidth && width >= minWidth) return children;
    if (maxWidth && width < maxWidth) return children;
    return null;
  }
);
export const Responsive = observer(
  ({ xs = null, sm = null, md = null, lg = null }: ResponsiveProps) => {
    const width = Window.width;

    if (width <= 410) {
      return xs || sm || md || lg || null;
    } else if (width >= 411 && width <= 567) {
      return xs || sm || md || lg || null;
    } else if (width >= 568 && width <= 767) {
      return sm || xs || md || lg || null;
    } else if (width >= 768 && width <= 1023) {
      return md || sm || xs || lg || null;
    } else if (width >= 1024 && width <= 1279) {
      return md || sm || xs || lg || null;
    } else if (width >= 1280) {
      return lg || md || sm || xs || null;
    }

    return null;
  }
);
