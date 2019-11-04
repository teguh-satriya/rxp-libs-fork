import React from "react";
import IconStar from "./Icons/IconStar";
import { Button, View } from "reactxp";
import { UIProps } from "./Styles/Style";
import { MainStyle } from "@app/config";

interface UIRatingProps extends UIProps {
  size?: number;
  value: number;
  setValue?: (value: number) => void;
  color?: string;
  activeColor?: string;
  mode?: "view" | "input";
}

export default ({
  mode = "input",
  style,
  size = 18,
  value = 0,
  setValue,
  color = "#ccc",
  activeColor = MainStyle.primaryColor
}: UIRatingProps) => {
  const iStyle = {
    padding: 4,
    ...style
  };
  const modeView = mode == "view" ? true : false;

  return (
    <View>
      {modeView ? (
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View style={iStyle}>
            <IconStar
              color={value >= 1 ? activeColor : color}
              height={size}
              width={size}
            />
          </View>
          <View style={iStyle}>
            <IconStar
              color={value >= 2 ? activeColor : color}
              height={size}
              width={size}
            />
          </View>
          <View style={iStyle}>
            <IconStar
              color={value >= 3 ? activeColor : color}
              height={size}
              width={size}
            />
          </View>
          <View style={iStyle}>
            <IconStar
              color={value >= 4 ? activeColor : color}
              height={size}
              width={size}
            />
          </View>
          <View style={iStyle}>
            <IconStar
              color={value == 5 ? activeColor : color}
              height={size}
              width={size}
            />
          </View>
        </View>
      ) : (
        <InputRating
          size={size}
          iStyle={iStyle}
          setValue={setValue}
          value={value}
          activeColor={activeColor}
          color={color}
        />
      )}
    </View>
  );
};

const InputRating = ({
  iStyle,
  setValue,
  value,
  activeColor,
  color,
  size
}: any) => {
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      <Button
        style={iStyle}
        onPress={() => {
          setValue(1);
        }}
      >
        <IconStar
          color={value >= 1 ? activeColor : color}
          height={size}
          width={size}
        />
      </Button>
      <Button
        style={iStyle}
        onPress={() => {
          setValue(2);
        }}
      >
        <IconStar
          color={value >= 2 ? activeColor : color}
          height={size}
          width={size}
        />
      </Button>
      <Button
        style={iStyle}
        onPress={() => {
          setValue(3);
        }}
      >
        <IconStar
          color={value >= 3 ? activeColor : color}
          height={size}
          width={size}
        />
      </Button>
      <Button
        style={iStyle}
        onPress={() => {
          setValue(4);
        }}
      >
        <IconStar
          color={value >= 4 ? activeColor : color}
          height={size}
          width={size}
        />
      </Button>
      <Button
        style={iStyle}
        onPress={() => {
          setValue(5);
        }}
      >
        <IconStar
          color={value == 5 ? activeColor : color}
          height={size}
          width={size}
        />
      </Button>
    </View>
  );
};
