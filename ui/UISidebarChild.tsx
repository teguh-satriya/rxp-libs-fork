import { MainStyle } from "@app/config";
import get from "lodash/get";
import React, { useEffect, useRef, useState } from "react";
import { Animated, GestureView, Styles, View } from "reactxp";
import { UISidebarProps } from "./UISidebar";

const slideValue = Animated.createValue(0);
const slideStyle: any = Styles.createAnimatedViewStyle({
  transform: [
    {
      translateX: slideValue
    }
  ]
});

export const MobileSidebar = (p: UISidebarProps) => {
  let lastVisible = useRef(p.visible);
  let slideTimeout = 0;
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    p.setVisible(false);
    slideValue.setValue(p.visible ? 0 : -1 * p.style.width);
  }, []);

  if (!get(p, "style.width")) {
    p.style = {
      ...p.style,
      width: 300
    };
  }
  useEffect(() => {
    slideAnimation(lastVisible, setHidden, p);
  }, [p.visible]);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: MainStyle.backgroundColor
      }}
    >
      <View style={{ flex: 1 }}>{p.children}</View>
      {!hidden && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
        >
          <GestureView
            style={{
              backgroundColor: "#00000034",
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }}
            onTap={() => {
              // setHidden(true);
              p.setVisible(false);
            }}
            onPan={(v: any) => {
              if (slideTimeout) {
                clearTimeout(slideTimeout);
              }
              slideValue.setValue(
                Math.min(0, (v.initialClientX - v.clientX) * -1)
              );

              slideTimeout = setTimeout(() => {
                setHidden(true);
                p.setVisible(false);
              }, 100);
            }}
          />
          <Animated.View
            style={{
              ...slideStyle,
              ...{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              },
              ...p.style
            }}
          >
            {p.sidebar}
          </Animated.View>
        </View>
        // </GestureView>
      )}
    </View>
  );
};

export const DesktopSidebar = (p: UISidebarProps) => {
  let lastVisible = useRef(p.visible);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    p.setVisible(true);
    slideValue.setValue(p.visible ? 0 : -1 * p.style.width);
  }, []);

  if (!get(p, "style.width")) {
    p.style = {
      ...p.style,
      width: 300
    };
  }
  useEffect(() => {
    slideAnimation(lastVisible, setHidden, p);
  }, [p.visible]);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row"
      }}
    >
      {!hidden && <View style={{ ...p.style }}>{p.sidebar}</View>}
      <Animated.View
        style={{
          ...slideStyle,
          flex: 1,
          backgroundColor: MainStyle.backgroundColor
        }}
      >
        {p.children}
      </Animated.View>
    </View>
  );
};

const slideAnimation = (lastVisible: any, setHidden: any, p: any) => {
  const slideIn = Animated.timing(slideValue, {
    toValue: 0,
    duration: 200,
    easing: Animated.Easing.In()
  });

  const slideOut = Animated.timing(slideValue, {
    toValue: -1 * p.style.width,
    duration: 200,
    easing: Animated.Easing.Out()
  });

  if (lastVisible.current === false && p.visible === true) {
    setHidden(false);
    slideValue.setValue(-1 * p.style.width);
    setTimeout(() => {
      slideIn.start();
    });
  } else if (lastVisible.current === true && p.visible === false) {
    slideValue.setValue(0);
    slideOut.start(() => {
      slideValue.setValue(0);
      setHidden(true);
    });
  }
  lastVisible.current = p.visible;
  return {
    slideOut,
    slideIn
  };
};
