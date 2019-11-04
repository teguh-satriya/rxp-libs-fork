import { UIProps } from "./Styles/Style";
import React from "react";
import { observer, useObservable } from "mobx-react-lite";

interface UIGradientProps extends UIProps {
  colors: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  angleCenter?: { x: number; y: number };
  angle?: number;
}

export default observer((p: UIGradientProps) => {
  const props = {
    start: {
      x: 0.5,
      y: 0
    },
    end: {
      x: 0.5,
      y: 1
    },
    locations: [],
    colors: [],
    ...p
  };
  const state = useObservable({
    width: 1,
    height: 1
  });

  const getAngle = () => {
    if (typeof props.angle === "number") {
      return (props.angle * Math.PI) / 180 + "rad";
    }
    // Math.atan2 handles Infinity
    const angle =
      Math.atan2(
        state.width * (props.end.y - props.start.y),
        state.height * (props.end.x - props.start.x)
      ) +
      Math.PI / 2;
    return angle + "rad";
  };

  const getColors = () =>
    props.colors
      .map((color, index) => {
        const location = props.locations[index];
        let locationStyle = "";
        if (location) {
          locationStyle = " " + location * 100 + "%";
        }
        return color + locationStyle;
      })
      .join(",");

  props.style = {
    ...{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start"
    },
    ...props.style,
    backgroundImage: `linear-gradient(${getAngle()},${getColors()})`
  };

  return <div {...props} />;
});
