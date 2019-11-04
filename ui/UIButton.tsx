import React, { useRef } from "react";
import { Animated, Styles } from "reactxp";
import { uistyle } from "../utils/ConfigUtil";
import { UIProps } from "./Styles/Style";
import UIText from "./UIText";

export interface UIButtonProps extends UIProps {
  color?: "success" | "danger" | "warning" | "primary" | "secondary" | string;
  fill?: "solid" | "outline" | "clear";
  size?: "medium" | "small" | "compact" | "large";
  labelColor?: string;
  animation?: boolean;
  onPress?: () => void;
  attr?: any;
}

export default ({
  color = "primary",
  size = "medium",
  fill = "solid",
  animation = true,
  labelColor,
  onPress,
  children,
  style,
  attr
}: UIButtonProps) => {
  const animating = useRef(false as any);
  const fadeValue = useRef(Animated.createValue(1.0));
  const fadeIn = useRef(
    Animated.timing(fadeValue.current, {
      toValue: 1.0,
      duration: 200,
      easing: Animated.Easing.In()
    })
  );
  let labelTextSize = size === "compact" ? "medium" : size;

  let labelSize = {
    ...uistyle(`text.${labelTextSize}`),
    ...uistyle(`text.center`),
    ...uistyle(`button.label`)
  };

  let btnSize = {
    ...uistyle(`button.size`),
    ...uistyle(`button.size.${size}`)
  };
  let btnColor = uistyle(`button.color.${color}`) || {
    backgroundColor: color,
    borderColor: color
  };
  let btnFill = {
    ...uistyle(`button.fill`),
    ...uistyle(`button.fill.${fill}`)
  };
  let labelFill = fill != "solid" ? uistyle(`button.label.${color}`) : {};
  labelColor && (labelFill.color = labelColor);

  if (fill === "clear") {
    if (!labelFill) labelFill = {};
    labelFill.color = color;
  }
  return (
    <Animated.View
      {...attr}
      style={Styles.createAnimatedViewStyle({
        ...btnSize,
        ...btnColor,
        ...btnFill,
        opacity: fadeValue.current,
        ...style,
      })}
      onPress={() => {
        if (onPress) {
          onPress();
        }
        if (animation) {
          if (!animating.current) {
            animating.current = true;
            fadeValue.current.setValue(0.5);
            setTimeout(() => {
              fadeIn.current.start(() => {
                animating.current = false;
              });
            });
          }
        }
      }}
    >
      {typeof children === "string" ? (
        <UIText style={{ ...labelSize, ...labelFill }}>{children}</UIText>
      ) : Array.isArray(children) ? (
        children.map((item, key) => {
          return typeof item === "string" ? (
            <UIText key={key} style={[labelSize, labelFill]}>
              {item}
            </UIText>
          ) : (
              item
            );
        })
      ) : (
            children
          )}
    </Animated.View>
  );
};
