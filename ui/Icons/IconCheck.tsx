import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";

export default ({ color = "black", width = 32, height = 32, style }: any) => {
  return (
    <ImageSvg height={height} width={width} style={style} viewBox="0 0 612 512">
      <SvgPath
        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
