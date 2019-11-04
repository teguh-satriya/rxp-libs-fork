import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({ color = "black", width = 24, height = 24, style = {} }: any) => {
  return (
    <ImageSvg width={width} height={height} style={style}>
      <SvgPath
        d="M4.5 20.79L12 2.5l7.5 18.29-.71.71-6.79-3-6.79 3-.71-.71zm11.78-2.59L12 7.77 7.72 18.2l3.47-1.53.81-.36.81.36 3.47 1.53z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
