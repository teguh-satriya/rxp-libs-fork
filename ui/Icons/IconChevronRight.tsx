import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({ color = "black", width = 24, height = 24 }: any) => {
  return (
    <ImageSvg width={width} height={height} viewBox="0 0 238.003 238.003">
      <SvgPath
        d="M181.776,107.719L78.705,4.648c-6.198-6.198-16.273-6.198-22.47,0s-6.198,16.273,0,22.47
        l91.883,91.883l-91.883,91.883c-6.198,6.198-6.198,16.273,0,22.47s16.273,6.198,22.47,0l103.071-103.039
        c3.146-3.146,4.672-7.246,4.64-11.283C186.416,114.902,184.89,110.833,181.776,107.719z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
