import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({
  color = "black",
  width = 24,
  height = 24,
  style = {}
}: any) => {
  return (
    <ImageSvg width={width} height={height} style={style} viewBox="0 0 450 512">
      <SvgPath
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
